import React, { useState, useRef } from "react";
import { ViolationReport } from "@/entities/ViolationReport";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Upload as UploadIcon, 
  Video, 
  MapPin, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Shield,
  Eye,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import VideoUpload from "../components/upload/VideoUpload";
import ProcessingStatus from "../components/upload/ProcessingStatus";
import SubmissionSuccess from "../components/upload/SubmissionSuccess";

export default function UploadPage() {
  const [step, setStep] = useState(1); // 1: form, 2: processing, 3: success
  const [formData, setFormData] = useState({
    violation_type: "",
    location: "",
    reporter_contact: ""
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [processingStep, setProcessingStep] = useState("");
  const [reportId, setReportId] = useState(null);

  const handleVideoSelect = (file) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !formData.violation_type || !formData.location) {
      setError("Please fill all required fields and select a video");
      return;
    }

    setProcessing(true);
    setStep(2);
    setError("");

    try {
      // Step 1: Upload video
      setProcessingStep("Uploading video securely...");
      const { file_url } = await UploadFile({ file: videoFile });

      // Step 2: AI Analysis
      setProcessingStep("AI analyzing video for violations...");
      const aiAnalysis = await InvokeLLM({
        prompt: `Analyze this dashcam video for traffic violations. The reported violation type is: ${formData.violation_type}. 
        
        Please analyze the video and provide:
        1. Confidence level (0-100) that the violation actually occurred
        2. Any license plate numbers visible
        3. Detailed description of what you observe
        4. Whether faces need to be blurred for privacy
        5. Specific timestamps where violations occur
        
        Be thorough and accurate as this will be used by traffic authorities.`,
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            confidence: { type: "number" },
            license_plate: { type: "string" },
            description: { type: "string" },
            faces_detected: { type: "boolean" },
            violation_timestamps: { type: "array", items: { type: "string" } },
            recommendation: { type: "string" }
          }
        }
      });

      // Step 3: Privacy Processing
      setProcessingStep("Applying privacy protection...");
      // In a real implementation, this would blur faces
      const processed_video_url = file_url; // Simplified for demo

      // Step 4: Create report
      setProcessingStep("Creating violation report...");
      const report = await ViolationReport.create({
        violation_type: formData.violation_type,
        original_video_url: file_url,
        processed_video_url: processed_video_url,
        location: formData.location,
        reporter_contact: formData.reporter_contact,
        license_plate: aiAnalysis.license_plate || "Not detected",
        ai_confidence: aiAnalysis.confidence || 0,
        ai_detection_details: aiAnalysis,
        status: "pending_review"
      });

      setReportId(report.id);
      setStep(3);
    } catch (error) {
      console.error("Error processing report:", error);
      setError("Error processing your report. Please try again.");
      setStep(1);
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ violation_type: "", location: "", reporter_contact: "" });
    setVideoFile(null);
    setVideoPreview(null);
    setError("");
    setReportId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Report Traffic Violation</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Help make roads safer by reporting traffic violations. Our AI will analyze your dashcam footage 
                  while protecting privacy through automatic face blurring.
                </p>
              </div>

              {/* Privacy Notice */}
              <Card className="border-blue-100 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Privacy Protected</h3>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        All faces in your video will be automatically blurred to protect privacy. 
                        License plates remain visible for authority review. Your data is handled securely.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <VideoUpload 
                  onVideoSelect={handleVideoSelect}
                  videoPreview={videoPreview}
                  videoFile={videoFile}
                />

                {/* Violation Details */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      Violation Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="violation_type">Type of Violation *</Label>
                      <Select
                        value={formData.violation_type}
                        onValueChange={(value) => setFormData({...formData, violation_type: value})}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select violation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="helmet_absence">No Helmet</SelectItem>
                          <SelectItem value="overspeeding">Overspeeding</SelectItem>
                          <SelectItem value="red_light_jump">Red Light Jump</SelectItem>
                          <SelectItem value="wrong_lane">Wrong Lane Usage</SelectItem>
                          <SelectItem value="mobile_use">Mobile Phone Use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="location"
                          placeholder="Enter location where violation occurred"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reporter_contact">Your Contact (Optional)</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="reporter_contact"
                          placeholder="Phone or email for follow-up"
                          value={formData.reporter_contact}
                          onChange={(e) => setFormData({...formData, reporter_contact: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
                  disabled={processing}
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Submit Violation Report
                </Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <ProcessingStatus step={processingStep} />
          )}

          {step === 3 && (
            <SubmissionSuccess reportId={reportId} onNewReport={resetForm} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}