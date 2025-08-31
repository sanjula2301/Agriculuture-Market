
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';


const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden bg-cover bg-center h-[500px] pattern-bg">
      {/* Overlay with semi-transparent gradient */}
      <div className="absolute inset-0 lanka-gradient"></div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Fresh from Sri Lankan Farms to Your Doorstep
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connect directly with local farmers and get the freshest produce, spices, and traditional agricultural products at fair prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg"
              className="bg-lanka-spice hover:bg-lanka-spice-dark text-white py-6 px-8 rounded-lg font-medium text-lg"
              onClick={() => navigate('/products')}>
              Browse Products
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-white py-6 px-8 rounded-lg font-medium text-lg">
              Meet Our Farmers
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-lanka-rice/20 rounded-tl-full blur-xl"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-lanka-spice/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default Hero;
