import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedButton from "@/components/ui/enhanced-button";
import { Video, Upload, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoUpload({ onVideoSelect, videoPreview, videoFile }) {
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  };

  const clearVideo = () => {
    onVideoSelect(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" />
          Dashcam Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!videoFile ? (
          <motion.div 
            className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50 relative overflow-hidden"
            whileHover={{ borderColor: '#3b82f6' }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-blue-100/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div 
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Upload className="w-8 h-8 text-blue-600" />
              </motion.div>
            </motion.div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Upload Dashcam Video</h3>
            <p className="text-slate-600 mb-6">
              Select a video file (MP4, MOV, AVI) up to 50MB. Keep clips short (10-20 seconds) for faster processing.
            </p>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <EnhancedButton type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
                Choose Video File
              </EnhancedButton>
            </label>
            
            <p className="text-xs text-slate-500 mt-4">
              Recommended: MP4 format, 720p or higher quality
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-black rounded-xl overflow-hidden group">
              {/* Video glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <video
                src={videoPreview}
                controls
                className="w-full max-h-64 object-contain relative z-10"
                preload="metadata"
              />
              <EnhancedButton
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 z-20"
                onClick={clearVideo}
              >
                <X className="w-4 h-4" />
              </EnhancedButton>
            </div>
            
            <motion.div 
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Play className="w-5 h-5 text-green-600" />
                </motion.div>
                <div>
                  <p className="font-medium text-green-800">{videoFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </CardContent>
      </Card>
    </motion.div>
  );
}