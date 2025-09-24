import { ArrowLeft, Heart, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DonorLoginProps {
  onBack: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export function DonorLogin({ onBack, onLogin, onRegister }: DonorLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Blood Donor Login</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-red-100 rounded-full w-fit">
                <Heart className="h-12 w-12 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your donor account to continue saving lives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}

                <div className="flex items-center justify-between">
                  <Button variant="link" className="p-0 h-auto text-red-600">
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  onClick={handleLogin}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  size="lg"
                >
                  Sign In
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    New to BloodConnect?
                  </span>
                </div>
              </div>

              <Button 
                onClick={onRegister}
                variant="outline" 
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
                size="lg"
              >
                Create New Account
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card className="mt-6 border-red-100">
            <CardHeader>
              <CardTitle className="text-lg text-center">Why Join BloodConnect?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Save up to 3 lives with each donation
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Free health screenings and blood tests
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Track your donation impact
              </div>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Connect with local hospitals in need
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}