export const WhyChooseUs = () => {
    const features = [
      {
        icon: "✨",
        title: "Purity Guaranteed",
        description: "Every product is tested and blessed according to ancient Vedic standards"
      },
      {
        icon: "🏔️",
        title: "Himalayan Sourced",
        description: "Direct sourcing from sacred locations across Nepal and Northern India"
      },
      {
        icon: "📿",
        title: "Vedic Authenticity",
        description: "Traditional methods preserved through generations of spiritual masters"
      },
      {
        icon: "🚚",
        title: "Nationwide Delivery",
        description: "Careful packaging and timely delivery across Nepal and beyond"
      },
      {
        icon: "👨‍🏫",
        title: "Expert Guidance",
        description: "Spiritual consultation and ritual guidance from learned pandits"
      },
      {
        icon: "💝",
        title: "Custom Ritual Kits",
        description: "Personalized samagri packages for specific ceremonies and occasions"
      }
    ];
  
    return (
      <section className="py-20 bg-gradient-to-b from-sacred-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-saffron-700 mb-6 hover:scale-105 transition-transform duration-300">
              Why Choose Vaidik?
            </h2>
            <div className="w-24 h-1 bg-sacred-gold mx-auto mb-8 animate-[scale-in_1s_ease-out]"></div>
            <p className="text-xl font-lora text-sandalwood-700 max-w-3xl mx-auto">
              Trusted by thousands of devotees for authentic spiritual essentials
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-saffron-100 transform hover:scale-105 hover:-translate-y-3 animate-[fade-in_0.6s_ease-out] group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-4xl mb-4 text-center transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 animate-bounce" style={{animationDelay: `${index * 0.2}s`}}>{feature.icon}</div>
                <h3 className="text-xl font-cinzel font-semibold text-sandalwood-800 mb-4 text-center group-hover:text-saffron-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sandalwood-700 font-lora text-center leading-relaxed group-hover:text-sandalwood-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
  
          <div className="mt-16 bg-gradient-to-r from-saffron-600 to-sandalwood-700 rounded-2xl p-8 text-center text-white animate-[fade-in_1s_ease-out_0.5s_both] transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-cinzel font-bold mb-4 animate-pulse">
              Blessed by Sacred Traditions
            </h3>
            <p className="text-lg font-lora mb-6 opacity-90">
              Our commitment to authenticity means every product carries the spiritual energy 
              of ancient rituals and traditional blessings
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm font-lora">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold animate-[count-up_2s_ease-out]">500+</div>
                <div className="opacity-80">Sacred Items</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold animate-[count-up_2s_ease-out_0.2s_both]">10,000+</div>
                <div className="opacity-80">Happy Devotees</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold animate-[count-up_2s_ease-out_0.4s_both]">25+</div>
                <div className="opacity-80">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };