import React, { useState, useEffect } from "react";
import { UserProfile } from "@/entities/UserProfile";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Crown, Medal, Star, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function LeaderboardPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [cityLeaderboard, setCityLeaderboard] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Load user profile
      const profiles = await UserProfile.filter({ user_email: user.email });
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
      }

      // Load global leaderboard
      const allProfiles = await UserProfile.list('-total_points', 50);
      setGlobalLeaderboard(allProfiles);

      // Load city leaderboard if user has city
      if (profiles.length > 0 && profiles[0].city) {
        const cityProfiles = await UserProfile.filter(
          { city: profiles[0].city },
          '-total_points',
          20
        );
        setCityLeaderboard(cityProfiles);
      }

    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center font-bold text-slate-600">#{rank}</span>;
    }
  };

  const getUserLevel = (points) => {
    if (points >= 10000) return { level: 5, name: "Traffic Hero", color: "purple" };
    if (points >= 5000) return { level: 4, name: "Road Guardian", color: "blue" };
    if (points >= 2000) return { level: 3, name: "Safety Advocate", color: "green" };
    if (points >= 500) return { level: 2, name: "Alert Citizen", color: "orange" };
    return { level: 1, name: "New Reporter", color: "gray" };
  };

  const findUserRank = (leaderboard) => {
    if (!userProfile) return null;
    const index = leaderboard.findIndex(profile => profile.user_email === currentUser?.email);
    return index !== -1 ? index + 1 : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading leaderboard...</p>
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
            className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Leaderboard</h1>
          <p className="text-slate-600">See how you rank among traffic safety champions</p>
        </div>

        {/* User's Current Rank */}
        {userProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600">
                      <AvatarFallback className="text-white font-bold">
                        {currentUser?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-800">{currentUser?.full_name}</p>
                      <p className="text-sm text-slate-600">Your Current Rank</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">#{findUserRank(globalLeaderboard) || '?'}</p>
                      <p className="text-xs text-slate-600">Global Rank</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{userProfile.total_points}</p>
                      <p className="text-xs text-slate-600">Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{userProfile.total_reports}</p>
                      <p className="text-xs text-slate-600">Reports</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Global Rankings
            </TabsTrigger>
            <TabsTrigger value="city" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {userProfile?.city || 'City'} Rankings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Global Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {globalLeaderboard.map((profile, index) => {
                    const rank = index + 1;
                    const levelInfo = getUserLevel(profile.total_points);
                    const isCurrentUser = profile.user_email === currentUser?.email;
                    
                    return (
                      <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                          isCurrentUser 
                            ? 'bg-blue-50 border-2 border-blue-200' 
                            : rank <= 3 
                              ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                              : 'bg-white border border-slate-200 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(rank)}
                        </div>
                        
                        <Avatar className={`w-12 h-12 ${
                          rank <= 3 ? 'ring-2 ring-yellow-300' : ''
                        }`}>
                          <AvatarFallback className={`${
                            rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                            rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                            rank === 3 ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white' :
                            'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                          } font-bold`}>
                            {profile.user_email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-semibold ${isCurrentUser ? 'text-blue-800' : 'text-slate-800'}`}>
                              User #{profile.user_email?.slice(-8).toUpperCase()}
                            </p>
                            {isCurrentUser && (
                              <Badge className="bg-blue-500 text-white text-xs">You</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge className={`bg-${levelInfo.color}-100 text-${levelInfo.color}-800`}>
                              {levelInfo.name}
                            </Badge>
                            <span className="text-slate-600">{profile.city}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-800">{profile.total_points}</p>
                          <p className="text-sm text-slate-600">{profile.total_reports} reports</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="city">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {userProfile?.city || 'City'} Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cityLeaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">No City Data</h3>
                    <p className="text-slate-500">Update your city in profile to see local rankings</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cityLeaderboard.map((profile, index) => {
                      const rank = index + 1;
                      const levelInfo = getUserLevel(profile.total_points);
                      const isCurrentUser = profile.user_email === currentUser?.email;
                      
                      return (
                        <motion.div
                          key={profile.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                            isCurrentUser 
                              ? 'bg-blue-50 border-2 border-blue-200' 
                              : rank <= 3 
                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                                : 'bg-white border border-slate-200 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-center w-12">
                            {getRankIcon(rank)}
                          </div>
                          
                          <Avatar className={`w-12 h-12 ${
                            rank <= 3 ? 'ring-2 ring-blue-300' : ''
                          }`}>
                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
                              {profile.user_email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className={`font-semibold ${isCurrentUser ? 'text-blue-800' : 'text-slate-800'}`}>
                                User #{profile.user_email?.slice(-8).toUpperCase()}
                              </p>
                              {isCurrentUser && (
                                <Badge className="bg-blue-500 text-white text-xs">You</Badge>
                              )}
                            </div>
                            <Badge className={`bg-${levelInfo.color}-100 text-${levelInfo.color}-800`}>
                              {levelInfo.name}
                            </Badge>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-800">{profile.total_points}</p>
                            <p className="text-sm text-slate-600">{profile.total_reports} reports</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}