
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Upload, LayoutDashboard, Users, Trophy, Gift, Target, User as UserIcon, TrendingUp, Truck, Globe } from "lucide-react";
import { motion } from "framer-motion";
import CursorEffects from "@/components/ui/cursor-effects";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { User } from "@/entities/User";
import { UserProfile } from "@/entities/UserProfile";
import { Badge as BadgeEntity } from "@/entities/Badge";
import { Challenge } from "@/entities/Challenge";
import { RewardVoucher } from "@/entities/RewardVoucher";

const navigationItems = [
  {
    title: "Upload Report",
    url: createPageUrl("Upload"),
    icon: Upload,
    roles: ["user", "admin"]
  },
  {
    title: "My Profile",
    url: createPageUrl("Profile"),
    icon: UserIcon,
    roles: ["user", "admin"]
  },
  {
    title: "Leaderboard",
    url: createPageUrl("Leaderboard"),
    icon: Trophy,
    roles: ["user", "admin"]
  },
  {
    title: "Challenges",
    url: createPageUrl("Challenges"),
    icon: Target,
    roles: ["user", "admin"]
  },
  {
    title: "Rewards",
    url: createPageUrl("Rewards"),
    icon: Gift,
    roles: ["user", "admin"]
  },
  {
    title: "Authority Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    roles: ["admin"]
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: TrendingUp,
    roles: ["admin"]
  },
  {
    title: "Fleet Management",
    url: createPageUrl("FleetManagement"),
    icon: Truck,
    roles: ["admin"]
  },
  {
    title: "API Integration",
    url: createPageUrl("APIIntegration"),
    icon: Globe,
    roles: ["admin"]
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        
        // Load user profile for gamification stats
        try {
          const profiles = await UserProfile.filter({ user_email: currentUser.email });
          if (profiles.length > 0) {
            setUserProfile(profiles[0]);
          } else {
            // Create profile if doesn't exist
            const newProfile = await UserProfile.create({
              user_email: currentUser.email,
              city: "Unknown",
              total_points: 0,
              total_reports: 0,
              approved_reports: 0,
              current_streak: 0 // Initialize current_streak
            });
            setUserProfile(newProfile);
          }
        } catch (profileError) {
          console.log("Error loading user profile:", profileError);
        }
      } catch (error) {
        console.log("User not authenticated");
      }
    };
    loadUser();
  }, []);

  React.useEffect(() => {
    const seedInitialData = async () => {
      if (localStorage.getItem('traffixDataSeeded')) {
        return;
      }
      
      try {
        const badges = await BadgeEntity.list(undefined, 1);
        if (badges.length === 0) {
          await BadgeEntity.bulkCreate([
            {"name": "First Reporter", "description": "Submit your first violation report", "icon": "rocket", "color": "blue", "category": "milestone", "requirement_type": "report_count", "requirement_value": 1, "points_reward": 50},
            {"name": "Helmet Hunter", "description": "Report 10 helmet violations", "icon": "shield", "color": "green", "category": "violation_type", "requirement_type": "violation_specific", "requirement_value": 10, "violation_type": "helmet_absence", "points_reward": 100},
            {"name": "Speed Buster", "description": "Report 5 overspeeding violations", "icon": "zap", "color": "yellow", "category": "violation_type", "requirement_type": "violation_specific", "requirement_value": 5, "violation_type": "overspeeding", "points_reward": 75},
            {"name": "Signal Slayer", "description": "Report 15 red light violations", "icon": "traffic-light", "color": "red", "category": "violation_type", "requirement_type": "violation_specific", "requirement_value": 15, "violation_type": "red_light_jump", "points_reward": 150},
            {"name": "Streak Master", "description": "Maintain a 30-day reporting streak", "icon": "flame", "color": "orange", "category": "streak", "requirement_type": "streak", "requirement_value": 30, "points_reward": 200}
          ]);
        }
        
        const challenges = await Challenge.list(undefined, 1);
        if (challenges.length === 0) {
          await Challenge.bulkCreate([
            {"title": "Weekend Safety Blitz", "description": "Report 5 violations this weekend for 3X points!", "challenge_type": "special_event", "target_violation": "all", "target_count": 5, "points_multiplier": 3, "bonus_points": 500, "start_date": "2024-07-26T00:00:00Z", "end_date": "2024-07-28T23:59:59Z", "participant_count": 1247},
            {"title": "Helmet Awareness Week", "description": "Focus on helmet violations to promote road safety", "challenge_type": "weekly", "target_violation": "helmet_absence", "target_count": 10, "points_multiplier": 2, "bonus_points": 300, "start_date": "2024-07-22T00:00:00Z", "end_date": "2024-07-28T23:59:59Z", "participant_count": 892},
            {"title": "Daily Patrol", "description": "Submit at least 1 report daily for a week", "challenge_type": "daily", "target_violation": "all", "target_count": 7, "points_multiplier": 1.5, "bonus_points": 150, "start_date": "2024-07-25T00:00:00Z", "end_date": "2024-08-01T23:59:59Z", "participant_count": 445}
          ]);
        }
        
        const vouchers = await RewardVoucher.list(undefined, 1);
        if (vouchers.length === 0) {
          await RewardVoucher.bulkCreate([
            {"title": "₹100 Fuel Voucher", "description": "Get ₹100 off on fuel at participating petrol pumps", "partner_name": "IndianOil", "voucher_type": "discount", "points_cost": 500, "discount_amount": 100, "max_redemptions": 100, "current_redemptions": 23, "expiry_date": "2025-06-30", "terms_conditions": "Valid at participating IndianOil outlets.", "image_url": "https://images.unsplash.com/photo-1613252024345-06c6a7424a1b?w=400"},
            {"title": "₹50 Cashback", "description": "Direct cashback to your UPI account", "partner_name": "Traffix", "voucher_type": "cashback", "points_cost": 300, "discount_amount": 50, "max_redemptions": 200, "current_redemptions": 67, "expiry_date": "2025-12-31", "terms_conditions": "Cashback will be credited within 24 hours.", "image_url": "https://images.unsplash.com/photo-1620714223084-86c9df2492b4?w=400"},
            {"title": "Free Coffee", "description": "Complimentary coffee at Cafe Coffee Day", "partner_name": "Cafe Coffee Day", "voucher_type": "freebie", "points_cost": 150, "max_redemptions": 50, "current_redemptions": 12, "expiry_date": "2025-03-31", "terms_conditions": "Valid for regular coffee only.", "image_url": "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400"},
            {"title": "Movie Ticket Discount", "description": "25% off on movie tickets", "partner_name": "BookMyShow", "voucher_type": "discount", "points_cost": 400, "discount_amount": 25, "max_redemptions": 75, "current_redemptions": 34, "expiry_date": "2025-05-15", "terms_conditions": "Maximum discount of ₹200.", "image_url": "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400"}
          ]);
        }
        
        localStorage.setItem('traffixDataSeeded', 'true');
      } catch (error) {
        console.error("Failed to seed initial data:", error);
      }
    };
    
    seedInitialData();
  }, []);

  const availableItems = navigationItems.filter(item => 
    !user || item.roles.includes(user.role)
  );

  const getUserLevel = (points) => {
    if (points >= 10000) return { level: 5, name: "Traffic Hero" };
    if (points >= 5000) return { level: 4, name: "Road Guardian" };
    if (points >= 2000) return { level: 3, name: "Safety Advocate" };
    if (points >= 500) return { level: 2, name: "Alert Citizen" };
    return { level: 1, name: "New Reporter" };
  };

  const levelInfo = userProfile ? getUserLevel(userProfile.total_points) : { level: 1, name: "New Reporter" };

  return (
    <SidebarProvider>
      <CursorEffects />
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar className="border-r border-slate-200 bg-white/90 backdrop-blur-sm relative overflow-hidden">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-purple-50/30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-navy-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative z-10"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
              <div>
                <h2 className="font-bold text-xl text-slate-800">Traffix</h2>
                <p className="text-sm text-slate-500">AI Traffic Monitoring</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {availableItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-2 ${
                          location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <motion.div
                            animate={location.pathname === item.url ? { rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <item.icon className="w-5 h-5" />
                          </motion.div>
                          <span className="font-medium">{item.title}</span>
                        </Link>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {userProfile && (
              <SidebarGroup className="mt-6">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">
                  Your Stats
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-3 space-y-3">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg relative overflow-hidden"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(59, 130, 246, 0.2)",
                          "0 0 20px rgba(147, 51, 234, 0.3)",
                          "0 0 10px rgba(59, 130, 246, 0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-purple-100/30"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div 
                          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm relative z-10"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          {levelInfo.level}
                        </motion.div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{levelInfo.name}</p>
                          <p className="text-xs text-slate-600">{userProfile.total_points} points</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Reports</span>
                        <span className="font-semibold">{userProfile.total_reports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Approved</span>
                        <span className="font-semibold text-green-600">{userProfile.approved_reports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Streak</span>
                        <span className="font-semibold text-orange-600">{userProfile.current_streak} days</span>
                      </div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Users className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">
                  {user?.full_name || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate capitalize">
                  {user?.role === 'admin' ? 'Traffic Authority' : 'Citizen Reporter'}
                </p>
              </div>
            </motion.div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-800">Traffix</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>

      <style jsx>{`
        .navy-600 { background-color: #1e3a8a; }
        .blue-600 { background-color: #2563eb; }
      `}</style>
    </SidebarProvider>
  );
}
