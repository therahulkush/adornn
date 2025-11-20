const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">About Havenly Home</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe everyone deserves a beautiful home, regardless of budget. Our mission is to make elevated style accessible to all.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2024, Havenly Home was born from a simple belief: great design shouldn't be reserved for those with unlimited budgets. We started as a small team of design enthusiasts who were frustrated by the lack of affordable, well-designed home decor options.
              </p>
              <p>
                Today, we work directly with emerging designers and established brands to curate a collection of beautiful, functional pieces that don't compromise on quality or style. Every product in our collection is hand-picked by our design team.
              </p>
              <p>
                We're more than just a retailer – we're your design partner, helping you create spaces that reflect your personality and make you feel at home.
              </p>
            </div>
          </div>
          <img 
            src="/team-photo.jpg" 
            alt="Havenly Home team working together in modern office" 
            className="rounded-lg aspect-square object-cover w-full"
          />
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Accessible Design</h3>
              <p className="text-muted-foreground">
                Beautiful design should be accessible to everyone, not just those with designer budgets.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Every piece is selected for durability and craftsmanship.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sustainable Choices</h3>
              <p className="text-muted-foreground">
                We prioritize sustainable materials and work with brands that share our environmental values.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="/sarah-chen.jpg" 
                alt="Sarah Chen - Founder & Creative Director" 
                className="rounded-lg aspect-square object-cover w-full mb-4"
              />
              <h3 className="text-lg font-semibold text-foreground">Sarah Chen</h3>
              <p className="text-muted-foreground">Founder & Creative Director</p>
            </div>
            <div className="text-center">
              <img 
                src="/marcus-rodriguez.jpg" 
                alt="Marcus Rodriguez - Head of Product Curation" 
                className="rounded-lg aspect-square object-cover w-full mb-4"
              />
              <h3 className="text-lg font-semibold text-foreground">Marcus Rodriguez</h3>
              <p className="text-muted-foreground">Head of Product Curation</p>
            </div>
            <div className="text-center">
              <img 
                src="/emily-watson.jpg" 
                alt="Emily Watson - Customer Experience Lead" 
                className="rounded-lg aspect-square object-cover w-full mb-4"
              />
              <h3 className="text-lg font-semibold text-foreground">Emily Watson</h3>
              <p className="text-muted-foreground">Customer Experience Lead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;