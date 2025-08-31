import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ArrowLeft, User, MapPin, Wheat, Mail, Phone, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FarmerRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nicNumber: "",
    dateOfBirth: "",
    address: "",
    district: "",
    province: "",
    farmName: "",
    farmSize: "",
    farmType: "",
    mainCrops: "",
    experience: "",
    hasOrganic: false,
    bankAccountNumber: "",
    bankName: "",
    branchName: "",
    profileImage: null as File | null
  });

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google login integration
    toast({
      title: "Google Login",
      description: "Google login integration would be implemented here with proper OAuth setup.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted!",
      description: "Your farmer registration has been submitted successfully. We'll review and contact you soon.",
    });
    console.log("Form submitted:", formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange("profileImage", file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Lanka Agri</h2>
                  <p className="text-xs text-gray-600">Fresh from the fields</p>
                </div>
              </div>
            </Link>
            <div className="text-sm text-gray-600">
              Farmer Registration
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Join Lanka Agri Family</h1>
          <p className="text-xl text-green-100">
            Register as a farmer and connect directly with customers across Sri Lanka
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Please provide your personal details for registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {formData.profileImage ? (
                    <img 
                      src={URL.createObjectURL(formData.profileImage)} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <Label htmlFor="profileImage" className="cursor-pointer">
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-colors">
                    Upload Profile Photo
                  </div>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="flex items-center space-x-2 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Google</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+94 XX XXX XXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nicNumber">NIC Number *</Label>
                  <Input
                    id="nicNumber"
                    value={formData.nicNumber}
                    onChange={(e) => handleInputChange("nicNumber", e.target.value)}
                    placeholder="XXXXXXXXV or XXXXXXXXXXXX"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <MapPin className="w-5 h-5 mr-2" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="House number, street, city"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select onValueChange={(value) => handleInputChange("district", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="colombo">Colombo</SelectItem>
                      <SelectItem value="kandy">Kandy</SelectItem>
                      <SelectItem value="galle">Galle</SelectItem>
                      <SelectItem value="kurunegala">Kurunegala</SelectItem>
                      <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                      <SelectItem value="ratnapura">Ratnapura</SelectItem>
                      <SelectItem value="matara">Matara</SelectItem>
                      <SelectItem value="batticaloa">Batticaloa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="province">Province *</Label>
                  <Select onValueChange={(value) => handleInputChange("province", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="western">Western</SelectItem>
                      <SelectItem value="central">Central</SelectItem>
                      <SelectItem value="southern">Southern</SelectItem>
                      <SelectItem value="northern">Northern</SelectItem>
                      <SelectItem value="eastern">Eastern</SelectItem>
                      <SelectItem value="north-western">North Western</SelectItem>
                      <SelectItem value="north-central">North Central</SelectItem>
                      <SelectItem value="uva">Uva</SelectItem>
                      <SelectItem value="sabaragamuwa">Sabaragamuwa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Wheat className="w-5 h-5 mr-2" />
                Farm Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  value={formData.farmName}
                  onChange={(e) => handleInputChange("farmName", e.target.value)}
                  placeholder="Your farm's name (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (in acres) *</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange("farmSize", e.target.value)}
                    placeholder="e.g., 2.5"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmType">Farm Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("farmType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Farm Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetable Farm</SelectItem>
                      <SelectItem value="fruits">Fruit Farm</SelectItem>
                      <SelectItem value="rice">Rice Farm</SelectItem>
                      <SelectItem value="spices">Spice Farm</SelectItem>
                      <SelectItem value="mixed">Mixed Farming</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="dairy">Dairy Farm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainCrops">Main Crops/Products *</Label>
                <Textarea
                  id="mainCrops"
                  value={formData.mainCrops}
                  onChange={(e) => handleInputChange("mainCrops", e.target.value)}
                  placeholder="List your main crops or products (e.g., Rice, Tomatoes, Carrots, etc.)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Select onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-20">11-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasOrganic"
                  checked={formData.hasOrganic}
                  onCheckedChange={(checked) => handleInputChange("hasOrganic", checked)}
                />
                <Label htmlFor="hasOrganic">
                  I grow organic/certified organic products
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Banking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Banking Information</CardTitle>
              <CardDescription>
                Required for payment processing (all information is kept secure)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select onValueChange={(value) => handleInputChange("bankName", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boc">Bank of Ceylon</SelectItem>
                    <SelectItem value="peoples">People's Bank</SelectItem>
                    <SelectItem value="commercial">Commercial Bank</SelectItem>
                    <SelectItem value="hatton">Hatton National Bank</SelectItem>
                    <SelectItem value="sampath">Sampath Bank</SelectItem>
                    <SelectItem value="ndb">NDB Bank</SelectItem>
                    <SelectItem value="dfcc">DFCC Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="branchName">Branch Name *</Label>
                  <Input
                    id="branchName"
                    value={formData.branchName}
                    onChange={(e) => handleInputChange("branchName", e.target.value)}
                    placeholder="e.g., Colombo Main"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccountNumber">Account Number *</Label>
                  <Input
                    id="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 text-lg"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerRegistration;
