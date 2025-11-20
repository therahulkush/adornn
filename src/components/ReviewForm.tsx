import { useState, useEffect } from "react";
import { Star, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReviewFormData } from "@/hooks/useReviews";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<boolean>;
  submitting: boolean;
  onCancel?: () => void;
}

const ReviewForm = ({ onSubmit, submitting, onCancel }: ReviewFormProps) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 5,
    title: "",
    content: "",
    author_name: "",
    photos: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    if (user) {
      // Try to get user profile for display name
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .maybeSingle();
      
      setUserProfile(profile);
      setFormData(prev => ({ 
        ...prev, 
        author_name: profile?.display_name || user.email?.split('@')[0] || 'User' 
      }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 5) {
      toast({
        title: "Too many photos",
        description: "You can upload a maximum of 5 photos",
        variant: "destructive",
      });
      return;
    }
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to submit a review",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author_name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.content.length < 50) {
      toast({
        title: "Review Too Short",
        description: "Please write at least 50 characters for your review",
        variant: "destructive",
      });
      return;
    }

    setUploadingPhotos(true);
    try {
      // Upload photos if any (simplified - in real app would use Supabase Storage)
      const photoUrls: string[] = [];
      // For now, we'll skip actual photo upload and just store empty array
      
      const reviewDataWithPhotos = {
        ...formData,
        photos: photoUrls,
      };

      const success = await onSubmit(reviewDataWithPhotos);
      if (success) {
        setFormData({
          rating: 5,
          title: "",
          content: "",
          author_name: userProfile?.display_name || formData.author_name,
          photos: [],
        });
        setPhotos([]);
        onCancel?.();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (!isAuthenticated) {
    return (
      <Card className="card-warm">
        <CardContent className="text-center py-8">
          <h3 className="font-playfair text-xl font-medium text-primary mb-2">
            Sign In to Review
          </h3>
          <p className="text-muted-foreground mb-4">
            Only registered users can leave product reviews
          </p>
          <Button variant="outline" onClick={() => window.location.href = '/auth'}>
            Sign In / Sign Up
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-warm">
      <CardHeader>
        <CardTitle className="text-xl">Write a Review</CardTitle>
        <p className="text-sm text-muted-foreground">Share your experience with this product</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Rating *</Label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleRatingClick(i + 1)}
                  className="hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
                >
                  <Star
                    className={`h-8 w-8 ${
                      i < formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-muted-foreground font-medium">
                {formData.rating} star{formData.rating !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience in a few words"
              required
              maxLength={100}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content" className="flex items-center justify-between">
              <span>Your Review *</span>
              <span className={`text-xs ${formData.content.length >= 50 ? 'text-green-600' : 'text-muted-foreground'}`}>
                {formData.content.length}/50 min characters
              </span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Tell others about your experience with this product. What did you like or dislike? How was the quality? Would you recommend it? (Minimum 50 characters)"
              required
              maxLength={1000}
              className={`min-h-[120px] mt-1 ${formData.content.length < 50 && formData.content.length > 0 ? 'border-yellow-300 focus:border-yellow-400' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="photos">Photos (Optional)</Label>
            <div className="mt-2 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photos')?.click()}
                  disabled={photos.length >= 5}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Add Photos ({photos.length}/5)
                </Button>
                <span className="text-xs text-muted-foreground">
                  JPG, PNG up to 5MB each
                </span>
              </div>
              
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button 
              type="submit" 
              disabled={submitting || uploadingPhotos || formData.content.length < 50}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              {submitting || uploadingPhotos ? "Submitting..." : "Submit Review"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;