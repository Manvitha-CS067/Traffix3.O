import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Clock, Plus } from "lucide-react";

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
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Report Submitted Successfully!</h2>
        <p className="text-slate-600">Your traffic violation report has been processed and sent to authorities for review.</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Report ID</p>
                  <p className="text-sm text-slate-600">#{reportId?.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">AI Analysis Complete</span>
                </div>
                <p className="text-sm text-green-700">Video analyzed and violation detected</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">Pending Review</span>
                </div>
                <p className="text-sm text-amber-700">Awaiting authority review</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Traffic authorities will review your report</li>
                <li>• AI analysis and evidence will be verified</li>
                <li>• You'll be notified if follow-up is needed</li>
                <li>• The violation may result in official action</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button
          onClick={onNewReport}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Submit Another Report
        </Button>
        
        <p className="text-xs text-slate-500">
          Keep your dashcam footage until the case is resolved. Thank you for helping make roads safer.
        </p>
      </div>
    </motion.div>
  );
}