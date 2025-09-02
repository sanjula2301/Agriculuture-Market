import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/login/Dashboard";
import Settings from "./pages/login/Settings";
import ProductDisplayPage from './pages/product/productDisplay'; 
import SubmitAd from "./pages/SubmitAd";
import Categories from "./pages/categories/categories";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/vegetables" element={<ProductDisplayPage />} />
          <Route path="/category/fruits" element={<ProductDisplayPage />} />
          <Route path="/category/grains" element={<ProductDisplayPage />} />
          <Route path="/category/spices" element={<ProductDisplayPage />} />
          <Route path="/category/legumes" element={<ProductDisplayPage />} />
          <Route path="/products" element={<ProductDisplayPage  />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/submit-ad" element={<SubmitAd />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
