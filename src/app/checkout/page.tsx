import { CheckoutPage } from '@/components/CheckoutPage/CheckoutPage';
import { AuthGuard } from '@/components/AuthGuard/AuthGuard';

export const metadata = {
  title: 'Checkout — FirstRoom',
  description: 'Complete your purchase.',
};

export default function CheckoutRoute() {
  return (
    <AuthGuard
      title="Login required for checkout"
      description="Please log in to continue with your order."
      fallbackHref="/cart"
      fallbackLabel="Return to Cart"
    >
      <CheckoutPage />
    </AuthGuard>
  );
}
