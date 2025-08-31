import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FarmerSpotlight from '@/components/FarmerSpotlight';
import Testimonials from '@/components/Testimonials';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ProductDescription from '@/components/product/ProductDescription/ProductDescription';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleProductClick = (product: any) => {
    // Update URL with product name
    const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');
    window.history.pushState({}, '', `/product/${productSlug}`);
    setSelectedProduct(product);
  };

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <ProductDescription product={selectedProduct} onBack={handleBackToHome} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedProducts onProductClick={handleProductClick} />
        <FarmerSpotlight />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;