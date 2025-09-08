import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { UserProfile } from "@/entities/UserProfile";
import { UserBadge } from "@/entities/UserBadge";
import { Badge as BadgeEntity } from "@/entities/Badge";
import { ViolationReport } from "@/entities/ViolationReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User as UserIcon, 
  Trophy, 
  Target, 
  Zap, 
  Calendar,
  Award,
  TrendingUp,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

import ProfileStats from "../Components/profile/ProfileStats";
import BadgeCollection from "../Components/profile/BadgeCollection";
import RecentActivity from "../Components/profile/RecentActivity";
import ProgressTracker from "../Components/profile/ProgressTracker";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userBadges, setUserBadges] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      // Load or create user profile
      let profile;
      const profiles = await UserProfile.filter({ user_email: currentUser.email });
      if (profiles.length > 0) {
        profile = profiles[0];
      } else {
        profile = await UserProfile.create({
          user_email: currentUser.email,
          city: "Unknown",
          total_points: 0,
          total_reports: 0,
          approved_reports: 0
        });
      }
      setUserProfile(profile);

      // Load user badges
      const badges = await UserBadge.filter({ user_email: currentUser.email });
      setUserBadges(badges);

      // Load recent reports
      const reports = await ViolationReport.filter(
        { created_by: currentUser.email }, 
        '-created_date', 
        10
      );
      setRecentReports(reports);

    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLevel = (points) => {
    if (points >= 10000) return { level: 5, name: "Traffic Hero", nextLevel: null, pointsToNext: 0 };
    if (points >= 5000) return { level: 4, name: "Road Guardian", nextLevel: "Traffic Hero", pointsToNext: 10000 - points };
    if (points >= 2000) return { level: 3, name: "Safety Advocate", nextLevel: "Road Guardian", pointsToNext: 5000 - points };
    if (points >= 500) return { level: 2, name: "Alert Citizen", nextLevel: "Safety Advocate", pointsToNext: 2000 - points };
    return { level: 1, name: "New Reporter", nextLevel: "Alert Citizen", pointsToNext: 500 - points };
  };

  const getAccuracyRate = () => {
    if (!userProfile || userProfile.total_reports === 0) return 0;
    return Math.round((userProfile.approved_reports / userProfile.total_reports) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) return null;

  const levelInfo = getUserLevel(userProfile.total_points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <UserIcon className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.full_name}</h1>
          <div className="flex items-center justify-center gap-3">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
              Level {levelInfo.level} - {levelInfo.name}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {userProfile.city}
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <ProfileStats 
          userProfile={userProfile}
          levelInfo={levelInfo}
          accuracyRate={getAccuracyRate()}
        />

        {/* Progress Tracker */}
        <ProgressTracker 
          userProfile={userProfile}
          levelInfo={levelInfo}
        />

        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Badges ({userBadges.length})
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="badges">
            <BadgeCollection userBadges={userBadges} />
          </TabsContent>

          <TabsContent value="activity">
            <RecentActivity reports={recentReports} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Report Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Total Reports</span>
                        <span className="font-bold text-2xl">{userProfile.total_reports}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Approved Reports</span>
                        <span className="font-bold text-2xl text-green-600">{userProfile.approved_reports}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Accuracy Rate</span>
                        <span className="font-bold text-2xl text-blue-600">{getAccuracyRate()}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Engagement</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Current Streak</span>
                        <span className="font-bold text-2xl text-orange-600">{userProfile.current_streak} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Best Streak</span>
                        <span className="font-bold text-2xl text-purple-600">{userProfile.longest_streak} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Credibility Score</span>
                        <span className="font-bold text-2xl text-indigo-600">{userProfile.credibility_score}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}