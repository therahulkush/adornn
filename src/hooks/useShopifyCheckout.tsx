import { useState } from 'react';
import { createShopifyCheckout, CartLineInput } from '@/lib/shopify';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export function useShopifyCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { state, clearCart } = useCart();

  const initiateCheckout = async () => {
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);

    try {
      // Convert cart items to Shopify line items using the stored variant ID
      const lines: CartLineInput[] = state.items.map((item) => {
        // Use the stored variantId if available, otherwise construct from product ID
        const variantId = item.product.variantId || `gid://shopify/ProductVariant/${item.product.id}`;
        
        return {
          merchandiseId: variantId,
          quantity: item.quantity,
        };
      });

      const checkoutUrl = await createShopifyCheckout(lines);

      if (checkoutUrl) {
        // Open checkout in new tab
        window.open(checkoutUrl, '_blank');
        
        toast.success('Redirecting to checkout...', {
          description: 'Complete your purchase in the new tab.',
        });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to initiate checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiateCheckout,
    isLoading,
  };
}
