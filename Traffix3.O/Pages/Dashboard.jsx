import React, { useState, useEffect } from "react";
import { ViolationReport } from "@/entities/ViolationReport";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Shield,
  FileText,
  Users,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import StatsOverview from "../Components/dashboard/StatsOverview";
import ReportsList from "../Components/dashboard/ReportsList";
import ReportDetailModal from "../Components/dashboard/ReportDetailModal";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      if (currentUser.role !== 'admin') {
        // Redirect non-admin users or show access denied
        return;
      }

      const allReports = await ViolationReport.list('-created_date');
      setReports(allReports);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportAction = async (reportId, action, notes = '') => {
    try {
      const status = action === 'approve' ? 'approved' : 'rejected';
      await ViolationReport.update(reportId, {
        status,
        authority_notes: notes,
        reviewed_by: user.email,
        reviewed_at: new Date().toISOString()
      });
      
      // Refresh data
      loadData();
      setSelectedReport(null);
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const filteredReports = reports.filter(report => {
    if (activeTab === "all") return true;
    return report.status === activeTab;
  });

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending_review').length,
    approved: reports.filter(r => r.status === 'approved').length,
    rejected: reports.filter(r => r.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
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
            <p className="text-slate-600 mb-4">This dashboard is only accessible to traffic authorities.</p>
            <Link to={createPageUrl("Upload")}>
              <Button className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Go to Upload Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              Authority Dashboard
            </h1>
            <p className="text-slate-600 mt-1">Review and manage traffic violation reports</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-slate-800">{user?.full_name}</p>
              <p className="text-sm text-slate-500">Traffic Authority</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Empty State or Reports */}
        {reports.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">No Reports Yet</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                The system is ready to receive traffic violation reports. Citizens can start uploading dashcam footage for AI analysis.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  <strong>Getting Started:</strong> Share the upload portal with citizens so they can report violations. All submissions will appear here for your review.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Violation Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mb-6">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    All ({stats.total})
                  </TabsTrigger>
                  <TabsTrigger value="pending_review" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Pending ({stats.pending})
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Approved ({stats.approved})
                  </TabsTrigger>
                  <TabsTrigger value="rejected" className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Rejected ({stats.rejected})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  <ReportsList 
                    reports={filteredReports}
                    onSelectReport={setSelectedReport}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Report Detail Modal */}
        {selectedReport && (
          <ReportDetailModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
            onAction={handleReportAction}
          />
        )}
      </div>
    </div>
  );
}