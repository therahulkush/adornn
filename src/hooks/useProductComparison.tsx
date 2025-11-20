import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

const STORAGE_KEY = 'productComparison';
const MAX_COMPARISON_ITEMS = 3;

export const useProductComparison = () => {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setComparisonProducts(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing comparison products:', error);
      }
    }
  }, []);

  const addToComparison = (product: Product) => {
    setComparisonProducts(prev => {
      // Don't add if already exists
      if (prev.some(p => p.id === product.id)) {
        return prev;
      }
      
      // Don't add if at max capacity
      if (prev.length >= MAX_COMPARISON_ITEMS) {
        return prev;
      }

      const updated = [...prev, product];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearComparison = () => {
    setComparisonProducts([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  const canAddToComparison = () => {
    return comparisonProducts.length < MAX_COMPARISON_ITEMS;
  };

  return {
    comparisonProducts,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddToComparison,
    maxItems: MAX_COMPARISON_ITEMS
  };
};