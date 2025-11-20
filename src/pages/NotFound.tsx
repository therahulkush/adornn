import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <Card className="card-warm max-w-lg mx-auto">
          <CardContent className="text-center p-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-playfair text-3xl font-semibold">
                  404
                </span>
              </div>
              <h1 className="font-playfair text-2xl font-medium text-primary mb-2">
                Page Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                Oops! The page you're looking for doesn't exist. 
                Let's get you back to discovering beautiful home decor.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="btn-hero">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/shop">
                  Shop All Products
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
