import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Star } from "lucide-react";

export default function ProgressTracker({ userProfile, levelInfo }) {
  const getProgressToNextLevel = () => {
    if (!levelInfo.pointsToNext) return 100;
    const currentLevelPoints = userProfile.total_points - (userProfile.total_points - levelInfo.pointsToNext);
    const nextLevelThreshold = levelInfo.pointsToNext;
    return Math.min(100, Math.max(0, (userProfile.total_points / (userProfile.total_points + nextLevelThreshold)) * 100));
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Level Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {levelInfo.level}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{levelInfo.name}</p>
                <p className="text-sm text-slate-600">{userProfile.total_points} points earned</p>
              </div>
            </div>
            {levelInfo.nextLevel && (
              <div className="text-right">
                <p className="text-sm text-slate-600">Next: {levelInfo.nextLevel}</p>
                <p className="text-xs text-slate-500">{levelInfo.pointsToNext} points to go</p>
              </div>
            )}
          </div>
          
          {levelInfo.nextLevel ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {levelInfo.nextLevel}</span>
                <span>{Math.round(getProgressToNextLevel())}%</span>
              </div>
              <Progress value={getProgressToNextLevel()} className="h-2" />
            </div>
          ) : (
            <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800">Maximum Level Reached!</p>
              <p className="text-sm text-slate-600">You're a true Traffic Hero!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}