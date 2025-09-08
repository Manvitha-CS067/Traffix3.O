import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MapPin, Clock, Eye, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsList({ reports, onSelectReport }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_review': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
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
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No Reports Found</h3>
        <p className="text-slate-600">No violation reports match the current filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {getViolationTypeLabel(report.violation_type)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{report.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>Submitted {format(new Date(report.created_date), 'MMM d, yyyy at h:mm a')}</span>
                        </div>
                        
                        {report.license_plate && report.license_plate !== "Not detected" && (
                          <div className="text-sm">
                            <span className="font-medium">License Plate:</span> {report.license_plate}
                          </div>
                        )}
                        
                        {report.ai_confidence && (
                          <div className="text-sm">
                            <span className="font-medium">AI Confidence:</span> {report.ai_confidence}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onSelectReport(report)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}