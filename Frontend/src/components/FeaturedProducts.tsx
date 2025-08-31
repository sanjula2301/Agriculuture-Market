
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from "@/components/ui/button";

interface FeaturedProductsProps {
  onProductClick?: (product: any) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      name: "Fresh Ceylon Cinnamon",
      category: "Spices",
      price: 750,
      unit: "100g",
      rating: 4.8,
      farmer: "Kamal Perera",
      location: "Matale, Sri Lanka",
      image: "https://images.unsplash.com/photo-1625017013019-00716ce0f6f8?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 2,
      name: "Organic Red Rice",
      category: "Grains",
      price: 320,
      unit: "kg",
      rating: 4.5,
      farmer: "Nimal Silva",
      location: "Anuradhapura, Sri Lanka",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 3,
      name: "Ceylon Black Pepper",
      category: "Spices",
      price: 980,
      unit: "250g",
      rating: 4.9,
      farmer: "Sunil Jayawardena",
      location: "Matale, Sri Lanka",
      image: "https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 4,
      name: "Fresh Coconuts",
      category: "Fruits",
      price: 180,
      unit: "each",
      rating: 4.7,
      farmer: "Lakshmi Fernando",
      location: "Gampaha, Sri Lanka",
      image: "https://images.unsplash.com/photo-1581375234356-b32b6d642309?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 5,
      name: "Organic King Coconut",
      category: "Fruits",
      price: 220,
      unit: "each",
      rating: 4.6,
      farmer: "Priya Bandara",
      location: "Colombo, Sri Lanka",
      image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&q=80&w=1000" 
    },
    {
      id: 6,
      name: "Fresh Green Chillies",
      category: "Vegetables",
      price: 280,
      unit: "500g",
      rating: 4.4,
      farmer: "Chaminda Perera",
      location: "Nuwara Eliya, Sri Lanka",
      image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 7,
      name: "Organic Turmeric Powder",
      category: "Spices",
      price: 450,
      unit: "100g",
      rating: 4.8,
      farmer: "Ranjith Kumara",
      location: "Matale, Sri Lanka",
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9800c7?auto=format&fit=crop&q=80&w=1000"
    },
    {
      id: 8,
      name: "Fresh Jackfruit",
      category: "Fruits",
      price: 650,
      unit: "kg",
      rating: 4.7,
      farmer: "Anura Dissanayake",
      location: "Kurunegala, Sri Lanka",
      image: "https://images.unsplash.com/photo-1593465678160-8289637c7d1b?auto=format&fit=crop&q=80&w=1000"
    },
  ];

  const handleProductClick = (id: number) => {
    const product = products.find(p => p.id === id);
    if (product && onProductClick) {
      onProductClick({
        ...product,
        price: `Rs. ${product.price}.00/${product.unit}`
      });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">Featured Products</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Discover our handpicked selection of premium Sri Lankan agricultural products from trusted farmers.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} onProductClick={handleProductClick} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-lanka-green text-lanka-green hover:bg-lanka-green hover:text-white">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
