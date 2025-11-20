import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Sun, Scissors, Shield } from "lucide-react";

const Care = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Care Instructions</h1>
          <p className="text-xl text-muted-foreground">
            Keep your Havenly Home pieces looking beautiful for years to come with our care and maintenance guides.
          </p>
        </div>

        <Tabs defaultValue="furniture" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="furniture">Furniture</TabsTrigger>
            <TabsTrigger value="textiles">Textiles</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
            <TabsTrigger value="decor">Decor</TabsTrigger>
          </TabsList>

          {/* Furniture Care */}
          <TabsContent value="furniture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wood Furniture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-primary" />
                      Daily Care
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dust regularly with a soft, dry cloth</li>
                      <li>• Use coasters and placemats to prevent water rings</li>
                      <li>• Wipe spills immediately with a damp cloth</li>
                      <li>• Avoid harsh chemicals and abrasive cleaners</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      Deep Cleaning
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use wood-specific cleaner monthly</li>
                      <li>• Polish with natural wood polish 2-3 times per year</li>
                      <li>• Keep away from direct sunlight and heat sources</li>
                      <li>• Maintain 40-60% humidity levels</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-2">Finishes Guide</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Natural Oil - More maintenance, richer patina</Badge>
                    <Badge variant="secondary">Lacquer - Low maintenance, durable</Badge>
                    <Badge variant="secondary">Wax - Regular reapplication needed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upholstered Furniture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Fabric Care</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Vacuum weekly with upholstery attachment</li>
                      <li>• Rotate and flip cushions regularly</li>
                      <li>• Treat stains immediately</li>
                      <li>• Professional cleaning annually</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Leather Care</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dust with soft cloth weekly</li>
                      <li>• Condition every 6-12 months</li>
                      <li>• Keep 2 feet from heat sources</li>
                      <li>• Use leather-specific cleaners only</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Textiles Care */}
          <TabsContent value="textiles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bedding & Linens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Cotton & Linen</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Wash in cool water (30°C/86°F)</li>
                      <li>• Use gentle, eco-friendly detergent</li>
                      <li>• Line dry or tumble dry on low heat</li>
                      <li>• Iron while slightly damp for best results</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Synthetic Materials</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Follow care label instructions</li>
                      <li>• Wash in warm water if specified</li>
                      <li>• Avoid fabric softeners for moisture-wicking fabrics</li>
                      <li>• Low heat or air dry to prevent shrinking</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-2">Washing Frequency</h4>
                  <p className="text-muted-foreground">
                    Bed sheets: Weekly | Pillowcases: 2-3 times per week | Duvet covers: Every 2-3 weeks | 
                    Pillows: Every 3-6 months (or according to manufacturer guidelines)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rugs & Carpets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Regular Maintenance</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Vacuum both sides weekly</li>
                      <li>• Rotate rug every few months</li>
                      <li>• Use rug pads to prevent slipping</li>
                      <li>• Address spills immediately</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Deep Cleaning</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Professional cleaning annually</li>
                      <li>• Test cleaning products in inconspicuous area</li>
                      <li>• Allow complete drying before use</li>
                      <li>• Store flat if not in use</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lighting Care */}
          <TabsContent value="lighting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-primary" />
                  <span>Lighting Maintenance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Lamp Care</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dust lampshades weekly with soft brush</li>
                      <li>• Clean lamp base with appropriate cleaner</li>
                      <li>• Check electrical cords regularly for damage</li>
                      <li>• Replace bulbs promptly when they burn out</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Chandelier Care</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Turn off power before cleaning</li>
                      <li>• Clean crystals with ammonia-free glass cleaner</li>
                      <li>• Dust metal components with soft cloth</li>
                      <li>• Professional cleaning for complex fixtures</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-2">Lampshade Materials</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Badge variant="outline" className="mb-2">Fabric</Badge>
                      <p className="text-sm text-muted-foreground">Vacuum with brush attachment, spot clean stains</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Paper</Badge>
                      <p className="text-sm text-muted-foreground">Dust only, avoid moisture</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Glass/Ceramic</Badge>
                      <p className="text-sm text-muted-foreground">Clean with glass cleaner, handle carefully</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decor Care */}
          <TabsContent value="decor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Artwork & Wall Decor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Framed Art</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dust frames with soft, dry cloth</li>
                      <li>• Clean glass with streak-free glass cleaner</li>
                      <li>• Avoid direct sunlight to prevent fading</li>
                      <li>• Check hanging hardware annually</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Canvas & Prints</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dust gently with soft brush</li>
                      <li>• Keep away from humidity and heat</li>
                      <li>• Handle by edges when moving</li>
                      <li>• Professional restoration for valuable pieces</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Decorative Objects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Ceramic & Pottery</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Hand wash with mild soap</li>
                      <li>• Dry thoroughly</li>
                      <li>• Store carefully to prevent chips</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Metal Objects</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Use appropriate metal cleaner</li>
                      <li>• Polish regularly to prevent tarnish</li>
                      <li>• Keep dry to prevent rust</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Glass Items</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Clean with glass cleaner</li>
                      <li>• Handle with care</li>
                      <li>• Store safely when not displayed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Care;