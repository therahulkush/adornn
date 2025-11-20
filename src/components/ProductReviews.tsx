import { useState } from 'react';
import { Star, ThumbsUp, Camera, Shield, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ReviewForm from './ReviewForm';
import { useReviews } from '@/hooks/useReviews';
import { Product } from '@/data/products';
import { formatDistanceToNow } from 'date-fns';

interface ProductReviewsProps {
  product: Product;
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  const [showForm, setShowForm] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const {
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
  } = useReviews(product.id);

  const handleReviewSubmit = async (reviewData: any): Promise<boolean> => {
    const success = await submitReview(reviewData);
    if (success) {
      setShowForm(false);
    }
    return success;
  };

  const toggleExpanded = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="card-warm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {totalReviews > 0 ? averageRating.toFixed(1) : '0.0'}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating), 'w-5 h-5')}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-warm">
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 min-w-[60px]">
                    <span className="text-sm">{rating}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress 
                    value={ratingPercentages[rating] || 0} 
                    className="flex-1 h-2"
                  />
                  <span className="text-xs text-muted-foreground min-w-[35px]">
                    {ratingPercentages[rating] || 0}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="font-playfair text-2xl font-medium text-primary">
            Customer Reviews
          </h2>
          {totalReviews > 1 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                  <SelectItem value="photos">With Photos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
        >
          Write Review
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          submitting={submitting}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <Card className="card-warm">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-playfair text-xl font-medium text-primary mb-2">
                Be the First to Review
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Share your experience with this product and help other customers make informed decisions.
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                Write First Review
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {reviews.map((review) => {
              const isExpanded = expandedReviews.has(review.id);
              const shouldTruncate = review.content.length > 200;
              const displayContent = shouldTruncate && !isExpanded 
                ? review.content.slice(0, 200) + '...' 
                : review.content;

              return (
                <Card key={review.id} className="card-warm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-medium">
                          {review.author_name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.author_name}</span>
                              {review.is_verified_purchase && (
                                <Badge variant="secondary" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {displayContent}
                          {shouldTruncate && (
                            <button
                              onClick={() => toggleExpanded(review.id)}
                              className="ml-2 text-primary hover:underline text-sm font-medium"
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </p>

                        {review.photos && review.photos.length > 0 && (
                          <div className="flex items-center gap-2 mb-4">
                            <Camera className="w-4 h-4 text-muted-foreground" />
                            <div className="flex gap-2 overflow-x-auto">
                              {review.photos.map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo}
                                  alt={`Review photo ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => voteHelpful(review.id, true)}
                          className="text-muted-foreground hover:text-foreground p-2"
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Helpful ({review.helpful_count})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;