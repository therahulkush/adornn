import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProductReviewSummary {
  product_id: string;
  average_rating: number;
  total_reviews: number;
}

export const useProductReviews = (productIds: string[]) => {
  const [reviewSummaries, setReviewSummaries] = useState<Record<string, ProductReviewSummary>>({});
  const [loading, setLoading] = useState(true);

  const fetchReviewSummaries = async () => {
    if (productIds.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const { data, error }: { data: any[] | null; error: any } = await (supabase as any)
        .from('reviews')
        .select('product_id, rating')
        .in('product_id', productIds);

      if (error) throw error;

      // Calculate summaries for each product
      const summaries: Record<string, ProductReviewSummary> = {};
      
      // Initialize all products with zero values
      productIds.forEach(id => {
        summaries[id] = {
          product_id: id,
          average_rating: 0,
          total_reviews: 0
        };
      });

      // Calculate actual values from database
      if (data && Array.isArray(data) && data.length > 0) {
        const productGroups = (data as any[]).reduce((acc, review) => {
          if (!acc[review.product_id]) {
            acc[review.product_id] = [];
          }
          acc[review.product_id].push(review.rating);
          return acc;
        }, {} as Record<string, number[]>);

        Object.entries(productGroups).forEach(([productId, ratings]) => {
          const ratingsArray = ratings as number[];
          const totalReviews = ratingsArray.length;
          const averageRating = totalReviews > 0 
            ? ratingsArray.reduce((sum, rating) => sum + rating, 0) / totalReviews
            : 0;

          summaries[productId] = {
            product_id: productId,
            average_rating: averageRating,
            total_reviews: totalReviews
          };
        });
      }

      setReviewSummaries(summaries);
    } catch (error) {
      console.error('Error fetching review summaries:', error);
      // Initialize with empty data on error
      const summaries: Record<string, ProductReviewSummary> = {};
      productIds.forEach(id => {
        summaries[id] = {
          product_id: id,
          average_rating: 0,
          total_reviews: 0
        };
      });
      setReviewSummaries(summaries);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewSummaries();
  }, [productIds.join(',')]);

  return {
    reviewSummaries,
    loading,
    getProductReviews: (productId: string) => reviewSummaries[productId] || { 
      product_id: productId, 
      average_rating: 0, 
      total_reviews: 0 
    }
  };
};