'use server';

import { fetchStoreApi } from './client';
import { StoreCart, NormalizedCart } from '@/types/product';

const SESSION_TTL_MS = 2 * 60 * 1000;

interface CachedSession {
  cartToken: string | null;
  nonce: string | null;
  updatedAt: number;
}

const sessionCache = new Map<string, CachedSession>();

function getSessionCacheKey(cartToken: string | null): string {
  return cartToken || '__guest__';
}

function readSessionCache(cartToken: string | null): CachedSession | null {
  const cached = sessionCache.get(getSessionCacheKey(cartToken));
  if (!cached) return null;
  if (Date.now() - cached.updatedAt > SESSION_TTL_MS) {
    sessionCache.delete(getSessionCacheKey(cartToken));
    return null;
  }
  return cached;
}

function writeSessionCache(inputToken: string | null, cartToken: string | null, nonce: string | null): void {
  if (!cartToken && !nonce) return;

  const payload: CachedSession = {
    cartToken: cartToken || inputToken,
    nonce,
    updatedAt: Date.now(),
  };

  sessionCache.set(getSessionCacheKey(inputToken), payload);
  if (payload.cartToken) {
    sessionCache.set(getSessionCacheKey(payload.cartToken), payload);
  }
}

function clearSessionCache(cartToken: string | null): void {
  sessionCache.delete(getSessionCacheKey(cartToken));
}

function isNonceOrSessionError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : '';
  return (
    message.includes('nonce') ||
    message.includes('cookie') ||
    message.includes('session') ||
    message.includes('cart-token') ||
    message.includes('woocommerce store api error')
  );
}

async function getFreshSession(cartToken: string | null): Promise<{ cartToken: string | null; nonce: string | null }> {
  const { cartToken: nextToken, nonce } = await fetchStoreApi<StoreCart>('cart', cartToken);
  writeSessionCache(cartToken, nextToken || cartToken, nonce);
  return { cartToken: nextToken || cartToken, nonce };
}

async function resolveSession(cartToken: string | null, forceRefresh: boolean): Promise<{ cartToken: string | null; nonce: string | null }> {
  if (!forceRefresh) {
    const cached = readSessionCache(cartToken);
    if (cached?.nonce) {
      return { cartToken: cached.cartToken, nonce: cached.nonce };
    }
  }

  return getFreshSession(cartToken);
}

async function mutateCart(
  endpoint: 'cart/add-item' | 'cart/update-item' | 'cart/remove-item',
  cartToken: string | null,
  body: Record<string, unknown>
): Promise<{ cart: NormalizedCart; cartToken: string }> {
  let activeToken = cartToken;

  for (let attempt = 0; attempt < 2; attempt++) {
    const forceRefresh = attempt > 0;
    const { cartToken: sessionToken, nonce } = await resolveSession(activeToken, forceRefresh);
    activeToken = sessionToken || activeToken;

    try {
      const { data, cartToken: nextToken, nonce: nextNonce } = await fetchStoreApi<StoreCart>(
        endpoint,
        activeToken,
        {
          method: 'POST',
          body: JSON.stringify(body),
        },
        nonce
      );

      const finalToken = (nextToken || activeToken) as string;
      writeSessionCache(activeToken, finalToken, nextNonce || nonce);

      return {
        cart: normalizeCart(data),
        cartToken: finalToken,
      };
    } catch (error) {
      clearSessionCache(activeToken);
      if (attempt === 0 && isNonceOrSessionError(error)) {
        continue;
      }
      throw error;
    }
  }

  throw new Error('Cart mutation failed after nonce/session retry.');
}

