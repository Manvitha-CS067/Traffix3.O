import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Truck, 
  BarChart3, 
  Users, 
  MapPin, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function FleetDashboard({ fleet, onBack }) {
  // Mock data for fleet analytics
  const monthlyReports = [
    { month: 'Jan', reports: 45, violations: 12 },
    { month: 'Feb', reports: 52, violations: 15 },
    { month: 'Mar', reports: 61, violations: 18 },
    { month: 'Apr', reports: 48, violations: 11 },
    { month: 'May', reports: 67, violations: 22 },
    { month: 'Jun', reports: 73, violations: 19 }
  ];

  const violationTypes = [
    { type: 'Helmet', count: 45, percentage: 35 },
    { type: 'Overspeeding', count: 32, percentage: 25 },
    { type: 'Red Light', count: 28, percentage: 22 },
    { type: 'Wrong Lane', count: 23, percentage: 18 }
  ];

  const topDrivers = [
    { name: 'Rajesh Kumar', reports: 23, score: 92 },
    { name: 'Amit Singh', reports: 18, score: 88 },
    { name: 'Priya Sharma', reports: 15, score: 85 },
    { name: 'Vikash Yadav', reports: 12, score: 82 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet Management
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{fleet.company_name}</h1>
            <p className="text-slate-600">Fleet ID: {fleet.company_id}</p>
          </div>
          
          <div className="ml-auto">
            <Badge className="bg-green-100 text-green-800">
              {fleet.subscription_plan.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Total Vehicles</p>
                  <p className="text-3xl font-bold text-blue-600">{fleet.fleet_size}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Total Reports</p>
                  <p className="text-3xl font-bold text-green-600">{fleet.total_reports_generated}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Active Drivers</p>
                  <p className="text-3xl font-bold text-purple-600">{Math.floor(fleet.fleet_size * 0.8)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">Safety Score</p>
                  <p className="text-3xl font-bold text-orange-600">87%</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Monthly Report Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyReports}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Violation Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={violationTypes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drivers">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Top Performing Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDrivers.map((driver, index) => (
                    <div key={driver.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{driver.name}</h3>
                        <p className="text-sm text-slate-600">{driver.reports} reports submitted</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{driver.score}%</p>
                        <p className="text-xs text-slate-500">Safety Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Route Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">Route Analytics Coming Soon</h3>
                  <p className="text-slate-500">Real-time route optimization and violation hotspot mapping</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Fleet Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Company Information</h3>
                      <div className="space-y-2">
                        <div><strong>Contact:</strong> {fleet.contact_person}</div>
                        <div><strong>Email:</strong> {fleet.email}</div>
                        <div><strong>Phone:</strong> {fleet.phone}</div>
                        <div><strong>Location:</strong> {fleet.city}, {fleet.state}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-800">Subscription Details</h3>
                      <div className="space-y-2">
                        <div><strong>Plan:</strong> {fleet.subscription_plan}</div>
                        <div><strong>Fleet Size:</strong> {fleet.fleet_size} vehicles</div>
                        <div><strong>Joined:</strong> {new Date(fleet.onboarding_date).toLocaleDateString()}</div>
                        <div><strong>Status:</strong> <Badge className="bg-green-100 text-green-800">Active</Badge></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Update Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}