
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-lanka-earth text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Lanka Agri</h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter for seasonal updates, farming tips, new product alerts, and exclusive offers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white"
              required
            />
            <Button type="submit" className="bg-lanka-spice hover:bg-lanka-spice-dark text-white">
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm mt-4 opacity-75">
            We respect your privacy and will never share your information with third parties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
