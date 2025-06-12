
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";


export const ProductCategories = () => {
  const navigate=useNavigate()
  const categories = [
    {
      title: "Birth & Naming Ceremony",
      subtitle: "Namkaran Sanskar",
      description: "Sacred essentials for welcoming new souls and blessing their spiritual journey",
      items: ["Holy Water (Gangajal)", "Sacred Threads", "Turmeric Paste", "Rice Grains", "Incense Sticks"],
      icon: "👶",
      color: "from-saffron-100 to-sacred-cream"
    },
    {
      title: "Thread Ceremony & Weddings",
      subtitle: "Upanayan & Vivah",
      description: "Complete ritual kits for life's most important spiritual transitions",
      items: ["Sacred Threads", "Wedding Garlands", "Havan Samagri", "Vermillion", "Sacred Cloth"],
      icon: "💒",
      color: "from-sandalwood-100 to-saffron-50"
    },
    {
      title: "Festival Celebrations",
      subtitle: "Diwali, Navratri, Holi",
      description: "Everything needed to celebrate Hindu festivals with traditional authenticity",
      items: ["Diyas & Oil Lamps", "Rangoli Colors", "Puja Flowers", "Sweets Offerings", "Festival Decorations"],
      icon: "🎉",
      color: "from-sacred-cream to-sandalwood-100"
    },
    {
      title: "Daily Puja Items",
      subtitle: "Nitya Puja Samagri",
      description: "Essential items for daily worship and spiritual practice",
      items: ["Incense & Dhoop", "Camphor", "Sacred Ash", "Tulsi Leaves", "Brass Utensils"],
      icon: "🪔",
      color: "from-saffron-50 to-sacred-cream"
    },
    {
      title: "Death Rituals",
      subtitle: "Antim Sanskar",
      description: "Respectful ritual essentials for the final spiritual journey",
      items: ["Sacred Wood", "White Cloth", "Sesame Seeds", "Sacred Herbs", "Memorial Items"],
      icon: "🕊️",
      color: "from-sandalwood-50 to-saffron-100"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-sacred-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-saffron-700 mb-6 hover:scale-105 transition-transform duration-300">
            Sacred Product Categories
          </h2>
          <div className="w-24 h-1 bg-sacred-gold mx-auto mb-8 animate-[scale-in_1s_ease-out]"></div>
          <p className="text-xl font-lora text-sandalwood-700 max-w-3xl mx-auto">
            Comprehensive ritual essentials for every stage of your spiritual journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden bg-gradient-to-br ${category.color} border-saffron-200 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-[fade-in_0.6s_ease-out] group`}
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={()=>navigate("/vaidik/functions?category=bratabandha")}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{category.icon}</div>
                <CardTitle className="text-xl font-cinzel text-sandalwood-800 mb-2 group-hover:text-saffron-700 transition-colors duration-300">
                  {category.title}
                </CardTitle>
                <p className="text-sm font-lora text-saffron-600 italic">
                  {category.subtitle}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sandalwood-700 font-lora text-sm leading-relaxed group-hover:text-sandalwood-800 transition-colors duration-300">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="flex items-center text-sm font-lora text-sandalwood-600 transform hover:translate-x-2 transition-transform duration-200"
                      style={{animationDelay: `${(index * 0.1) + (itemIndex * 0.05)}s`}}
                    >
                      <span className="w-2 h-2 bg-sacred-gold rounded-full mr-3 animate-pulse"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-saffron-600 text-saffron-700 hover:bg-saffron-50 font-lora transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Explore Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};