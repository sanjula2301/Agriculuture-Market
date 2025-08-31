

import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from 'lucide-react';

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  farmer: string;
  image: string;
  onProductClick?: (id: number) => void;
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, 
  name, 
  category, 
  price, 
  unit, 
  rating, 
  farmer, 
  image, 
  onProductClick 
}) => {
  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(id);
    }
  };

  return (
    <div className="product-card h-full flex flex-col cursor-pointer" onClick={handleCardClick}>
      <div className="relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 bg-lanka-green text-white text-xs font-semibold px-2 py-1">
          {category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">By {farmer}</p>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < rating ? "fill-lanka-spice text-lanka-spice" : "text-gray-300"}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</span>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <div className="text-lanka-green font-bold text-xl">
              Rs. {price.toFixed(2)}
              <span className="text-xs text-gray-500 font-normal ml-1">/ {unit}</span>
            </div>
          </div>
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-lanka-green hover:bg-lanka-green-dark"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to cart
            }}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
