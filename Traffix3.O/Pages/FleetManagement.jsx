
import React, { useState, useEffect } from "react";
import { FleetCompany } from "@/entities/FleetCompany";
import { ViolationReport } from "@/entities/ViolationReport";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Users, 
  TrendingUp, 
  Shield, 
  Plus,
  Search,
  Filter,
  Download,
  MapPin,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import FleetOnboarding from "../Components/fleet/FleetOnboarding";
import FleetDashboard from "../Components/fleet/FleetDashboard";

export default function FleetManagementPage() {
  const [user, setUser] = useState(null);
  const [fleetCompanies, setFleetCompanies] = useState([]);
  const [selectedFleet, setSelectedFleet] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFleetData = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);

        if (currentUser.role !== 'admin') {
          return;
        }

        const companies = await FleetCompany.list('-created_date');
        setFleetCompanies(companies);

        // Seed sample fleet data if empty
        if (companies.length === 0) {
          await seedSampleFleetData();
          const newCompanies = await FleetCompany.list('-created_date');
          setFleetCompanies(newCompanies);
        }

      } catch (error) {
        console.error("Error loading fleet data:", error);
      } finally {
        setLoading(false);
      }
    };

    const seedSampleFleetData = async () => {
      const sampleFleets = [
        {
          company_name: "Blue Dart Express",
          company_id: "BD001",
          contact_person: "Rajesh Kumar",
          email: "rajesh@bluedart.com",
          phone: "+91-98765-43210",
          city: "Mumbai",
          state: "Maharashtra",
          fleet_size: 450,
          subscription_plan: "enterprise",
          onboarding_date: "2024-01-15",
          total_reports_generated: 1247
        },
        {
          company_name: "Ola Fleet Services",
          company_id: "OLA001",
          contact_person: "Priya Sharma",
          email: "priya@ola.com",
          phone: "+91-87654-32109",
          city: "Bangalore",
          state: "Karnataka",
          fleet_size: 1200,
          subscription_plan: "enterprise",
          onboarding_date: "2024-02-01",
          total_reports_generated: 3456
        },
        {
          company_name: "SafeRide Logistics",
          company_id: "SR001",
          contact_person: "Amit Patel",
          email: "amit@saferide.com",
          phone: "+91-76543-21098",
          city: "Delhi",
          state: "Delhi",
          fleet_size: 280,
          subscription_plan: "premium",
          onboarding_date: "2024-03-10",
          total_reports_generated: 892
        }
      ];

      try {
        await FleetCompany.bulkCreate(sampleFleets);
      } catch (error) {
        console.log("Sample fleet data might already exist");
      }
    };

    loadFleetData();
  }, []);

  const handleFleetOnboard = async (fleetData) => {
    try {
      const newFleet = await FleetCompany.create({
        ...fleetData,
        company_id: `FL${Date.now()}`,
        onboarding_date: new Date().toISOString().split('T')[0],
        total_reports_generated: 0
      });
      
      setFleetCompanies([newFleet, ...fleetCompanies]);
      setShowOnboarding(false);
    } catch (error) {
      console.error("Error onboarding fleet:", error);
    }
  };

  const filteredFleets = fleetCompanies.filter(fleet =>
    fleet.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fleet.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubscriptionColor = (plan) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalFleetSize = () => {
    return fleetCompanies.reduce((sum, fleet) => sum + fleet.fleet_size, 0);
  };

  const getTotalReports = () => {
    return fleetCompanies.reduce((sum, fleet) => sum + fleet.total_reports_generated, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading fleet management...</p>
        </div>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Restricted</h2>
            <p className="text-slate-600">Fleet management is only accessible to administrators.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedFleet) {
    return (
      <FleetDashboard 
        fleet={selectedFleet}
        onBack={() => setSelectedFleet(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              Fleet Management
            </h1>
            <p className="text-slate-600 mt-1">Enterprise partnerships and B2B integrations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search fleets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              onClick={() => setShowOnboarding(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Onboard Fleet
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Total Fleets</p>
                    <p className="text-3xl font-bold text-blue-600">{fleetCompanies.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Total Vehicles</p>
                    <p className="text-3xl font-bold text-green-600">{getTotalFleetSize().toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Fleet Reports</p>
                    <p className="text-3xl font-bold text-purple-600">{getTotalReports().toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Active Partnerships</p>
                    <p className="text-3xl font-bold text-orange-600">{fleetCompanies.filter(f => f.is_active).length}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fleet Companies List */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Partner Fleet Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFleets.length === 0 ? (
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No Fleet Companies</h3>
                <p className="text-slate-500 mb-4">Start by onboarding your first fleet partner</p>
                <Button onClick={() => setShowOnboarding(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Onboard First Fleet
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFleets.map((fleet, index) => (
                  <motion.div
                    key={fleet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedFleet(fleet)}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg text-slate-800 mb-1">{fleet.company_name}</h3>
                              <p className="text-sm text-slate-600">ID: {fleet.company_id}</p>
                            </div>
                            <Badge className={getSubscriptionColor(fleet.subscription_plan)}>
                              {fleet.subscription_plan.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Users className="w-4 h-4" />
                              <span>{fleet.contact_person}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin className="w-4 h-4" />
                              <span>{fleet.city}, {fleet.state}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Calendar className="w-4 h-4" />
                              <span>Since {format(new Date(fleet.onboarding_date), 'MMM yyyy')}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-blue-600">{fleet.fleet_size}</p>
                              <p className="text-xs text-slate-600">Vehicles</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-600">{fleet.total_reports_generated}</p>
                              <p className="text-xs text-slate-600">Reports</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Onboarding Modal */}
        {showOnboarding && (
          <FleetOnboarding
            onClose={() => setShowOnboarding(false)}
            onSubmit={handleFleetOnboard}
          />
        )}
      </div>
    </div>
  );
}
