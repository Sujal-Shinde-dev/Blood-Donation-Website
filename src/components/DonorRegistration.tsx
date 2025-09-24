import { ArrowLeft, User, Heart, Phone, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";


// --- THE NEW (CORRECT) CODE ---
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // We now import auth and db directly

interface DonorRegistrationProps {
  onBack: () => void;
  onRegister: () => void; // We can still use this for navigation after successful registration
}

export function DonorRegistration({ onBack, onRegister }: DonorRegistrationProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for all form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [address, setAddress] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get Firebase instances
  // const auth = getAuth(app);
  // const db = getFirestore(app);

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    // --- Form Validation ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!email || !password || !firstName || !lastName) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
    }
    
    try {
      // --- Create user with email and password ---
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // --- Save additional user data to Firestore ---
      await addDoc(collection(db, "Donor"), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        age: Number(age),
        weight: Number(weight),
        bloodType,
        address,
        lastDonationDate,
        medicalConditions,
      });

      console.log("User registered successfully and data saved to Firestore!");
      onRegister(); // Navigate to the next page on success

    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
            Back to Login
          </Button>
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Blood Donor Registration</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Create Your Donor Account</CardTitle>
                <CardDescription>
                  Join our community of life-savers and help those in need
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
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
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword" 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="25" min="18" max="65" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input id="weight" type="number" placeholder="150" min="110" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="bloodType">Blood Type</Label>
                        <Select onValueChange={setBloodType} value={bloodType}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St, City, State, ZIP" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>


                {/* Medical Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Medical Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="lastDonation">Last Donation Date (if any)</Label>
                        <Input id="lastDonation" type="date" value={lastDonationDate} onChange={(e) => setLastDonationDate(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                        <Input id="medicalConditions" placeholder="None / List conditions" value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions (kept for UI, add logic as needed) */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                  {/* ... other checkboxes ... */}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3" 
                  size="lg"
                >
                  {loading ? 'Creating Account...' : 'Create Donor Account'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info (no changes here) */}
          <div className="space-y-6">
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
}