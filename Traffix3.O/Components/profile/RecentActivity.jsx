import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function RecentActivity({ reports }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending_review': return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default: return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending_review': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getViolationTypeLabel = (type) => {
    const labels = {
      helmet_absence: "No Helmet",
      overspeeding: "Overspeeding",
      red_light_jump: "Red Light Jump",
      wrong_lane: "Wrong Lane",
      mobile_use: "Mobile Phone Use"
    };
    return labels[type] || type;
  };

  if (reports.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No Activity Yet</h3>
            <p className="text-slate-500">Submit your first violation report to see your activity here!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(report.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {getViolationTypeLabel(report.violation_type)}
                  </Badge>
                  <Badge className={getStatusColor(report.status) + " text-xs"}>
                    {report.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{report.location}</span>
                </div>
                
                <p className="text-xs text-slate-500">
                  Submitted {format(new Date(report.created_date), 'MMM d, yyyy at h:mm a')}
                </p>
              </div>
              
              <div className="text-right">
                {report.status === 'approved' && (
                  <p className="text-sm font-semibold text-green-600">+50 pts</p>
                )}
                {report.ai_confidence && (
                  <p className="text-xs text-slate-500">{report.ai_confidence}% confidence</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}