import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Globe, 
  Smartphone, 
  Car, 
  Truck, 
  Code2, 
  Shield,
  CheckCircle,
  Copy,
  ExternalLink,
  Settings,
  Zap,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function APIIntegrationPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("tfx_live_sk_1234567890abcdef");
  const [selectedEndpoint, setSelectedEndpoint] = useState("upload");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.log("User not authenticated");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const apiEndpoints = {
    upload: {
      method: "POST",
      endpoint: "/api/v1/reports/upload",
      description: "Upload violation video with metadata",
      params: ["video_file", "violation_type", "location", "timestamp"]
    },
    status: {
      method: "GET", 
      endpoint: "/api/v1/reports/{report_id}/status",
      description: "Check processing status of uploaded report",
      params: ["report_id"]
    },
    webhook: {
      method: "POST",
      endpoint: "/api/v1/webhooks/register", 
      description: "Register webhook for report status updates",
      params: ["callback_url", "events[]"]
    },
    challan: {
      method: "POST",
      endpoint: "/api/v1/challans/integrate",
      description: "Mock e-challan system integration",
      params: ["report_id", "challan_amount", "authority_code"]
    }
  };

  const partnerTypes = [
    {
      title: "Dashcam Manufacturers",
      icon: Smartphone,
      description: "Pre-install Traffix SDK in dashcam firmware",
      features: ["Real-time upload", "Offline queue", "Auto-detection"],
      pricing: "₹2 per device/month"
    },
    {
      title: "Automotive Companies", 
      icon: Car,
      description: "Built-in integration for connected vehicles",
      features: ["OEM integration", "Telematics sync", "Fleet dashboards"],
      pricing: "₹5 per vehicle/month"
    },
    {
      title: "Fleet Operators",
      icon: Truck,
      description: "Bulk deployment for commercial fleets",
      features: ["Driver scorecards", "Route analytics", "Compliance reports"],
      pricing: "₹3 per vehicle/month"
    },
    {
      title: "Government Authorities",
      icon: Shield,
      description: "Revenue-sharing model per verified report",
      features: ["Custom dashboards", "E-challan integration", "Analytics"],
      pricing: "7.5% per verified challan"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading API integration...</p>
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
            <p className="text-slate-600">API integration is only accessible to administrators.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Globe className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">API Integration Hub</h1>
          <p className="text-slate-600">B2B2C partnerships, SDKs, and enterprise integrations</p>
        </div>

        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="partners">B2B Partners</TabsTrigger>
            <TabsTrigger value="apis">API Documentation</TabsTrigger>
            <TabsTrigger value="sdks">SDKs & Tools</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="partners">
            <div className="grid md:grid-cols-2 gap-6">
              {partnerTypes.map((partner, index) => (
                <motion.div
                  key={partner.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <partner.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{partner.title}</CardTitle>
                          <Badge className="bg-green-100 text-green-800 mt-1">
                            {partner.pricing}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">{partner.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800">Key Features:</h4>
                        {partner.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600">
                        Start Integration
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apis">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    API Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="api-key"
                        value={apiKey}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Keep your API key secure. Include it in the Authorization header: 
                      <code className="text-xs bg-slate-100 px-1 rounded ml-1">Bearer {apiKey}</code>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(apiEndpoints).map(([key, endpoint]) => (
                      <div
                        key={key}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedEndpoint === key 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                        onClick={() => setSelectedEndpoint(key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                              {endpoint.method}
                            </Badge>
                            <span className="font-mono text-sm">{endpoint.endpoint}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* API Details */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle>
                  {apiEndpoints[selectedEndpoint].method} {apiEndpoints[selectedEndpoint].endpoint}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parameters:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {apiEndpoints[selectedEndpoint].params.map((param) => (
                        <div key={param} className="bg-slate-50 p-2 rounded font-mono text-sm">
                          {param}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Example Request:</h4>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`curl -X ${apiEndpoints[selectedEndpoint].method} \\
  https://api.traffix.ai${apiEndpoints[selectedEndpoint].endpoint} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"violation_type": "helmet_absence", "location": "Mumbai"}'`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdks">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Android SDK", language: "Java/Kotlin", version: "v2.1.0", downloads: "45K+" },
                { name: "iOS SDK", language: "Swift/Objective-C", version: "v2.0.8", downloads: "32K+" },
                { name: "React Native", language: "JavaScript", version: "v1.5.2", downloads: "18K+" },
                { name: "Flutter Plugin", language: "Dart", version: "v1.3.1", downloads: "12K+" },
                { name: "Embedded C", language: "C/C++", version: "v1.0.5", downloads: "8K+" },
                { name: "Python SDK", language: "Python", version: "v2.2.1", downloads: "25K+" }
              ].map((sdk, index) => (
                <motion.div
                  key={sdk.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{sdk.name}</h3>
                          <p className="text-sm text-slate-600">{sdk.language}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Version:</span>
                          <Badge variant="outline">{sdk.version}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Downloads:</span>
                          <span className="font-semibold">{sdk.downloads}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        Download SDK
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Data Privacy & GDPR
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Automatic face blurring enabled</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Data retention policy: 180 days</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Right to erasure implemented</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Data anonymization protocols</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View Privacy Policy
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Regional Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { region: "India - IT Act 2000", status: "Compliant" },
                      { region: "Europe - GDPR", status: "Certified" },
                      { region: "California - CCPA", status: "Compliant" },
                      { region: "Brazil - LGPD", status: "In Progress" }
                    ].map((compliance) => (
                      <div key={compliance.region} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-700">{compliance.region}</span>
                        <Badge className={
                          compliance.status === 'Compliant' || compliance.status === 'Certified' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }>
                          {compliance.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Compliance Reports
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* E-Challan Integration */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Government E-Challan Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Real-time Processing</h3>
                    <p className="text-sm text-slate-600">Instant verification and challan generation</p>
                  </div>
                  
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Multi-State Support</h3>
                    <p className="text-sm text-slate-600">Integration with 15+ state RTO systems</p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Secure & Auditable</h3>
                    <p className="text-sm text-slate-600">End-to-end encryption with full audit logs</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">Mock Integration Active</h4>
                  <p className="text-sm text-amber-700">
                    Currently using simulated e-challan system for demo. Production integrations available 
                    with Maharashtra RTO, Delhi Traffic Police, and Karnataka Transport Department.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}