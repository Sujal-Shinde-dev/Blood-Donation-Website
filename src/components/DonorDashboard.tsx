import { ArrowLeft, User, MapPin, Calendar, Droplets, Heart, Phone, Mail, LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

interface DonorDashboardProps {
  onBack: () => void;
}

export function DonorDashboard({ onBack }: DonorDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
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
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
                <p className="text-gray-600">Your next donation eligibility: March 15, 2024</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Droplets className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Lives Saved</p>
                  <p className="text-2xl font-bold">36</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Days Until Eligible</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Nearby Requests</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donation History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Donations</CardTitle>
                <CardDescription>
                  Your donation history and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium">City General Hospital</p>
                        <p className="text-sm text-gray-600">January 15, 2024</p>
                      </div>
                    </div>
                    <Badge>O+ Whole Blood</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium">Memorial Medical Center</p>
                        <p className="text-sm text-gray-600">November 20, 2023</p>
                      </div>
                    </div>
                    <Badge variant="outline">O+ Platelets</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium">St. Mary's Hospital</p>
                        <p className="text-sm text-gray-600">September 25, 2023</p>
                      </div>
                    </div>
                    <Badge variant="outline">O+ Whole Blood</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Urgent Blood Requests Near You</CardTitle>
                <CardDescription>
                  Help save lives in your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <p className="font-medium">Critical: O+ Blood Needed</p>
                      <p className="text-sm text-gray-600">Metro General Hospital - 2.3 miles away</p>
                      <p className="text-sm text-red-600">Needed within 4 hours</p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Respond
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Routine: O+ Blood Needed</p>
                      <p className="text-sm text-gray-600">Children's Hospital - 5.1 miles away</p>
                      <p className="text-sm text-gray-600">Needed within 24 hours</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-red-600" />
                  Donor Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Blood Type:</span>
                  <Badge variant="outline">O+</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Location:</span>
                  <span>New York, NY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Member Since:</span>
                  <span>2022</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Eligibility Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-600" />
                  Donation Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">23</div>
                  <div className="text-sm text-gray-600">days until eligible</div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  Next eligible date: March 15, 2024
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                  Life Saver (10+ donations)
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-silver rounded-full mr-3"></span>
                  Regular Donor (5+ donations)
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-bronze rounded-full mr-3"></span>
                  First Time Donor
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Donation Centers
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Share Your Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}