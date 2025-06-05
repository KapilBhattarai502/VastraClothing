export const Introduction = () => {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-saffron-700 mb-6 hover:scale-105 transition-transform duration-300">
              Our Sacred Mission
            </h2>
            <div className="w-24 h-1 bg-sacred-gold mx-auto mb-8 animate-[scale-in_1s_ease-out]"></div>
          </div>
  
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-[fade-in_1s_ease-out_0.2s_both]">
              <h3 className="text-2xl font-cinzel font-semibold text-sandalwood-800 hover:text-saffron-700 transition-colors duration-300">
                Honoring Life's Sacred Journey
              </h3>
              <p className="text-lg font-lora text-sandalwood-700 leading-relaxed hover:text-sandalwood-800 transition-colors duration-300">
                At Vaidik, we honor the sacredness of life through authentic puja samagri 
                for every stage—from cradle to cremation. Our mission is to preserve the 
                ancient Vedic traditions while making them accessible to modern devotees.
              </p>
              <p className="text-lg font-lora text-sandalwood-700 leading-relaxed hover:text-sandalwood-800 transition-colors duration-300">
                Every item in our collection is carefully sourced, blessed, and prepared 
                according to traditional methods passed down through generations of 
                spiritual practitioners in Nepal and India.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center transform hover:scale-110 transition-all duration-300 animate-[fade-in_1s_ease-out_0.4s_both]">
                  <div className="text-3xl mb-2 animate-bounce">🕉️</div>
                  <h4 className="font-cinzel font-semibold text-sandalwood-800">Authentic</h4>
                  <p className="text-sm font-lora text-sandalwood-600">Traditional Methods</p>
                </div>
                <div className="text-center transform hover:scale-110 transition-all duration-300 animate-[fade-in_1s_ease-out_0.6s_both]">
                  <div className="text-3xl mb-2 animate-bounce" style={{animationDelay: '0.2s'}}>🪔</div>
                  <h4 className="font-cinzel font-semibold text-sandalwood-800">Pure</h4>
                  <p className="text-sm font-lora text-sandalwood-600">Sacred Quality</p>
                </div>
                <div className="text-center transform hover:scale-110 transition-all duration-300 animate-[fade-in_1s_ease-out_0.8s_both]">
                  <div className="text-3xl mb-2 animate-bounce" style={{animationDelay: '0.4s'}}>🙏</div>
                  <h4 className="font-cinzel font-semibold text-sandalwood-800">Blessed</h4>
                  <p className="text-sm font-lora text-sandalwood-600">Spiritually Charged</p>
                </div>
              </div>
            </div>
  
            <div className="relative animate-[fade-in_1s_ease-out_0.4s_both]">
              <img
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Traditional Puja Setup"
                className="w-full h-96 object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:shadow-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saffron-900/20 to-transparent rounded-lg transition-opacity duration-300 hover:opacity-75"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };