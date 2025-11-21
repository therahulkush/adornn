import { useState, useEffect } from 'react';
import { fetchShopifyProducts, convertShopifyProduct, ShopifyProduct } from '@/lib/shopify';
import { Product } from '@/data/products';

export function useShopifyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const shopifyProducts = await fetchShopifyProducts();
        
        if (shopifyProducts.length === 0) {
          setError('No products found');
          setProducts([]);
          return;
        }

        const convertedProducts = shopifyProducts.map((sp: ShopifyProduct) => 
          convertShopifyProduct(sp)
        );
        
        setProducts(convertedProducts);
        setError(null);
      } catch (err) {
        console.error('Error loading Shopify products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, isLoading, error };
}
