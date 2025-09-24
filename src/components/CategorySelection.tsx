import { Heart, Building2, ArrowRight, Users, Shield, Globe, CheckCircle, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";

interface CategorySelectionProps {
  onSelectCategory: (category: 'donor' | 'hospital') => void;
}

export function CategorySelection({ onSelectCategory }: CategorySelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-3 shadow-lg">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 animate-bounce" />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                BloodMate
              </h1>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 shadow">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  FDA Approved
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 shadow">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure Platform
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            <span className="font-semibold text-gray-900">Connecting life-savers with those in need.</span><br className="hidden sm:block" />
            <span className="text-lg sm:text-xl">Choose your role to start making a difference today.</span>
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 animate-fade-in">50K+</div>
            <div className="text-sm sm:text-base text-gray-600">Donors Registered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 animate-fade-in delay-100">200+</div>
            <div className="text-sm sm:text-base text-gray-600">Partner Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 animate-fade-in delay-200">150K+</div>
            <div className="text-sm sm:text-base text-gray-600">Lives Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 animate-fade-in delay-300">24/7</div>
            <div className="text-sm sm:text-base text-gray-600">Emergency Support</div>
          </div>
        </div>

        {/* Hero Image with subtle animation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative w-full max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1612636320854-776180f479d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGhlcm8lMjBtb2Rlcm58ZW58MXx8fHwxNzU4NDQwMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern healthcare and blood donation"
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-12">
          {/* Blood Donor Card */}
          <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:ring-4 hover:ring-red-200">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 group-hover:from-red-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200/50 to-pink-200/50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <CardHeader className="relative text-center p-6 sm:p-8">
              <div className="mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-4 shadow-lg">
                  <Heart className="h-12 w-12 sm:h-14 sm:w-14 text-white animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl text-gray-900 mb-2">Blood Donor</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Register as a donor and help save lives in your community
              </CardDescription>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">50K+ Members</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-6 p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Register blood type & details</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Get instant notifications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Track donation history</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Find nearby centers</span>
                </div>
              </div>
              <Button 
                onClick={() => onSelectCategory('donor')}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-4 rounded-xl group relative overflow-hidden font-semibold text-lg shadow-lg"
                size="lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="font-bold text-pink-100 drop-shadow-[0_1px_2px_rgba(255,0,80,0.3)]">
      Register as <span className="text-yellow-200">Donor</span>
    </span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </CardContent>
          </Card>

          {/* Hospital Card */}
          <Card className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:ring-4 hover:ring-blue-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <CardHeader className="relative text-center p-6 sm:p-8">
              <div className="mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-4 shadow-lg">
                  <Building2 className="h-12 w-12 sm:h-14 sm:w-14 text-white animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl text-gray-900 mb-2">Hospital</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Request blood donations and manage inventory for your hospital
              </CardDescription>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">200+ Hospitals</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-6 p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Submit urgent requests</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Manage blood inventory</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Connect with donors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">Track campaigns</span>
                </div>
              </div>
              <Button 
                onClick={() => onSelectCategory('hospital')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-4 rounded-xl group relative overflow-hidden font-semibold text-lg shadow-lg"
                size="lg"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="font-bold text-blue-100 drop-shadow-[0_1px_2px_rgba(0,80,255,0.3)]">
      Register as <span className="text-yellow-200">Hospital</span>
    </span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Trusted by Healthcare Professionals</h3>
            <p className="text-gray-600">Join thousands of donors and hospitals making a difference every day</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">HIPAA Compliant</h4>
              <p className="text-sm text-gray-600">Your data is secure and protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">FDA Approved</h4>
              <p className="text-sm text-gray-600">Meets all safety standards</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Nationwide Network</h4>
              <p className="text-sm text-gray-600">Connected across the country</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Life-Saving Impact</h4>
              <p className="text-sm text-gray-600">Every donation saves 3 lives</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6 px-4">
            <span className="font-semibold">Together, we can save lives and make a difference</span><br />
            <span className="text-gray-600">in our community, one donation at a time.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">24/7 Emergency Support</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Secure & Private Platform</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium">FDA Compliant System</span>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes spin-slow { 0% { transform: rotate(0deg);} 100% {transform: rotate(360deg);} }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}