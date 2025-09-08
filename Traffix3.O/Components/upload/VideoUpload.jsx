import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Upload, X, Play } from "lucide-react";

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
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5 text-blue-600" />
          Dashcam Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!videoFile ? (
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
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
              <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
                Choose Video File
              </Button>
            </label>
            
            <p className="text-xs text-slate-500 mt-4">
              Recommended: MP4 format, 720p or higher quality
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-black rounded-xl overflow-hidden">
              <video
                src={videoPreview}
                controls
                className="w-full max-h-64 object-contain"
                preload="metadata"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600"
                onClick={clearVideo}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">{videoFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}