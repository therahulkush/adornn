import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { User, Heart, Settings, LogOut } from 'lucide-react';

const Account = () => {
  const { user, signOut, updateProfile, isLoading } = useAuth();
  const { wishlistItems, toggleWishlist, isWishlisted } = useWishlist();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const wishlistedProducts = products.filter(product => 
    wishlistItems.includes(product.id)
  );

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get('displayName') as string;

    const { error } = await updateProfile({ display_name: displayName });

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }

    setIsUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Render account page for both authenticated and guest users
  const renderGuestWishlist = () => (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-hero text-primary mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sign In Prompt */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Sign in to sync your wishlist across devices and access personalized recommendations.
                </p>
                <Button onClick={() => setShowAuthDialog(true)} className="w-full">
                  Sign In / Sign Up
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Your wishlist is saved locally and won't be lost.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wishlist Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  My Wishlist ({wishlistedProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-subtitle">Your wishlist is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start adding items you love to keep track of them!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={isWishlisted(product.id)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
      />
    </div>
  );

  if (!user) {
    return renderGuestWishlist();
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-hero text-primary mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email || ''} disabled />
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      defaultValue={user.user_metadata?.display_name || ''}
                      placeholder="Your display name"
                    />
                  </div>
                  <Button type="submit" disabled={isUpdating} className="w-full">
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </form>

                <Separator />

                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Wishlist Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  My Wishlist ({wishlistedProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-subtitle">Your wishlist is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start adding items you love to keep track of them!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={isWishlisted(product.id)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;