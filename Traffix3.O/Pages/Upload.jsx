import React, { useState, useRef } from "react";
import { ViolationReport } from "@/entities/ViolationReport";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import EnhancedButton from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import CursorEffects from "@/components/ui/cursor-effects";
import BackgroundCars from "@/components/ui/background-cars";
import { AIDetectionEngine } from "@/components/ai/AIDetectionEngine";
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
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleVideoSelect = (file) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 3000);
    
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

      // Step 2: Advanced AI Analysis
      setProcessingStep("AI analyzing video for violations...");
      const aiAnalysis = await AIDetectionEngine.analyzeVideo(file_url, formData.violation_type);

      // Step 3: License Plate Detection
      setProcessingStep("Detecting license plates...");
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time

      // Step 4: Privacy Protection (Face Blurring)
      setProcessingStep("Applying privacy protection and blurring faces...");
      const processed_video_url = await AIDetectionEngine.processPrivacyBlurring(
        file_url, 
        aiAnalysis.faces_for_blurring
      );

      // Step 5: Create comprehensive report
      setProcessingStep("Generating comprehensive violation report...");
      const report = await ViolationReport.create({
        violation_type: formData.violation_type,
        original_video_url: file_url,
        processed_video_url: processed_video_url,
        location: formData.location,
        reporter_contact: formData.reporter_contact,
        license_plate: aiAnalysis.primary_license_plate,
        ai_confidence: aiAnalysis.confidence,
        ai_detection_details: {
          ...aiAnalysis,
          violations_detected: aiAnalysis.violations_detected,
          faces_blurred: aiAnalysis.faces_for_blurring.length,
          license_plates_found: aiAnalysis.license_plates.length,
          detailed_analysis: aiAnalysis.detailed_description
        },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 relative overflow-hidden">
      <CursorEffects />
      <BackgroundCars trigger={buttonClicked} />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
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
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-400 rounded-2xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Report Traffic Violation</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Help make roads safer with AI-powered violation detection. Our advanced system analyzes dashcam footage 
                  for helmet violations, overspeeding, mobile use, wrong lanes, and license plates while protecting privacy.
                </p>
              </div>

              {/* Privacy Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-blue-100 bg-blue-50/50 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-blue-100/30"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Privacy Protected</h3>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        Advanced AI automatically detects and blurs all faces for privacy protection. 
                        License plates are extracted and preserved for authority review. Secure encrypted processing.
                      </p>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <VideoUpload 
                  onVideoSelect={handleVideoSelect}
                  videoPreview={videoPreview}
                  videoFile={videoFile}
                />

                {/* Violation Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      </motion.div>
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EnhancedButton 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
                  disabled={processing}
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                    Submit AI-Powered Violation Report
                  </EnhancedButton>
                </motion.div>
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