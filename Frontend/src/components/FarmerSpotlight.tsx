
import React from 'react';
import { Button } from "@/components/ui/button";

const FarmerSpotlight: React.FC = () => {
  return (
    <section className="py-16 bg-lanka-green text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Meet Our Local Farmers</h2>
            <p className="text-lg mb-6 opacity-90">
              At Lanka Agri Market, we connect you directly with passionate Sri Lankan farmers who grow the finest produce using traditional and sustainable farming methods.
            </p>
            <p className="mb-8 opacity-90">
              By buying directly from our network of over 200 verified local farmers, you're supporting rural communities and ensuring fair compensation for their hard work while enjoying the freshest products.
            </p>
            <Button size="lg" className="bg-white text-lanka-green hover:bg-lanka-rice">
              Meet Our Farmers
            </Button>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg h-40 md:h-64">
              <img 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80&w=1000" 
                alt="Sri Lankan Farmer" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-40 md:h-64 mt-4">
              <img 
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80&w=1000" 
                alt="Sri Lankan Farming" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-40 md:h-64 col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80&w=1000" 
                alt="Sri Lankan Agriculture" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerSpotlight;
