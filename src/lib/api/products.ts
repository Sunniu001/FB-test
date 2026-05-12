import { wcFetch, wcFetchWithHeaders } from './client';
import { Product } from '@/types/product';

function toPrice(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeV3Product(raw: any): Product {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description || '',
    shortDescription: raw.short_description || '',
    price: toPrice(raw.price),
    regularPrice: toPrice(raw.regular_price),
    salePrice: raw.sale_price ? toPrice(raw.sale_price) : undefined,
    images:
      raw.images?.map((img: any) => ({
        id: img.id,
        src: img.src,
        alt: img.alt || raw.name,
      })) || [],
    categories:
      raw.categories?.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],
    stockStatus: raw.stock_status === 'instock' ? 'instock' : 'outofstock',
    attributes:
      raw.attributes?.map((attr: any) => ({
        id: attr.id,
        name: attr.name,
        options: Array.isArray(attr.options) ? attr.options : [],
      })) || [],
  };
}

function extractNameplateMeta(raw: any): Product['nameplateMeta'] | undefined {
  const metaData = raw.meta_data || [];
  const boxMeta = metaData.find((m: any) => m.key === '_np_box')?.value;
  const bgMeta = metaData.find((m: any) => m.key === '_np_bg')?.value;
  const textColorMeta = metaData.find((m: any) => m.key === '_np_text_color')?.value;

  if (!boxMeta || !bgMeta) return undefined;

  const [x, y, w, h] = String(boxMeta)
    .split(',')
    .map((value) => Number(value));

  if ([x, y, w, h].some((value) => Number.isNaN(value))) return undefined;

  return {
    box: { x, y, w, h },
    bg: String(bgMeta),
    textColor: textColorMeta === 'light' ? 'light' : 'dark',
  };
}

async function getAllProductVariations(productId: number): Promise<any[]> {
  const allVariations: any[] = [];
  let page = 1;

  while (true) {
    const batch = await wcFetch<any[]>(`products/${productId}/variations?per_page=100&page=${page}`, {
      next: { revalidate: 3600, tags: ['products', `product-${productId}-variations`] },
    });

    if (!Array.isArray(batch) || batch.length === 0) {
      break;
    }

    allVariations.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  return allVariations;
}

function normalizeVariants(rawVariations: any[]) {
  const uniqueVariants = new Map<string, any>();

  rawVariations.forEach((rawVar) => {
    const attrKey = (rawVar.attributes || [])
      .sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''))
      .map((attr: any) => `${attr.name}:${attr.option}`)
      .join('|');

    if (!uniqueVariants.has(attrKey)) {
      uniqueVariants.set(attrKey, {
        id: rawVar.id,
        attributes:
          rawVar.attributes?.reduce((acc: Record<string, string>, attr: any) => {
            acc[attr.name] = attr.option;
            return acc;
          }, {}) || {},
        price: toPrice(rawVar.price),
        regularPrice: toPrice(rawVar.regular_price),
        salePrice: rawVar.sale_price ? toPrice(rawVar.sale_price) : undefined,
        stockStatus: rawVar.stock_status === 'instock' ? 'instock' : 'outofstock',
        image:
          rawVar.image?.src
            ? {
                id: rawVar.image.id,
                src: rawVar.image.src,
                alt: rawVar.image.alt || '',
              }
            : undefined,
      });
    }
  });

  return Array.from(uniqueVariants.values());
}

export async function getProducts(options: { limit?: number } = {}): Promise<Product[]> {
  try {
    const limit = options.limit || 20;
    const data = await wcFetch<any[]>(`products?status=publish&per_page=${limit}`, {
      next: { revalidate: 3600, tags: ['products'] },
    });

    return data.map(normalizeV3Product);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await wcFetch<any[]>(`products?slug=${encodeURIComponent(slug)}&status=publish`, {
      next: { revalidate: 3600, tags: ['products', `product-${slug}`] },
    });

    if (!data?.length) return null;

    const raw = data[0];
    const product = normalizeV3Product(raw);

    if (raw.type === 'variable') {
      try {
        const variations = await getAllProductVariations(product.id);
        product.variants = normalizeVariants(variations);
      } catch (error) {
        console.error(`Failed to fetch variations for product ${product.id}:`, error);
      }
    }

    const isNameplate = product.categories.some(
      (category) => (category.slug || '').includes('nameplate') || (category.name || '').toLowerCase().includes('nameplate')
    );
    if (isNameplate) {
      product.nameplateMeta = extractNameplateMeta(raw);
    }

    return product;
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return null;
  }
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  totalPages: number;
}

export async function getProductsByCategory(
  categoryId: string,
  page: number = 1,
  perPage: number = 20,
  orderby: string = 'date',
  order: string = 'desc'
): Promise<PaginatedProducts> {
  const encodedCat = encodeURIComponent(categoryId);
  const buildEndpoint = (sortEnabled: boolean) => {
    const sortQuery = sortEnabled ? `&orderby=${encodeURIComponent(orderby)}&order=${encodeURIComponent(order)}` : '';
    return `products?status=publish&category=${encodedCat}&page=${page}&per_page=${perPage}${sortQuery}`;
  };

  try {
    const { data, headers } = await wcFetchWithHeaders<any[]>(buildEndpoint(true), {
      next: { revalidate: 3600, tags: ['products', `category-${categoryId}`] },
    });

    return {
      products: Array.isArray(data) ? data.map(normalizeV3Product) : [],
      total: parseInt(headers.get('x-wp-total') || '0', 10),
      totalPages: parseInt(headers.get('x-wp-totalpages') || '0', 10),
    };
  } catch (error) {
    console.error(`Failed to fetch sorted products for category ${categoryId}:`, error);

    try {
      const { data, headers } = await wcFetchWithHeaders<any[]>(buildEndpoint(false), {
        next: { revalidate: 3600, tags: ['products', `category-${categoryId}`] },
      });

      return {
        products: Array.isArray(data) ? data.map(normalizeV3Product) : [],
        total: parseInt(headers.get('x-wp-total') || '0', 10),
        totalPages: parseInt(headers.get('x-wp-totalpages') || '0', 10),
      };
    } catch {
      return { products: [], total: 0, totalPages: 0 };
    }
  }
}
