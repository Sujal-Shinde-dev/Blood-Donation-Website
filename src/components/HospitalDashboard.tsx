import { ArrowLeft, Building2, MapPin, Calendar, Droplets, AlertTriangle, Phone, Mail, Bell, Settings, LogOut, Plus, Eye, Edit, Trash2, Filter, Download, CheckCircle, Clock, XCircle, Users, FileText, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this is your Firebase config

interface HospitalDashboardProps {
  onBack: () => void;
}

type DashboardView = 'overview' | 'requests' | 'request-detail' | 'reports' | 'settings';

export function HospitalDashboard({ onBack }: HospitalDashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState<number | "">("");
  const [urgency, setUrgency] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [patientCondition, setPatientCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);

  // Mock data
  const hospitalInfo = {
    name: "City General Hospital",
    registrationId: "CGH-2024-001",
    status: "verified",
    contactPerson: "Dr. Sarah Johnson",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Drive, New York, NY 10001"
  };

  const stats = {
    totalRequests: 24,
    approved: 18,
    pending: 4,
    rejected: 2
  };

  // Fetch BloodRequests from Firestore
  useEffect(() => {
    // Listen for real-time updates
    const q = query(collection(db, "BloodRequests"), orderBy("createdDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'routine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateRequest = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "BloodRequests"), {
        bloodGroup: bloodType,
        units: Number(units),
        urgency,
        requiredDate,
        patientCondition,
        notes,
        status: "pending",
        createdDate: new Date().toISOString().slice(0, 10),
      });
      setDialogOpen(false);
      setBloodType("");
      setUnits("");
      setUrgency("");
      setRequiredDate("");
      setPatientCondition("");
      setNotes("");
    } catch (err) {
      alert("Failed to create request.");
    }
    setLoading(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                {hospitalInfo.name}
              </CardTitle>
              <CardDescription className="mt-2">
                Registration ID: {hospitalInfo.registrationId} • 
                <Badge className={hospitalInfo.status === 'verified' ? 'ml-2 bg-green-100 text-green-800' : 'ml-2 bg-yellow-100 text-yellow-800'}>
                  {hospitalInfo.status === 'verified' ? '✅ Verified' : '⏳ Pending Verification'}
                </Badge>
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="font-medium">{hospitalInfo.contactPerson}</p>
              <p className="text-sm text-gray-600">{hospitalInfo.phone}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {hospitalInfo.address}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{stats.totalRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Approved/Fulfilled</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{request.id} - {request.bloodGroup}</p>
                    <p className="text-sm text-gray-600">{request.units} units • {request.patientCondition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blood Request Management</h2>
          <p className="text-gray-600">Manage your blood donation requests</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Blood Request</DialogTitle>
              <DialogDescription>Submit a new blood donation request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Blood Type</Label>
                  <Select value={bloodType} onValueChange={setBloodType}>
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
                <div className="space-y-2">
                  <Label>Units Required</Label>
                  <Input
                    type="number"
                    placeholder="2"
                    min="1"
                    value={units}
                    onChange={e => setUnits(e.target.value ? Number(e.target.value) : "")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Urgency Level</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical (within 2 hours)</SelectItem>
                      <SelectItem value="urgent">Urgent (within 12 hours)</SelectItem>
                      <SelectItem value="routine">Routine (within 24 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Required Date</Label>
                  <Input
                    type="date"
                    value={requiredDate}
                    onChange={e => setRequiredDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Patient Condition</Label>
                <Input
                  placeholder="Emergency Surgery, Blood Transfusion, etc."
                  value={patientCondition}
                  onChange={e => setPatientCondition(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any additional information..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateRequest}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Required Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.bloodGroup}</TableCell>
                  <TableCell>{request.units}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  </TableCell>
                  <TableCell>{request.createdDate}</TableCell>
                  <TableCell>{request.requiredDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedRequestId(request.id);
                          setCurrentView('request-detail');
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderRequestDetail = () => {
    const request = requests.find(r => r.id === selectedRequestId);
    if (!request) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Request Details - {request.id}</h2>
            <p className="text-gray-600">Detailed view and status tracking</p>
          </div>
          <Button variant="outline" onClick={() => setCurrentView('requests')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Request Information */}
            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Blood Group</Label>
                    <p className="font-medium">{request.bloodGroup}</p>
                  </div>
                  <div>
                    <Label>Units Required</Label>
                    <p className="font-medium">{request.units}</p>
                  </div>
                  <div>
                    <Label>Urgency Level</Label>
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </div>
                  <div>
                    <Label>Created Date</Label>
                    <p className="font-medium">{request.createdDate}</p>
                  </div>
                  <div>
                    <Label>Required Date</Label>
                    <p className="font-medium">{request.requiredDate}</p>
                  </div>
                </div>
                <div>
                  <Label>Patient Condition</Label>
                  <p className="font-medium">{request.patientCondition}</p>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Request Submitted</p>
                      <p className="text-sm text-gray-600">January 15, 2024 - 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Request Approved</p>
                      <p className="text-sm text-gray-600">January 15, 2024 - 3:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Donors Contacted</p>
                      <p className="text-sm text-gray-600">January 15, 2024 - 3:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-500">Awaiting Fulfillment</p>
                      <p className="text-sm text-gray-500">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matched Donors */}
            <Card>
              <CardHeader>
                <CardTitle>Matched Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-gray-600">O- • 2.3 miles away</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Accepted</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Mary Johnson</p>
                      <p className="text-sm text-gray-600">O- • 5.1 miles away</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Contacted</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">David Wilson</p>
                      <p className="text-sm text-gray-600">O- • 7.8 miles away</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Declined</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Request
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Donors
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Escalation
                </Button>
              </CardContent>
            </Card>

            {/* Communication Log */}
            <Card>
              <CardHeader>
                <CardTitle>Communication Log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">SMS sent to 15 donors</p>
                    <p className="text-gray-600">3:45 PM</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">Email alerts sent</p>
                    <p className="text-gray-600">3:50 PM</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="font-medium">John Smith responded</p>
                    <p className="text-gray-600">4:15 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports & History</h2>
          <p className="text-gray-600">Download and analyze your request history</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="CSV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fulfillment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">75%</div>
              <p className="text-sm text-gray-600">Requests Successfully Fulfilled</p>
              <Progress value={75} className="mt-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.2</div>
              <p className="text-sm text-gray-600">Hours Average</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Requested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">O+</div>
              <p className="text-sm text-gray-600">Blood Type</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Request History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Fulfilled Date</TableHead>
                <TableHead>Response Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.bloodGroup}</TableCell>
                  <TableCell>{request.units}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </TableCell>
                  <TableCell>{request.createdDate}</TableCell>
                  <TableCell>{request.status === 'fulfilled' ? '2024-01-16' : '-'}</TableCell>
                  <TableCell>{request.status === 'fulfilled' ? '6.5 hrs' : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hospital Settings</h2>
        <p className="text-gray-600">Manage your hospital profile and account settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hospital Name</Label>
                  <Input defaultValue={hospitalInfo.name} />
                </div>
                <div className="space-y-2">
                  <Label>Registration ID</Label>
                  <Input defaultValue={hospitalInfo.registrationId} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  <Input defaultValue={hospitalInfo.contactPerson} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue={hospitalInfo.phone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea defaultValue={hospitalInfo.address} />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Hospital Registration Certificate</p>
                    <p className="text-sm text-gray-600">Uploaded on Jan 10, 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    <Button size="sm" variant="outline">Replace</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Contact Person ID Proof</p>
                    <p className="text-sm text-gray-600">Uploaded on Jan 10, 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    <Button size="sm" variant="outline">Replace</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentView('settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            <Button 
              variant={currentView === 'overview' ? 'default' : 'ghost'} 
              onClick={() => setCurrentView('overview')}
            >
              Overview
            </Button>
            <Button 
              variant={currentView === 'requests' ? 'default' : 'ghost'} 
              onClick={() => setCurrentView('requests')}
            >
              Blood Requests
            </Button>
            <Button 
              variant={currentView === 'reports' ? 'default' : 'ghost'} 
              onClick={() => setCurrentView('reports')}
            >
              Reports
            </Button>
            <Button 
              variant={currentView === 'settings' ? 'default' : 'ghost'} 
              onClick={() => setCurrentView('settings')}
            >
              Settings
            </Button>
          </nav>
        </div>

        {/* Content */}
        {currentView === 'overview' && renderOverview()}
        {currentView === 'requests' && renderRequests()}
        {currentView === 'request-detail' && renderRequestDetail()}
        {currentView === 'reports' && renderReports()}
        {currentView === 'settings' && renderSettings()}
      </div>
    </div>
  );
}