function normalizeCart(storeCart: StoreCart): NormalizedCart {
  const minorUnit = storeCart.totals.currency_minor_unit || 2;
  const divisor = Math.pow(10, minorUnit);

  return {
    id: storeCart.cart_token,
    totalQuantity: storeCart.items.length,
    items: storeCart.items.map((item) => {
      let customData: Record<string, string> | undefined;

      if (item.item_data && Array.isArray(item.item_data)) {
        customData = item.item_data.reduce((acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {} as Record<string, string>);
      }

      const extensions = (item as any).extensions;
      if (!customData && extensions?.custom_data) {
        customData = extensions.custom_data;
      }

      const hiddenVariationId = customData?._variation_id;
      const variationIdRaw =
        (item as any).variation_id ||
        (item as any).variation?.id ||
        hiddenVariationId;
      const parsedVariationId = variationIdRaw ? Number(variationIdRaw) : NaN;

      if (customData) {
        customData = Object.entries(customData).reduce((acc, [key, value]) => {
          if (!key.startsWith('_')) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>);

        if (Object.keys(customData).length === 0) {
          customData = undefined;
        }
      }

      const sku = item.sku || '';
      const isWallpaper =
        (customData && Object.keys(customData).some((key) => key.toLowerCase().includes('area'))) ||
        sku.startsWith('FMWPAR') ||
        item.name.toLowerCase().includes('shade');

      return {
        id: item.key,
        productId: String(item.product_id || item.id),
        variationId: Number.isFinite(parsedVariationId) && parsedVariationId > 0 ? parsedVariationId : undefined,
        quantity: item.quantity,
        title: item.name,
        image: item.images?.[0]?.src || '',
        sku,
        isWallpaper,
        price: {
          amount: String(parseInt(item.prices.price) / divisor),
          currencyCode: item.prices.currency_code,
        },
        customData,
      };
    }),
    cost: {
      subtotalAmount: {
        amount: String(parseInt(storeCart.totals.total_items) / divisor),
        currencyCode: storeCart.totals.currency_code,
      },
      totalAmount: {
        amount: String(parseInt(storeCart.totals.total_price) / divisor),
        currencyCode: storeCart.totals.currency_code,
      },
    },
  };
}

export async function getCart(cartToken: string | null): Promise<NormalizedCart | null> {
  if (!cartToken) return null;

  try {
    const { data, cartToken: nextToken, nonce } = await fetchStoreApi<StoreCart>('cart', cartToken);
    writeSessionCache(cartToken, nextToken || cartToken, nonce);
    return normalizeCart(data);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export async function addToCart(
  cartToken: string | null,
  productId: string,
  quantity: number = 1,
  variation?: Array<{ attribute: string; value: string }>,
  customData?: Record<string, string>
): Promise<{ cart: NormalizedCart; cartToken: string }> {
  const payload: Record<string, unknown> = {
    id: productId,
    quantity,
  };

  if (variation) {
    payload.variation = variation;
  }

  if (customData) {
    payload.item_data = Object.entries(customData).map(([key, value]) => ({ key, value }));
    payload.extensions = {
      custom_data: customData,
      metadata: Object.entries(customData).map(([key, value]) => ({ key, value })),
    };
  }

  return mutateCart('cart/add-item', cartToken, payload);
}

export async function updateCartItem(
  cartToken: string,
  itemKey: string,
  quantity: number
): Promise<{ cart: NormalizedCart; cartToken: string }> {
  return mutateCart('cart/update-item', cartToken, {
    key: itemKey,
    quantity,
  });
}

export async function removeCartItem(
  cartToken: string,
  itemKey: string
): Promise<{ cart: NormalizedCart; cartToken: string }> {
  return mutateCart('cart/remove-item', cartToken, {
    key: itemKey,
  });
}

export interface BillingDetails {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
  account_email?: string;
  password?: string;
}

export interface CheckoutResult {
  orderId: number;
  orderKey: string;
  paymentRedirectUrl: string | null;
  status: string;
  cartCleanup?: {
    removedItemKeys: string[];
    failedItemKeys: string[];
  };
}

export async function placeOrder(
  cartToken: string,
  billing: BillingDetails,
  selectedItemKeys: string[],
  allItems: Array<{
    id: string;
    productId: string;
    variationId?: number;
    title: string;
    quantity: number;
    customData?: Record<string, string>;
  }>,
  paymentMethod: string = 'razorpay',
  authToken?: string
): Promise<CheckoutResult> {
  void cartToken;
  void billing;
  void selectedItemKeys;
  void allItems;
  void paymentMethod;
  void authToken;
  throw new Error('Use placeOrderClient from src/lib/api/checkoutClient for browser-origin checkout calls.');
}
