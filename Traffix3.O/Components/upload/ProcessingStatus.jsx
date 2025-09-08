import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, Shield, Brain, FileCheck } from "lucide-react";

export default function ProcessingStatus({ step }) {
  const steps = [
    { id: 1, icon: FileCheck, label: "Uploading video securely...", color: "blue" },
    { id: 2, icon: Brain, label: "AI analyzing video for violations...", color: "purple" },
    { id: 3, icon: Shield, label: "Applying privacy protection...", color: "green" },
    { id: 4, icon: FileCheck, label: "Creating violation report...", color: "amber" }
  ];

  const getCurrentStep = () => {
    const stepText = step.toLowerCase();
    if (stepText.includes('upload')) return 1;
    if (stepText.includes('analyz')) return 2;
    if (stepText.includes('privacy')) return 3;
    if (stepText.includes('report')) return 4;
    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing Your Report</h2>
        <p className="text-slate-600">Our AI is analyzing your video and ensuring privacy protection</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="space-y-6">
            {steps.map((stepItem) => (
              <motion.div
                key={stepItem.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  stepItem.id === currentStep
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : stepItem.id < currentStep
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-slate-50 border-2 border-slate-200'
                }`}
                animate={{
                  scale: stepItem.id === currentStep ? 1.02 : 1,
                }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stepItem.id === currentStep
                    ? 'bg-blue-500 text-white'
                    : stepItem.id < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300 text-slate-500'
                }`}>
                  {stepItem.id === currentStep ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <stepItem.icon className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${
                    stepItem.id === currentStep || stepItem.id < currentStep
                      ? 'text-slate-800'
                      : 'text-slate-500'
                  }`}>
                    {stepItem.label}
                  </p>
                  {stepItem.id === currentStep && (
                    <p className="text-sm text-blue-600 mt-1">In progress...</p>
                  )}
                  {stepItem.id < currentStep && (
                    <p className="text-sm text-green-600 mt-1">Completed</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 text-center">
              <strong>Please wait:</strong> AI processing may take 30-60 seconds. Do not close this page.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}