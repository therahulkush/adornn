import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, RotateCcw, Shield } from "lucide-react";

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Shipping & Returns</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about shipping, returns, and exchanges.
          </p>
        </div>

        {/* Shipping Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Shipping Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Standard Shipping</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 5-7 business days</li>
                    <li>• $9.99 for orders under $75</li>
                    <li>• FREE for orders over $75</li>
                    <li>• Tracking included</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Express Shipping</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 2-3 business days</li>
                    <li>• $19.99 flat rate</li>
                    <li>• Priority handling</li>
                    <li>• Real-time tracking</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold text-foreground mb-3">Processing Time</h3>
                <p className="text-muted-foreground">
                  Orders are typically processed within 1-2 business days. During peak seasons (holidays, sales events), 
                  processing may take up to 3-4 business days. You'll receive a tracking number once your order ships.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Special Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Large Items & Furniture</h3>
                <p className="text-muted-foreground">
                  Items over 50 lbs or oversized pieces may require special delivery. We'll contact you within 24 hours 
                  to schedule delivery. Additional fees may apply for white-glove service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Fragile Items</h3>
                <p className="text-muted-foreground">
                  All fragile items are carefully packed with extra protection. We use eco-friendly packaging materials 
                  whenever possible while ensuring your items arrive safely.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Returns & Exchanges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Return Policy</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 30-day return window from delivery date</li>
                  <li>• Items must be unused and in original packaging</li>
                  <li>• Original tags and labels must be attached</li>
                  <li>• Custom or personalized items cannot be returned</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-foreground mb-3">Return Process</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li>1. Contact our customer service team or use our online return form</li>
                  <li>2. Receive your prepaid return label via email</li>
                  <li>3. Package your items securely</li>
                  <li>4. Drop off at any authorized shipping location</li>
                  <li>5. Refund processed within 5-7 business days after we receive your return</li>
                </ol>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-foreground mb-3">Exchange Policy</h3>
                <p className="text-muted-foreground">
                  We're happy to exchange items for different sizes or colors (subject to availability). 
                  Exchanges follow the same 30-day window and condition requirements as returns.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Damage & Lost Packages</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Damaged Items</h3>
                <p className="text-muted-foreground">
                  If your item arrives damaged, please contact us within 48 hours with photos of the damage and packaging. 
                  We'll arrange for a replacement or full refund at no cost to you.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Lost or Stolen Packages</h3>
                <p className="text-muted-foreground">
                  We're not responsible for packages marked as delivered by the carrier. However, we'll work with you 
                  and the shipping company to locate your package or file a claim when possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shipping;