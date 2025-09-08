import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Building, Phone, Mail, MapPin, Users } from "lucide-react";

export default function FleetOnboarding({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    fleet_size: "",
    subscription_plan: "basic",
    business_type: "",
    expected_reports_monthly: ""
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      fleet_size: parseInt(formData.fleet_size),
      expected_reports_monthly: parseInt(formData.expected_reports_monthly || 0)
    });
  };

  const nextStep = () => setStep(Math.min(step + 1, 3));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Fleet Partner Onboarding - Step {step} of 3
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business_type">Business Type</Label>
                    <Select
                      value={formData.business_type}
                      onValueChange={(value) => setFormData({...formData, business_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logistics">Logistics & Delivery</SelectItem>
                        <SelectItem value="transport">Transport Services</SelectItem>
                        <SelectItem value="rideshare">Ride Sharing</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="government">Government Fleet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_person">Contact Person *</Label>
                    <Input
                      id="contact_person"
                      value={formData.contact_person}
                      onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                      placeholder="Primary contact name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fleet_size">Fleet Size *</Label>
                    <Input
                      id="fleet_size"
                      type="number"
                      value={formData.fleet_size}
                      onChange={(e) => setFormData({...formData, fleet_size: e.target.value})}
                      placeholder="Number of vehicles"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact & Location
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="company@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91-XXXXX-XXXXX"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Primary operating city"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({...formData, state: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Gujarat">Gujarat</SelectItem>
                        <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Subscription & Preferences
                </h3>
                
                <div>
                  <Label htmlFor="subscription_plan">Subscription Plan</Label>
                  <Select
                    value={formData.subscription_plan}
                    onValueChange={(value) => setFormData({...formData, subscription_plan: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - ₹3/vehicle/month</SelectItem>
                      <SelectItem value="premium">Premium - ₹5/vehicle/month</SelectItem>
                      <SelectItem value="enterprise">Enterprise - Custom pricing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expected_reports_monthly">Expected Monthly Reports</Label>
                  <Input
                    id="expected_reports_monthly"
                    type="number"
                    value={formData.expected_reports_monthly}
                    onChange={(e) => setFormData({...formData, expected_reports_monthly: e.target.value})}
                    placeholder="Estimated reports per month"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">What's Included:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Real-time violation detection and reporting</li>
                    <li>• Driver scorecards and fleet analytics</li>
                    <li>• Integration with existing fleet management systems</li>
                    <li>• 24/7 technical support and onboarding assistance</li>
                    <li>• Custom reporting and compliance dashboards</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between pt-4">
            <div>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-green-600">
                  Complete Onboarding
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}