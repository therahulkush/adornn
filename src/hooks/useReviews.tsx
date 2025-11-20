import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  product_id: string;
  user_id?: string;
  author_name: string;
  rating: number;
  title: string;
  content: string;
  photos?: string[];
  is_verified: boolean;
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  author_name: string;
  photos?: string[];
}

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'photos'>('recent');
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      let query = supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId);

      // Apply sorting
      switch (sortBy) {
        case 'highest':
          query = query.order('rating', { ascending: false });
          break;
        case 'lowest':
          query = query.order('rating', { ascending: true });
          break;
        case 'photos':
          query = query.not('photos', 'is', null).order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error }: { data: Review[] | null; error: any } = await query;

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (reviewData: ReviewFormData) => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to submit a review",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await (supabase as any)
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          author_name: reviewData.author_name,
          rating: reviewData.rating,
          title: reviewData.title,
          content: reviewData.content,
          photos: reviewData.photos || [],
          is_verified: true,
          is_verified_purchase: false, // This would be set based on actual purchase history
        });

      if (error) {
        if (error.code === '23505' && error.constraint === 'unique_user_product_review') {
          throw new Error('You have already reviewed this product');
        }
        throw error;
      }

      toast({
        title: "Success",
        description: "Your review has been submitted!",
      });

      // Refresh reviews
      await fetchReviews();
      return true;
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const voteHelpful = async (reviewId: string, isHelpful: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Generate a session ID for anonymous users
      const sessionId = user?.id ? null : `session_${Date.now()}_${Math.random()}`;
      
      const { error } = await (supabase as any)
        .from('review_votes')
        .upsert({
          review_id: reviewId,
          user_id: user?.id,
          session_id: sessionId,
          is_helpful: isHelpful,
        }, {
          onConflict: user?.id ? 'review_id,user_id' : 'review_id,session_id'
        });

      if (error) throw error;

      // Refresh reviews to get updated helpful_count
      await fetchReviews();

      toast({
        title: "Thank you!",
        description: "Your feedback has been recorded.",
      });
    } catch (error) {
      console.error('Error voting on review:', error);
      toast({
        title: "Error",
        description: "Failed to record your vote",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, sortBy]);

  // Calculate average rating and total reviews
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const totalReviews = reviews.length;

  // Calculate rating distribution
  const ratingDistribution = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Convert to percentages
  const ratingPercentages = {};
  for (let i = 1; i <= 5; i++) {
    ratingPercentages[i] = totalReviews > 0 
      ? Math.round((ratingDistribution[i] || 0) / totalReviews * 100) 
      : 0;
  }

  return {
    reviews,
    loading,
    submitting,
    submitReview,
    voteHelpful,
    averageRating,
    totalReviews,
    ratingPercentages,
    sortBy,
    setSortBy,
  };
};