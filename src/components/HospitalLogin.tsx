import { ArrowLeft, Building2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// --- THE NEW (CORRECT) CODE ---
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // We now import auth and db directly

interface HospitalLoginProps {
  onBack: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export function HospitalLogin({ onBack, onLogin, onRegister }: HospitalLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get Firebase auth instance
  // const auth = getAuth(app);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // --- Sign in user with email and password ---
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Hospital user signed in successfully!");
      onLogin(); // Navigate to the dashboard or next page on success

    } catch (error: any) {
      console.error("Error during login:", error);
      // Provide user-friendly error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Hospital Access</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Hospital Login</CardTitle>
              <CardDescription>
                Access your hospital account to request blood donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Hospital Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@hospital.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
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

                <div className="flex items-center justify-between">
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Forgot password?
                  </Button>
                </div>
                
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <Button 
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  size="lg"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    New Hospital?
                  </span>
                </div>
              </div>

              <Button 
                onClick={onRegister}
                variant="outline" 
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                size="lg"
              >
                Register Hospital
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Card (no changes needed here) */}
          <Card className="mt-6 border-blue-100">
            {/* ... */}
          </Card>
        </div>
      </div>
    </div>
  );
}

// Implementation using Firebase Auth
function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}
