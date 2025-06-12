import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";


export const Hero = () => {
  const navigate=useNavigate()
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Traditional Hindu Puja"
          className="w-full h-full object-cover opacity-20 animate-[zoom_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-saffron-50/80 via-sacred-cream/90 to-sandalwood-100/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-saffron-700 mb-4 animate-[fade-in_1s_ease-out] hover:scale-105 transition-transform duration-300">
            वैदिक
          </h1>
          <h2 className="text-3xl md:text-4xl font-cinzel font-semibold text-sandalwood-800 mb-6 animate-[fade-in_1.2s_ease-out]">
            Vaidik
          </h2>
          <p className="text-xl md:text-2xl font-lora text-sandalwood-700 mb-8 leading-relaxed animate-[fade-in_1.4s_ease-out]">
            Sacred Essentials for Every Ritual of Life
          </p>
          <p className="text-lg font-lora text-sandalwood-600 mb-12 max-w-2xl mx-auto animate-[fade-in_1.6s_ease-out]">
            From the first breath to the final journey, we provide authentic puja samagri 
            for every sacred moment in your spiritual path
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fade-in_1.8s_ease-out]">
            <Button 
              className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-4 text-lg font-lora rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              onClick={()=>navigate("/vaidik/store")}
            >
              Explore Sacred Collection
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-sandalwood-600 text-sandalwood-700 hover:bg-sandalwood-50 px-8 py-4 text-lg font-lora rounded-lg transition-all duration-300 hover:scale-105"
            >
              Learn About Rituals
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-sacred-gold/20 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <span className="text-2xl animate-pulse">🕉️</span>
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{animationDelay: '1s'}}>
        <div className="w-12 h-12 rounded-full bg-saffron-300/30 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <span className="text-xl animate-pulse" style={{animationDelay: '0.5s'}}>🪔</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-5 animate-float" style={{animationDelay: '2s'}}>
        <div className="w-8 h-8 rounded-full bg-sandalwood-200/40 flex items-center justify-center">
          <span className="text-sm">🌸</span>
        </div>
      </div>
    </section>
  );
};