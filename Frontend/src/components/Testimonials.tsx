
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, content, rating, image }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "fill-lanka-spice text-lanka-spice" : "text-gray-300"}
          />
        ))}
      </div>
      
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dinesh Peiris",
      role: "Restaurant Owner",
      content: "Lanka Agri Market has transformed how our restaurant sources ingredients. The quality of spices and fresh produce exceeds anything we found elsewhere, and connecting directly with farmers means better prices for everyone.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Amali Fernando",
      role: "Home Cook",
      content: "I love being able to buy directly from Sri Lankan farmers! The vegetables are so much fresher than what I find at regular markets, and I appreciate knowing exactly where my food comes from.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Ravi Gunawardena",
      role: "Tea Exporter",
      content: "The platform has helped us connect with small-scale spice farmers across the country. The quality control and consistency have been excellent, making our export business much more efficient.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">What Our Customers Say</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have discovered the difference of genuine Sri Lankan agricultural products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
