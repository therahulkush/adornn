import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using the Havenly Home website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you may not use our services.",
        "We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes."
      ]
    },
    {
      title: "Use of Our Services",
      content: [
        "You must be at least 18 years old to make purchases on our website.",
        "You agree to provide accurate, current, and complete information when creating an account or making a purchase.",
        "You are responsible for maintaining the confidentiality of your account information and password.",
        "You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our website."
      ]
    },
    {
      title: "Products and Pricing",
      content: [
        "All product descriptions, images, and specifications are provided for informational purposes and may not be completely accurate.",
        "Prices are subject to change without notice, but price changes will not affect orders already placed.",
        "We reserve the right to limit quantities, refuse orders, or discontinue products at our discretion.",
        "All sales are in US dollars, and applicable taxes will be added to orders where required by law."
      ]
    },
    {
      title: "Orders and Payment",
      content: [
        "Placing an order constitutes an offer to purchase products subject to these terms.",
        "We reserve the right to accept or decline your order for any reason, including product availability and credit verification.",
        "Payment is due at the time of order, and we accept major credit cards, PayPal, and other approved payment methods.",
        "You authorize us to charge your chosen payment method for the total amount of your order, including applicable taxes and shipping."
      ]
    },
    {
      title: "Shipping and Delivery",
      content: [
        "We will make reasonable efforts to ship orders within the timeframes specified, but delivery dates are estimates only.",
        "Risk of loss and title for products pass to you upon delivery to the shipping carrier.",
        "Shipping costs are calculated based on weight, dimensions, destination, and selected shipping method.",
        "We are not responsible for delays caused by shipping carriers, weather, or other circumstances beyond our control."
      ]
    },
    {
      title: "Returns and Refunds",
      content: [
        "Returns must be initiated within 30 days of delivery and items must be in original condition with tags attached.",
        "Custom, personalized, or clearance items cannot be returned unless defective.",
        "Customers are responsible for return shipping costs unless the item was damaged or defective upon arrival.",
        "Refunds will be processed to the original payment method within 5-7 business days of receiving the returned item.",
        "Restocking fees may apply to certain products as specified in our return policy."
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "All content on our website, including text, images, logos, and designs, is protected by copyright and other intellectual property laws.",
        "You may not reproduce, distribute, or create derivative works from our content without written permission.",
        "Product images and descriptions are provided by manufacturers and suppliers and may be subject to their own copyright restrictions.",
        "Any feedback or suggestions you provide may be used by us without compensation or attribution."
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        "Our liability for any claim related to products or services is limited to the purchase price of the specific product or service.",
        "We are not liable for indirect, incidental, consequential, or punitive damages arising from your use of our services.",
        "Some jurisdictions do not allow limitations on liability, so these limitations may not apply to you.",
        "Our total liability to you for all claims will not exceed the amount you paid for products or services in the 12 months preceding the claim."
      ]
    },
    {
      title: "Indemnification",
      content: [
        "You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.",
        "This includes reasonable attorney fees and costs incurred in defending against such claims.",
        "We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you."
      ]
    },
    {
      title: "Governing Law and Disputes",
      content: [
        "These terms are governed by the laws of [State/Province] without regard to conflict of law principles.",
        "Any disputes arising from these terms or your use of our services will be resolved through binding arbitration or in the courts of [Jurisdiction].",
        "You waive any right to participate in class action lawsuits or class-wide arbitration against us.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect."
      ]
    },
    {
      title: "Contact Information",
      content: [
        "If you have questions about these Terms of Service, please contact us:",
        "Email: legal@havenlyhome.com",
        "Phone: 1-800-HAVENLY (1-800-428-3659)",
        "Mail: Havenly Home Legal Department, [Company Address]"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground mb-8">
            These terms govern your use of Havenly Home's website and services. Please read them carefully.
          </p>
          <p className="text-sm text-muted-foreground">
            Effective Date: January 1, 2025 | Last Updated: January 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Questions About These Terms?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              We're here to help clarify any questions you may have about our terms of service. Don't hesitate to reach out to our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:legal@havenlyhome.com" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                legal@havenlyhome.com
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a 
                href="tel:1-800-428-3659" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                1-800-HAVENLY
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;