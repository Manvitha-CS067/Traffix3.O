
import React, { useState, useEffect } from "react";
import { Challenge } from "@/entities/Challenge";
import { UserProfile } from "@/entities/UserProfile";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Clock, 
  Users, 
  Zap, 
  Calendar,
  Trophy,
  Star,
  Flame // Changed from Fire to Flame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isAfter, isBefore } from "date-fns";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallengesData();
  }, []);

  const loadChallengesData = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Load user profile
      const profiles = await UserProfile.filter({ user_email: user.email });
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
      }

      // Load active challenges
      const allChallenges = await Challenge.filter({ is_active: true }, '-created_date');
      setChallenges(allChallenges);

    } catch (error) {
      console.error("Error loading challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChallengeStatus = (challenge) => {
    const now = new Date();
    const startDate = new Date(challenge.start_date);
    const endDate = new Date(challenge.end_date);
    
    if (isBefore(now, startDate)) return 'upcoming';
    if (isAfter(now, endDate)) return 'expired';
    return 'active';
  };

  const getChallengeProgress = (challenge) => {
    // Mock progress calculation - in real app would track user's participation
    return Math.floor(Math.random() * 100);
  };

  const getChallengeIcon = (type) => {
    switch (type) {
      case 'daily': return <Clock className="w-5 h-5" />;
      case 'weekly': return <Calendar className="w-5 h-5" />;
      case 'monthly': return <Target className="w-5 h-5" />;
      case 'special_event': return <Star className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading challenges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Target className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Active Challenges</h1>
          <p className="text-slate-600">Complete challenges to earn bonus points and exclusive badges</p>
        </div>

        {/* Featured Challenge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">🎯 Weekend Safety Blitz</h2>
                <p className="text-slate-600 mb-4">Report 5 violations this weekend for 3X points!</p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">3X</p>
                    <p className="text-sm text-slate-600">Points Multiplier</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">47h</p>
                    <p className="text-sm text-slate-600">Time Remaining</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">1,247</p>
                    <p className="text-sm text-slate-600">Participants</p>
                  </div>
                </div>
                <Progress value={60} className="h-2 mb-4" />
                <p className="text-sm text-slate-600 mb-4">3 out of 5 reports completed</p>
                <Badge className="bg-green-500 text-white px-4 py-1">Active - Participating</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {challenges.map((challenge, index) => {
              const status = getChallengeStatus(challenge);
              const progress = getChallengeProgress(challenge);
              
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            status === 'active' ? 'bg-green-100 text-green-600' :
                            status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {getChallengeIcon(challenge.challenge_type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <Badge className={getStatusColor(status)}>
                              {status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-slate-600 mb-4">{challenge.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Target</span>
                          <span className="font-semibold">{challenge.target_count} reports</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Bonus Points</span>
                          <span className="font-semibold text-green-600">+{challenge.bonus_points}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Participants</span>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span className="font-semibold">{challenge.participant_count}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="text-xs text-slate-500">
                          Ends: {format(new Date(challenge.end_date), 'MMM d, yyyy')}
                        </div>
                        
                        <Button 
                          className="w-full" 
                          disabled={status !== 'active'}
                          variant={status === 'active' ? 'default' : 'outline'}
                        >
                          {status === 'active' ? 'Join Challenge' : 
                           status === 'upcoming' ? 'Coming Soon' : 'Expired'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Challenge History */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Your Challenge History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Helmet Awareness Week", status: "completed", points: 500, rank: 12 },
                { name: "Speed Limit Enforcement", status: "completed", points: 300, rank: 25 },
                { name: "Traffic Light Compliance", status: "missed", points: 0, rank: null }
              ].map((challenge, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800">{challenge.name}</p>
                    <Badge className={
                      challenge.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }>
                      {challenge.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{challenge.points} pts</p>
                    {challenge.rank && (
                      <p className="text-sm text-slate-600">Rank #{challenge.rank}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
