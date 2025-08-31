import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthenticationDialog from './login/AuthenticationDialog';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!sessionStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = sessionStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setIsAuthDialogOpen(true);
    }
  };

  const handleAuthDialogClose = () => setIsAuthDialogOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 bg-lanka-green rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lanka-green text-xl">RAN ASWANU</span>
                  <span className="text-xs text-lanka-earth -mt-1">Fresh from the fields</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-lanka-green font-medium">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-lanka-green font-medium">Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-lanka-green font-medium">Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-lanka-green font-medium">About</Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex relative w-1/4">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-lanka-green focus:border-transparent"
              />
              <Search className="absolute left-3 top-[9px] text-gray-400" size={20} />
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-lanka-green"
                onClick={handleAccountClick}
              >
                <User size={22} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-lanka-green relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-lanka-spice text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </Button>
              <Button className="bg-lanka-green hover:bg-lanka-green/90 text-white flex items-center gap-2">
                <Plus size={18} />
                Submit Ads
              </Button>
              {/* Show logout if logged in */}
              {isLoggedIn && (
                <Button variant="ghost" onClick={handleLogout} className="text-gray-700 hover:text-lanka-green">
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-700 hover:text-lanka-green font-medium py-2 px-4 rounded hover:bg-gray-50">Home</Link>
                <Link to="/products" className="text-gray-700 hover:text-lanka-green font-medium py-2 px-4 rounded hover:bg-gray-50">Products</Link>
                <Link to="/categories" className="text-gray-700 hover:text-lanka-green font-medium py-2 px-4 rounded hover:bg-gray-50">Categories</Link>
                <Link to="/about" className="text-gray-700 hover:text-lanka-green font-medium py-2 px-4 rounded hover:bg-gray-50">About</Link>
              </div>

              <div className="mt-4 relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-lanka-green focus:border-transparent"
                />
                <Search className="absolute left-3 top-[9px] text-gray-400" size={20} />
              </div>

              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleAccountClick}
                  >
                    <User size={18} />
                    <span>Account</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ShoppingCart size={18} />
                    <span>Cart (3)</span>
                  </Button>
                </div>
                <Button className="w-full bg-lanka-green hover:bg-lanka-green/90 text-white flex items-center gap-2 justify-center">
                  <Plus size={18} />
                  Submit Ads
                </Button>
                {isLoggedIn && (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthenticationDialog
        isOpen={isAuthDialogOpen}
        onClose={handleAuthDialogClose}
        onLoginSuccess={(token) => {
          sessionStorage.setItem("token", token);
          setIsLoggedIn(true);
          setIsAuthDialogOpen(false);
          navigate("/dashboard");
        }}
      />
    </>
  );
};

export default Navbar;

