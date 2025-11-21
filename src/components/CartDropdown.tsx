import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const CartDropdown = () => {
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    setCartOpen, 
    getCartTotal, 
    getCartCount,
    getSubtotal 
  } = useCart();

  if (!state.isOpen) return null;

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Cart Dropdown */}
      <div className="fixed left-1/2 -translate-x-1/2 top-20 w-80 bg-background border border-border rounded-lg shadow-lg z-50 max-h-[80vh] flex flex-col sm:left-auto sm:right-4 sm:translate-x-0 sm:w-96">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-primary">
              Shopping Cart ({getCartCount()})
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button 
                asChild 
                variant="outline" 
                onClick={() => setCartOpen(false)}
              >
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-border/50 last:border-b-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-primary line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price)}
                    </p>
                    {item.selectedVariant && (
                      <p className="text-xs text-muted-foreground">
                        {item.selectedVariant}
                      </p>
                    )}
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="text-sm font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-medium text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive h-7 px-2 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">{formatPrice(getSubtotal())}</span>
            </div>
            
            {state.promoDiscount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">Discount ({state.promoCode}):</span>
                <span className="text-sm">-{formatPrice(getSubtotal() * state.promoDiscount)}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <Button 
                asChild 
                className="w-full" 
                onClick={() => setCartOpen(false)}
              >
                <Link to="/cart">View Cart & Checkout</Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
                onClick={() => setCartOpen(false)}
              >
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDropdown;