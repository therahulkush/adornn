import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ruler, Package, Sofa } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Size Guides</h1>
          <p className="text-xl text-muted-foreground">
            Find the perfect fit for your space with our comprehensive size guides and measurement tips.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Measurement Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ruler className="h-5 w-5 text-primary" />
                <span>Measurement Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Before You Measure</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Use a metal tape measure for accuracy</li>
                    <li>• Measure twice to confirm dimensions</li>
                    <li>• Account for doorways, stairs, and elevators</li>
                    <li>• Consider existing furniture placement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Room Planning</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Leave 30" for walkways</li>
                    <li>• Allow 18" between coffee table and seating</li>
                    <li>• Ensure 36" clearance around dining tables</li>
                    <li>• Account for door and window clearances</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Furniture Sizes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sofa className="h-5 w-5 text-primary" />
                <span>Furniture Size Guide</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Seating */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Seating</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Typical Width</TableHead>
                      <TableHead>Typical Depth</TableHead>
                      <TableHead>Typical Height</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Armchair</TableCell>
                      <TableCell>28" - 35"</TableCell>
                      <TableCell>32" - 40"</TableCell>
                      <TableCell>30" - 36"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Loveseat</TableCell>
                      <TableCell>48" - 64"</TableCell>
                      <TableCell>32" - 40"</TableCell>
                      <TableCell>30" - 36"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">3-Seat Sofa</TableCell>
                      <TableCell>72" - 96"</TableCell>
                      <TableCell>32" - 40"</TableCell>
                      <TableCell>30" - 36"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sectional</TableCell>
                      <TableCell>80" - 120"</TableCell>
                      <TableCell>80" - 120"</TableCell>
                      <TableCell>30" - 36"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Tables */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Tables</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Typical Size Range</TableHead>
                      <TableHead>Seats</TableHead>
                      <TableHead>Height</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Round Dining Table</TableCell>
                      <TableCell>36" - 60" diameter</TableCell>
                      <TableCell>2 - 8 people</TableCell>
                      <TableCell>28" - 30"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rectangular Dining</TableCell>
                      <TableCell>60" - 96" x 36" - 42"</TableCell>
                      <TableCell>4 - 10 people</TableCell>
                      <TableCell>28" - 30"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Coffee Table</TableCell>
                      <TableCell>36" - 54" x 18" - 24"</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>16" - 18"</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Side Table</TableCell>
                      <TableCell>12" - 24" square/round</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>22" - 26"</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Rugs & Textiles */}
          <Card>
            <CardHeader>
              <CardTitle>Rug Size Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Living Room</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Small:</strong> 5' x 8' - Under coffee table only</li>
                    <li>• <strong>Medium:</strong> 6' x 9' or 8' x 10' - Front legs on rug</li>
                    <li>• <strong>Large:</strong> 9' x 12' - All furniture on rug</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Dining Room</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>4-seat table:</strong> 6' x 9' rug minimum</li>
                    <li>• <strong>6-seat table:</strong> 8' x 10' rug minimum</li>
                    <li>• <strong>8+ seat table:</strong> 9' x 12' or larger</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decor Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Decor & Accessories</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Wall Art</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Hang 57"-60" from floor to center of art</li>
                    <li>• Leave 6"-8" between pieces in a gallery wall</li>
                    <li>• Art should be 2/3 the width of furniture below</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Lighting</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Table lamps: 24"-27" tall on side tables</li>
                    <li>• Floor lamps: 58"-64" tall typical</li>
                    <li>• Pendant lights: 30"-36" above tables</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;