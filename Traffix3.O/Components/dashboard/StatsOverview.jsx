import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsOverview({ stats }) {
  const statCards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: FileText,
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock,
      color: "amber",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
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