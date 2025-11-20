import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days and is free on orders over $75. Express shipping (2-3 days) is available for $19.99. Processing time is typically 1-2 business days."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also check your order status by logging into your account and viewing your order history."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within the United States and Canada. We're working on expanding to more countries soon!"
        },
        {
          question: "Can I change or cancel my order?",
          answer: "Orders can be modified or cancelled within 2 hours of placement. After that, we may have already started processing your order. Contact us immediately if you need to make changes."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return window from delivery date. Items must be unused, in original packaging with tags attached. Custom or personalized items cannot be returned."
        },
        {
          question: "How do I return an item?",
          answer: "Contact our customer service team or use our online return form. We'll email you a prepaid return label. Package your items securely and drop off at any authorized shipping location."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive your return. The refund will appear on your original payment method."
        },
        {
          question: "Can I exchange an item for a different size or color?",
          answer: "Yes! Exchanges follow the same 30-day window and condition requirements as returns. Subject to availability of the new item."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "How do I know what size furniture to order?",
          answer: "Check our comprehensive Size Guide for room planning tips and furniture dimensions. Measure your space carefully and consider doorways, stairs, and existing furniture."
        },
        {
          question: "Are the colors accurate on my screen?",
          answer: "We work hard to display colors accurately, but monitor settings can vary. If you're unsure about a color, order a sample or contact us for more detailed color information."
        },
        {
          question: "Do you offer fabric samples?",
          answer: "Yes! We offer fabric and material samples for most upholstered furniture and textiles. Samples are $5 each with free shipping, and the cost is credited to your account when you purchase the full item."
        },
        {
          question: "What if an item arrives damaged?",
          answer: "Contact us within 48 hours with photos of the damage and packaging. We'll arrange for a replacement or full refund at no cost to you."
        }
      ]
    },
    {
      category: "Account & Payments",
      questions: [
        {
          question: "Do I need to create an account to shop?",
          answer: "You can shop as a guest, but creating an account lets you track orders, save favorites, get personalized recommendations, and checkout faster on future purchases."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. We also offer financing options for larger purchases."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers."
        },
        {
          question: "Do you offer financing?",
          answer: "Yes! We partner with financing companies to offer flexible payment plans for purchases over $99. Options include 0% APR for qualified customers."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about shopping with Havenly Home.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

          {searchQuery && filteredFAQs.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No FAQ matches found for "{searchQuery}"
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Still have questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <MessageCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
                <Button variant="outline" size="sm">Start Chat</Button>
              </div>
              <div className="space-y-2">
                <Mail className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">help@havenlyhome.com</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/contact">Send Email</a>
                </Button>
              </div>
              <div className="space-y-2">
                <Phone className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-sm text-muted-foreground">1-800-HAVENLY</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:1-800-428-3659">Call Now</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;