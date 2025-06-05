import { Button } from "../../../components/ui/button";


export const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-saffron-600 via-sandalwood-700 to-saffron-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 hover:scale-105 transition-transform duration-300 animate-pulse">
            Begin Your Sacred Journey
          </h2>
          <p className="text-xl font-lora opacity-90 max-w-3xl mx-auto leading-relaxed">
            Whether you're celebrating life's joyous moments or honoring solemn traditions, 
            Vaidik provides the authentic spiritual essentials you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-110 hover:bg-white/20 transition-all duration-300 animate-[fade-in_0.6s_ease-out] group">
            <div className="text-3xl mb-4 group-hover:animate-bounce">🛒</div>
            <h3 className="font-cinzel font-semibold text-lg mb-2 group-hover:text-sacred-gold transition-colors duration-300">Shop Collections</h3>
            <p className="font-lora text-sm opacity-80">Browse our extensive catalog of authentic puja items</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-110 hover:bg-white/20 transition-all duration-300 animate-[fade-in_0.6s_ease-out_0.2s_both] group">
            <div className="text-3xl mb-4 group-hover:animate-bounce">📦</div>
            <h3 className="font-cinzel font-semibold text-lg mb-2 group-hover:text-sacred-gold transition-colors duration-300">Custom Ritual Kits</h3>
            <p className="font-lora text-sm opacity-80">Get personalized samagri packages for your ceremonies</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-110 hover:bg-white/20 transition-all duration-300 animate-[fade-in_0.6s_ease-out_0.4s_both] group">
            <div className="text-3xl mb-4 group-hover:animate-bounce">💬</div>
            <h3 className="font-cinzel font-semibold text-lg mb-2 group-hover:text-sacred-gold transition-colors duration-300">Spiritual Guidance</h3>
            <p className="font-lora text-sm opacity-80">Consult with our experienced pandits</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fade-in_1s_ease-out_0.6s_both]">
          <Button 
            className="bg-white text-saffron-700 hover:bg-sacred-cream px-8 py-4 text-lg font-lora rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Shop Sacred Collection
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-saffron-700 px-8 py-4 text-lg font-lora rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Custom Kit
          </Button>
        </div>

        <div className="mt-12 text-center animate-[fade-in_1s_ease-out_0.8s_both]">
          <p className="font-lora text-sm opacity-80">
            Call us for immediate assistance: <span className="font-semibold hover:text-sacred-gold transition-colors duration-300">+977-1-234-5678</span>
          </p>
        </div>
      </div>
    </section>
  );
};
