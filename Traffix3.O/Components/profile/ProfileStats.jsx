import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileStats({ userProfile, levelInfo, accuracyRate }) {
  const stats = [
    {
      title: "Total Points",
      value: userProfile.total_points,
      icon: Trophy,
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    },
    {
      title: "Reports Submitted",
      value: userProfile.total_reports,
      icon: Target,
      color: "blue",
      bgColor: "bg-blue-50", 
      textColor: "text-blue-600"
    },
    {
      title: "Accuracy Rate",
      value: `${accuracyRate}%`,
      icon: Zap,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Current Streak", 
      value: `${userProfile.current_streak} days`,
      icon: TrendingUp,
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}