import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, Shield, Brain, FileCheck, Eye, Zap } from "lucide-react";

export default function ProcessingStatus({ step }) {
  const steps = [
    { id: 1, icon: FileCheck, label: "Uploading video securely...", color: "blue", detail: "Secure encrypted upload in progress" },
    { id: 2, icon: Brain, label: "AI analyzing for violations...", color: "purple", detail: "Detecting helmets, speed, mobile use, wrong lanes" },
    { id: 3, icon: Eye, label: "License plate detection...", color: "indigo", detail: "Extracting vehicle identification" },
    { id: 4, icon: Shield, label: "Privacy protection active...", color: "green", detail: "Auto-blurring faces for privacy" },
    { id: 5, icon: Zap, label: "Generating violation report...", color: "amber", detail: "Compiling evidence and analysis" }
    { id: 5, icon: Zap, label: "Generating violation report...", color: "amber", detail: "Compiling evidence and analysis" }
  ];

  const getCurrentStep = () => {
    const stepText = step.toLowerCase();
    if (stepText.includes('upload')) return 1;
    if (stepText.includes('analyz')) return 2;
    if (stepText.includes('license') || stepText.includes('plate')) return 3;
    if (stepText.includes('privacy') || stepText.includes('blur')) return 4;
    if (stepText.includes('report') || stepText.includes('creating')) return 5;
    if (stepText.includes('report') || stepText.includes('creating')) return 5;
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
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 40px rgba(147, 51, 234, 0.7)",
              "0 0 20px rgba(59, 130, 246, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-white" />
          </motion.div>
          
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{
                rotate: 360,
                x: [25, -25, 25],
                y: [25, -25, 25],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 40px rgba(147, 51, 234, 0.7)",
              "0 0 20px rgba(59, 130, 246, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-white" />
          </motion.div>
          
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{
                rotate: 360,
                x: [25, -25, 25],
                y: [25, -25, 25],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing Your Report</h2>
        <p className="text-slate-600">Advanced AI analyzing violations while protecting privacy</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="space-y-6">
            {steps.map((stepItem) => (
              <motion.div
                key={stepItem.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  stepItem.id === currentStep
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : stepItem.id < currentStep
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-slate-50 border-2 border-slate-200'
                }`}
                animate={{
                  scale: stepItem.id === currentStep ? 1.02 : 1,
                  x: stepItem.id === currentStep ? [0, 2, 0] : 0,
                  x: stepItem.id === currentStep ? [0, 2, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated background for current step */}
                {stepItem.id === currentStep && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-blue-100/50"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
                
                {/* Animated background for current step */}
                {stepItem.id === currentStep && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-blue-100/50"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
                
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stepItem.id === currentStep
                    ? 'bg-blue-500 text-white'
                    : stepItem.id < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300 text-slate-500'
                } relative z-10`}>
                  {stepItem.id === currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-6 h-6" />
                    </motion.div>
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={stepItem.id < currentStep ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <stepItem.icon className="w-6 h-6" />
                    </motion.div>
                      animate={stepItem.id < currentStep ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <stepItem.icon className="w-6 h-6" />
                    </motion.div>
                  )}
                </div>
                <div className="relative z-10 flex-1">
                  <p className={`font-semibold ${
                    stepItem.id === currentStep || stepItem.id < currentStep
                      ? 'text-slate-800'
                      : 'text-slate-500'
                  }`}>
                    {stepItem.label}
                  </p>
                  <p className={`text-xs mt-1 ${
                    stepItem.id === currentStep || stepItem.id < currentStep
                      ? 'text-slate-600'
                      : 'text-slate-400'
                  }`}>
                    {stepItem.detail}
                  </p>
                  <p className={`text-xs mt-1 ${
                    stepItem.id === currentStep || stepItem.id < currentStep
                      ? 'text-slate-600'
                      : 'text-slate-400'
                  }`}>
                    {stepItem.detail}
                  </p>
                  {stepItem.id === currentStep && (
                    <motion.p 
                      className="text-sm text-blue-600 mt-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Processing...
                    </motion.p>
                      className="text-sm text-blue-600 mt-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Processing...
                    </motion.p>
                  )}
                  {stepItem.id < currentStep && (
                    <motion.p 
                      className="text-sm text-green-600 mt-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓ Completed
                    </motion.p>
                      className="text-sm text-green-600 mt-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓ Completed
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-amber-800 text-center">
                <strong>Advanced AI Processing:</strong> Analyzing violations, detecting license plates, and protecting privacy. Please wait 30-60 seconds.
              </p>
            </motion.div>
            >
              <p className="text-sm text-amber-800 text-center">
                <strong>Advanced AI Processing:</strong> Analyzing violations, detecting license plates, and protecting privacy. Please wait 30-60 seconds.
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}