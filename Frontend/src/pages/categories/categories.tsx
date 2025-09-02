import React from 'react';
import { Carrot, Wheat, Bean, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  link: string;
  description: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ icon, name, count, link, description }) => {
  return (
    <Link to={link} className="group">
      <div className="product-card p-8 text-center hover:border-primary transition-all duration-300">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="text-primary font-medium">
          {count} Products Available
        </div>
      </div>
    </Link>
  );
};

const Categories: React.FC = () => {
  const categories = [
    { 
      icon: <Vegetables />, 
      name: "Vegetables", 
      count: 124, 
      link: "/category/vegetables",
      description: "Fresh organic vegetables from local farms including leafy greens, roots, and seasonal produce."
    },
    { 
      icon: <Fruits />, 
      name: "Fruits", 
      count: 98, 
      link: "/category/fruits",
      description: "Tropical and seasonal fruits including mangoes, pineapples, coconuts, and citrus varieties."
    },
    { 
      icon: <Grains />, 
      name: "Grains & Rice", 
      count: 76, 
      link: "/category/grains",
      description: "Premium rice varieties and grains including basmati, red rice, quinoa, and traditional cereals."
    },
    { 
      icon: <Spices />, 
      name: "Spices", 
      count: 103, 
      link: "/category/spices",
      description: "Authentic Sri Lankan spices including cinnamon, cardamom, cloves, and specialty spice blends."
    },
    { 
      icon: <Farmers />, 
      name: "Farmers", 
      count: 215, 
      link: "/farmers",
      description: "Connect directly with verified local farmers and agricultural cooperatives across Sri Lanka."
    },
    { 
      icon: <Bean />, 
      name: "Legumes", 
      count: 67, 
      link: "/category/legumes",
      description: "Various beans, lentils, and pulses essential for traditional Sri Lankan cooking."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Categories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our wide range of fresh agricultural products sourced directly from Sri Lankan farmers. 
            From organic vegetables to premium spices, find everything you need for authentic cooking.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Custom icon components
const Vegetables = () => {
  return <Carrot size={40} />;
};

const Fruits = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C14.5 5 15.5 8 12 8C8.5 8 9.5 5 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const Grains = () => {
  return <Wheat size={40} />;
};

const Spices = () => {
  return <Bean size={40} />;
};

const Farmers = () => {
  return <User size={40} />;
};

export default Categories;