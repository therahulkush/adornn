import { useState } from "react";
import { ChevronRight, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { styleQuizOptions, getProductsByStyle } from "@/data/products";
import ProductCard from "./ProductCard";
import { useWishlist } from '@/contexts/WishlistContext';

const StyleQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [styleResults, setStyleResults] = useState<string[]>([]);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const questions = Object.values(styleQuizOptions);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate style results
      const styleCount: Record<string, number> = {};
      
      Object.entries(newAnswers).forEach(([questionKey, answerId]) => {
        const question = styleQuizOptions[questionKey as keyof typeof styleQuizOptions];
        const selectedOption = question.options.find(opt => opt.id === answerId);
        
        if (selectedOption) {
          selectedOption.styles.forEach(style => {
            styleCount[style] = (styleCount[style] || 0) + 1;
          });
        }
      });

      // Get top 2-3 styles
      const topStyles = Object.entries(styleCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([style]) => style);

      setStyleResults(topStyles);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setStyleResults([]);
  };

  const recommendedProducts = getProductsByStyle(styleResults);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Results Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-hero text-primary-foreground rounded-full">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Your Style Results</span>
          </div>
          
          <h2 className="text-hero text-primary">
            You're a {styleResults.join(" + ")} lover!
          </h2>
          
          <p className="text-subtitle max-w-2xl mx-auto">
            Based on your preferences, we've curated a collection of pieces that perfectly match your aesthetic. 
            These handpicked items will help you create the home of your dreams.
          </p>
        </div>

        {/* Style Description Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styleResults.map((style, index) => (
            <Card key={style} className="card-warm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-semibold text-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-medium text-primary mb-2">
                  {style}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for creating spaces that feel {style.toLowerCase()} and inviting.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommended Products */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-playfair text-2xl font-medium text-primary mb-2">
              Curated Just for You
            </h3>
            <p className="text-muted-foreground">
              Products that match your {styleResults.join(" + ").toLowerCase()} style
            </p>
          </div>

          <div className="product-grid">
            {recommendedProducts.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onToggleWishlist={toggleWishlist}
                isWishlisted={isWishlisted(product.id)}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-x-4">
          <Button onClick={resetQuiz} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Take Quiz Again
          </Button>
          <Button className="btn-hero">
            Shop All Recommended
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const questionKey = Object.keys(styleQuizOptions)[currentQuestion] as keyof typeof styleQuizOptions;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="card-warm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="font-playfair text-2xl text-primary">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentQ.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full justify-between text-left h-auto p-6 hover:border-primary/50 hover:bg-secondary/50"
              onClick={() => handleAnswer(questionKey, option.id)}
            >
              <span className="font-medium">{option.text}</span>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Quiz Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Answer honestly to get the most accurate style recommendations
        </p>
      </div>
    </div>
  );
};

export default StyleQuiz;