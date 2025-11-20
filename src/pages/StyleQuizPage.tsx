import StyleQuiz from "@/components/StyleQuiz";

const StyleQuizPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Page Header */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-hero text-primary mb-4">
            Discover Your Style
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Answer a few quick questions to get personalized home decor recommendations 
            that perfectly match your aesthetic preferences.
          </p>
        </div>
      </section>

      {/* Quiz Component */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <StyleQuiz />
        </div>
      </section>
    </div>
  );
};

export default StyleQuizPage;