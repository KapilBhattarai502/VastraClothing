import { Card, CardContent } from "../../../components/ui/card";


export const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Kathmandu",
      text: "Vaidik has been our family's trusted source for all puja samagri for over 10 years. The quality and authenticity of their products is unmatched.",
      ceremony: "Weekly Puja"
    },
    {
      name: "Rajesh Thapa",
      location: "Pokhara",
      text: "When my daughter's wedding approached, Vaidik provided everything we needed. Their custom ritual kit made our ceremony truly blessed.",
      ceremony: "Wedding Ceremony"
    },
    {
      name: "Sita Devi",
      location: "Lalitpur",
      text: "During my father's last rites, Vaidik's compassionate service and authentic ritual items brought peace to our family during a difficult time.",
      ceremony: "Antim Sanskar"
    },
    {
      name: "Mohan Acharya",
      location: "Bhaktapur",
      text: "As a pandit, I recommend Vaidik to all devotees. Their products maintain the spiritual purity required for effective rituals.",
      ceremony: "Professional Pandit"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sacred-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-saffron-700 mb-6 hover:scale-105 transition-transform duration-300">
            Devotee Testimonials
          </h2>
          <div className="w-24 h-1 bg-sacred-gold mx-auto mb-8 animate-[scale-in_1s_ease-out]"></div>
          <p className="text-xl font-lora text-sandalwood-700">
            Hear from our spiritual family
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white border-saffron-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-[fade-in_0.6s_ease-out] group"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-3xl text-sacred-gold mb-4 animate-pulse">"</div>
                  <p className="text-sandalwood-700 font-lora italic leading-relaxed group-hover:text-sandalwood-800 transition-colors duration-300">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    <h4 className="font-cinzel font-semibold text-sandalwood-800 group-hover:text-saffron-700 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-sandalwood-600 font-lora">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-saffron-600 font-lora uppercase tracking-wide animate-pulse">
                      {testimonial.ceremony}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-[fade-in_1s_ease-out_0.6s_both]">
          <div className="flex justify-center items-center space-x-2 text-sacred-gold">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className="text-2xl animate-bounce hover:scale-125 transition-transform duration-300" 
                style={{animationDelay: `${i * 0.1}s`}}
              >
                ⭐
              </span>
            ))}
          </div>
          <p className="text-sandalwood-700 font-lora mt-2">
            Trusted by over 10,000 satisfied devotees
          </p>
        </div>
      </div>
    </section>
  );
};