import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function BadgeCollection({ userBadges }) {
  // Mock badges for demonstration
  const allBadges = [
    { id: 1, name: "First Reporter", description: "Submit your first violation report", icon: "🚀", earned: true },
    { id: 2, name: "Helmet Hunter", description: "Report 10 helmet violations", icon: "🪖", earned: true },
    { id: 3, name: "Speed Buster", description: "Report 5 overspeeding violations", icon: "⚡", earned: false },
    { id: 4, name: "Signal Slayer", description: "Report 15 red light violations", icon: "🚦", earned: false },
    { id: 5, name: "Streak Master", description: "Maintain a 30-day streak", icon: "🔥", earned: false },
    { id: 6, name: "Community Champion", description: "Top 10 in city leaderboard", icon: "👑", earned: false }
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Badge Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                badge.earned 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg' 
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              {!badge.earned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              )}
              
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
                badge.earned 
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100' 
                  : 'bg-slate-200'
              }`}>
                {badge.earned ? badge.icon : '🔒'}
              </div>
              
              <h3 className={`font-semibold mb-2 ${
                badge.earned ? 'text-slate-800' : 'text-slate-500'
              }`}>
                {badge.name}
              </h3>
              
              <p className={`text-xs ${
                badge.earned ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {badge.description}
              </p>
              
              {badge.earned && (
                <Badge className="mt-2 bg-green-100 text-green-800">
                  Earned
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}