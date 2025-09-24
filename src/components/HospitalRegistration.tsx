import { ArrowLeft, Building2, Eye, EyeOff, Upload, MapPin, Phone, Mail, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

// --- Firebase Imports ---
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Using our shared instances

interface HospitalRegistrationProps {
  onBack: () => void;
  onRegister: () => void;
}

export function HospitalRegistration({ onBack, onRegister }: HospitalRegistrationProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // --- State for All Form Fields ---
  // Hospital Details
  const [hospitalName, setHospitalName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [hospitalType, setHospitalType] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  // Contact Information
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Login Credentials
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Additional Information
  const [hasBloodBank, setHasBloodBank] = useState(false);
  const [hasEmergency24x7, setHasEmergency24x7] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  // General State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // NOTE: Phone OTP and file uploads will be handled in a future step.

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    // --- Form Validation ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!email || !password || !hospitalName || !registrationNumber || !contactPerson) {
      setError("Please fill in all required fields marked with *.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Save all hospital data to the "Hospitals" collection in Firestore
      await addDoc(collection(db, "Hospitals"), {
        uid: user.uid, // Link Firestore doc to the authenticated user
        hospitalName,
        registrationNumber,
        hospitalType,
        contactPerson,
        phoneNumber,
        email,
        fullAddress: {
          address,
          city,
          state,
          pincode,
        },
        // We will add document URLs here after implementing file uploads
        status: "pending_verification", // Set an initial status
        hasBloodBank,
        hasEmergency24x7,
        additionalInfo,
        createdAt: new Date(),
      });

      console.log("Hospital registered successfully! Data saved to Firestore.");
      onRegister(); // Navigate to a "Pending Verification" page or similar

    } catch (error: any) {
      console.error("Error during hospital registration:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError("This email address is already registered. Please use a different email.");
      } else if (error.code === 'auth/weak-password') {
        setError("The password is too weak. Please use at least 6 characters.");
      } else {
        setError("An error occurred during registration. Please try again.");
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
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Hospital Registration</h1>
          </div>
        </div>

        <div className="grid lg-grid-cols-4 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Hospital Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                    Hospital Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name *</Label>
                    <Input id="hospitalName" placeholder="General Hospital" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Registration/License Number *</Label>
                      <Input id="registrationNumber" placeholder="HL-12345-2024" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalType">Hospital Type *</Label>
                      <Select value={hospitalType} onValueChange={setHospitalType}>
                        <SelectTrigger><SelectValue placeholder="Select hospital type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="government">Government Hospital</SelectItem>
                          <SelectItem value="private">Private Hospital</SelectItem>
                          <SelectItem value="blood-bank">Blood Bank</SelectItem>
                          <SelectItem value="clinic">Clinic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person Name *</Label>
                    <Input id="contactPerson" placeholder="Dr. John Smith" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><Phone className="h-5 w-5 mr-2 text-blue-600" />Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input id="phoneNumber" placeholder="+1 (555) 123-4567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="admin@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea id="address" placeholder="Street, Area, Landmark" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label htmlFor="city">City *</Label><Input id="city" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="state">State *</Label><Input id="state" placeholder="NY" value={state} onChange={(e) => setState(e.target.value)} /></div>
                    <div className="space-y-2"><Label htmlFor="pincode">Pincode *</Label><Input id="pincode" placeholder="10001" value={pincode} onChange={(e) => setPincode(e.target.value)} /></div>
                  </div>
                </CardContent>
              </Card>

              {/* Login Credentials */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><Shield className="h-5 w-5 mr-2 text-blue-600" />Login Credentials</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff /> : <Eye />}</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional Information */}
              <Card>
                <CardHeader><CardTitle className="text-xl flex items-center"><Clock className="h-5 w-5 mr-2 text-blue-600" />Additional Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2"><Checkbox id="bloodBank" checked={hasBloodBank} onCheckedChange={(checked: boolean) => setHasBloodBank(checked === true)} /><Label htmlFor="bloodBank">Available Blood Bank</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="emergency24x7" checked={hasEmergency24x7} onCheckedChange={(checked: boolean) => setHasEmergency24x7(checked === true)} /><Label htmlFor="emergency24x7">Emergency 24×7 Service</Label></div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea id="additionalInfo" placeholder="Any additional information..." value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
                  </div>
                </CardContent>
              </Card>
              
              {/* Terms and Submit */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                  <Button onClick={handleRegister} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" size="lg">
                    {loading ? "Submitting..." : "Submit Registration"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sidebar content remains the same */}
          </div>
        </div>
      </div>
    </div>
  );
}