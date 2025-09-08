import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Clock, 
  Phone, 
  Brain, 
  FileText,
  ExternalLink
} from "lucide-react";

export default function ReportDetailModal({ report, onClose, onAction }) {
  const [notes, setNotes] = useState(report.authority_notes || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action) => {
    setIsProcessing(true);
    await onAction(report.id, action, notes);
    setIsProcessing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_review': return 'bg-amber-100 text-amber-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Violation Report Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Evidence Video
            </h3>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <video
                src={report.processed_video_url}
                controls
                className="w-full max-h-80 object-contain"
                preload="metadata"
              />
            </div>
            
            <div className="flex gap-2">
              <a
                href={report.original_video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Original Video
              </a>
            </div>
          </div>
          
          {/* Report Details */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Report Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {getViolationTypeLabel(report.violation_type)}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span><strong>Location:</strong> {report.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span><strong>Submitted:</strong> {format(new Date(report.created_date), 'MMM d, yyyy at h:mm a')}</span>
                  </div>
                  
                  {report.reporter_contact && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span><strong>Reporter Contact:</strong> {report.reporter_contact}</span>
                    </div>
                  )}
                  
                  {report.license_plate && report.license_plate !== "Not detected" && (
                    <div className="text-sm">
                      <strong>License Plate:</strong> <code className="bg-slate-100 px-2 py-1 rounded">{report.license_plate}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* AI Analysis */}
            {report.ai_detection_details && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Analysis
                </h3>
                
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <div>
                    <strong>Confidence Level:</strong> {report.ai_confidence}%
                  </div>
                  
                  {report.ai_detection_details.description && (
                    <div>
                      <strong>AI Description:</strong>
                      <p className="text-sm mt-1 text-slate-700">{report.ai_detection_details.description}</p>
                    </div>
                  )}
                  
                  {report.ai_detection_details.recommendation && (
                    <div>
                      <strong>AI Recommendation:</strong>
                      <p className="text-sm mt-1 text-slate-700">{report.ai_detection_details.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Review Section */}
            {report.status === 'pending_review' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Authority Review</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Review Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about your decision..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleAction('approve')}
                      disabled={isProcessing}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve Report
                    </Button>
                    
                    <Button
                      onClick={() => handleAction('reject')}
                      disabled={isProcessing}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Report
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Previous Review */}
            {report.status !== 'pending_review' && report.authority_notes && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Review History</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>Reviewed by:</strong> {report.reviewed_by}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Reviewed at:</strong> {format(new Date(report.reviewed_at), 'MMM d, yyyy at h:mm a')}
                  </p>
                  <p className="text-sm">
                    <strong>Notes:</strong> {report.authority_notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}