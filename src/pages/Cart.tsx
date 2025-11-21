import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    clearCart,
    applyPromoCode,
    removePromoCode,
    getCartTotal, 
    getCartCount,
    getSubtotal,
    getTaxAmount,
    getShippingCost
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput.trim().toUpperCase());
      if (success) {
        toast({
          title: "Promo code applied!",
          description: `${promoInput.toUpperCase()} discount has been applied to your order.`,
        });
        setPromoInput('');
      } else {
        toast({
          title: "Invalid promo code",
          description: "Please check your promo code and try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    setShowRemoveConfirm(null);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-8" />
            <h1 className="font-playfair text-3xl font-medium text-primary mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to find your perfect home decor pieces!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/shop">
                  Start Shopping
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/style-quiz">
                  Take Style Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8 sm:flex-row sm:items-center">
          <Button asChild variant="ghost" size="sm" className="self-start">
            <Link to="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          
          <div className="flex-1">
            <h1 className="font-playfair text-2xl sm:text-3xl font-medium text-primary">
              Shopping Cart ({getCartCount()})
            </h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleClearCart}
            className="text-destructive hover:text-destructive self-start sm:self-auto"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="card-warm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-48 sm:w-24 sm:h-24 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-3 sm:mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-medium text-primary line-clamp-2 text-base sm:text-sm">
                            {item.product.name}
                          </h3>
                          {item.selectedVariant && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.selectedVariant}
                            </p>
                          )}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowRemoveConfirm(item.id)}
                          className="text-muted-foreground hover:text-destructive shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-start gap-3">
                        <div className="flex items-center justify-start gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="font-medium min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-left">
                          <div className="flex items-center gap-2 justify-start text-sm">
                            <span className="text-muted-foreground">{formatPrice(item.product.price)} × {item.quantity} =</span>
                            <span className="font-medium text-lg">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove Confirmation */}
                  {showRemoveConfirm === item.id && (
                    <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-sm text-destructive mb-3">
                        Remove "{item.product.name}" from your cart?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveItem(item.id, item.product.name)}
                          className="w-full sm:w-auto"
                        >
                          Yes, Remove
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowRemoveConfirm(null)}
                          className="w-full sm:w-auto"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4 sm:space-y-6">
            {/* Promo Code */}
            <Card className="card-warm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.promoCode ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 border border-green-200 rounded-md gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {state.promoCode}
                      </Badge>
                      <span className="text-sm text-green-700">
                        {(state.promoDiscount * 100).toFixed(0)}% off
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removePromoCode}
                      className="text-green-700 hover:text-green-800 self-start sm:self-auto"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyPromo} className="w-full sm:w-auto">
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="card-warm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                
                {state.promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({state.promoCode}):</span>
                    <span>-{formatPrice(getSubtotal() * state.promoDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatPrice(getTaxAmount())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {getShippingCost() === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(getShippingCost())
                    )}
                  </span>
                </div>
                
                {getSubtotal() < 6225 && getSubtotal() > 0 && (
                  <p className="text-sm text-muted-foreground text-center sm:text-left">
                    Add {formatPrice(6225 - getSubtotal())} more for free shipping!
                  </p>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    toast({
                      title: "Checkout Pending",
                      description: (
                        <div className="space-y-3">
                          <p>
                            This process is pending Shopify integration - please prompt the agent to 
                            integrate your store using Shopify API and Store ID.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => window.open('https://docs.lovable.dev/integrations/shopify', '_blank')}
                          >
                            More Info
                          </Button>
                        </div>
                      ),
                      duration: 5000,
                    });
                  }}
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;