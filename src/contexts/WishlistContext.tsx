import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlistItems: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  // Load wishlist from localStorage for guests or from database for authenticated users
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      // Load from database for authenticated users
      loadWishlistFromDatabase();
    } else {
      // Load from localStorage for guests
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error parsing wishlist from localStorage:', error);
          localStorage.removeItem('wishlist');
        }
      }
    }
  }, [user, authLoading]);

  // Sync local wishlist to database when user logs in
  useEffect(() => {
    if (user && wishlistItems.length > 0) {
      syncLocalWishlistToDatabase();
    }
  }, [user]);

  const loadWishlistFromDatabase = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const productIds = data?.map(item => item.product_id) || [];
      setWishlistItems(productIds);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to load your wishlist",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const syncLocalWishlistToDatabase = async () => {
    if (!user || wishlistItems.length === 0) return;

    try {
      // Add items from localStorage to database
      const wishlistData = wishlistItems.map(productId => ({
        user_id: user.id,
        product_id: productId,
      }));

      const { error } = await supabase
        .from('wishlist')
        .upsert(wishlistData, { onConflict: 'user_id,product_id' });

      if (error) throw error;

      // Clear localStorage since it's now in the database
      localStorage.removeItem('wishlist');
    } catch (error) {
      console.error('Error syncing wishlist to database:', error);
    }
  };

  const toggleWishlist = async (productId: string) => {
    const isCurrentlyWishlisted = wishlistItems.includes(productId);
    const updatedWishlist = isCurrentlyWishlisted
      ? wishlistItems.filter(id => id !== productId)
      : [...wishlistItems, productId];

    setWishlistItems(updatedWishlist);

    if (user) {
      // Update database for authenticated users
      try {
        if (isCurrentlyWishlisted) {
          // Remove from wishlist
          const { error } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId);

          if (error) throw error;
        } else {
          // Add to wishlist
          const { error } = await supabase
            .from('wishlist')
            .insert({
              user_id: user.id,
              product_id: productId,
            });

          if (error) throw error;
        }

        toast({
          title: isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist",
          description: isCurrentlyWishlisted
            ? "Item removed from your wishlist"
            : "Item added to your wishlist",
        });
      } catch (error) {
        // Revert the optimistic update
        setWishlistItems(wishlistItems);
        console.error('Error updating wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to update wishlist",
          variant: "destructive",
        });
      }
    } else {
      // Update localStorage for guests
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        title: isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: isCurrentlyWishlisted
          ? "Item removed from your wishlist"
          : "Item added to your wishlist. Sign in to save permanently.",
      });
    }
  };

  const isWishlisted = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  const value = {
    wishlistItems,
    isWishlisted,
    toggleWishlist,
    isLoading,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};