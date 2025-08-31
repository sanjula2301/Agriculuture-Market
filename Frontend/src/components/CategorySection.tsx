
import React from 'react';
import { Carrot, Wheat, Bean, Package, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  link: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ icon, name, count, link }) => {
  return (
    <Link to={link} className="product-card flex flex-col items-center p-6 hover:border-lanka-green border-2 border-transparent">
      <div className="w-16 h-16 rounded-full bg-lanka-green/10 flex items-center justify-center text-lanka-green mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{name}</h3>
      <p className="text-sm text-gray-500">{count} Products</p>
    </Link>
  );
};

const CategorySection: React.FC = () => {
  const categories = [
    { icon: <Vegetables />, name: "Vegetables", count: 124, link: "/category/vegetables" },
    { icon: <Fruits />, name: "Fruits", count: 98, link: "/category/fruits" },
    { icon: <Grains />, name: "Grains & Rice", count: 76, link: "/category/grains" },
    { icon: <Spices />, name: "Spices", count: 103, link: "/category/spices" },
    { icon: <Farmers />, name: "Farmers", count: 215, link: "/farmers" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">Browse Categories</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">Explore our wide range of fresh agricultural products sourced directly from Sri Lankan farmers.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom icon components
const Vegetables = () => {
  return <Carrot size={32} />;
};

const Fruits = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C14.5 5 15.5 8 12 8C8.5 8 9.5 5 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const Grains = () => {
  return <Wheat size={32} />;
};

const Spices = () => {
  return <Bean size={32} />;
};

const Farmers = () => {
  return <User size={32} />;
};

export default CategorySection;
