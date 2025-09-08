import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import EnhancedButton from "@/components/ui/enhanced-button";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Clock, Plus, Sparkles, Shield, Brain } from "lucide-react";

export default function SubmissionSuccess({ reportId, onNewReport }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          
          {/* Success sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, (Math.cos(i * 60 * Math.PI / 180) * 40)],
                y: [0, (Math.sin(i * 60 * Math.PI / 180) * 40)],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          )
          )
          }
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          
          {/* Success sparkles */}
          {[...Array(6)].map((_, i) => (
          )
          )
          }
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-100/30 via-transparent to-blue-100/30"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        <CardContent className="p-8">
          <div className="space-y-6">
            <motion.div 
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileText className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Report ID</p>
                  <p className="text-sm text-slate-600">#{reportId?.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-green-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <span className="font-semibold text-green-800">AI Analysis Complete</span>
                </div>
                <p className="text-sm text-green-700">Advanced AI detected violations, extracted license plates, and protected privacy</p>
              </motion.div>

              <motion.div 
                className="p-4 bg-amber-50 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-blue-500" />
                  Traffic authorities will review AI-processed evidence
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-purple-500" />
                  Advanced analysis and license plate data verified
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  You'll earn points when report is approved
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  Violation may result in official e-challan
                </li>
              </ul>
            </motion.div>
          </div>
        </CardContent>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <EnhancedButton
          onClick={onNewReport}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Submit Another Report
          </EnhancedButton>
        </motion.div>
        
        <motion.p 
          className="text-xs text-slate-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Keep your dashcam footage until the case is resolved. Thank you for helping make roads safer.
        </motion.p>
      </div>
    </motion.div>
  );
}
  )
}