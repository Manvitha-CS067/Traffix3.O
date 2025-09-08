import React, { useState, useEffect } from "react";
import { RewardVoucher } from "@/entities/RewardVoucher";
import { UserProfile } from "@/entities/UserProfile";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gift, 
  Coins, 
  ShoppingBag, 
  Percent, 
  Star,
  Clock,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

import RewardCard from "../Components/rewards/RewardCard";
import RedeemModal from "../Components/rewards/RedeemModal";

export default function RewardsPage() {
  const [vouchers, setVouchers] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRewardsData();
  }, []);

  const loadRewardsData = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Load user profile
      const profiles = await UserProfile.filter({ user_email: user.email });
      if (profiles.length > 0) {
        setUserProfile(profiles[0]);
      }

      // Load available vouchers
      const activeVouchers = await RewardVoucher.filter({ is_active: true }, '-created_date');
      setVouchers(activeVouchers);

    } catch (error) {
      console.error("Error loading rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVoucherIcon = (type) => {
    switch (type) {
      case 'discount': return <Percent className="w-5 h-5" />;
      case 'cashback': return <Coins className="w-5 h-5" />;
      case 'freebie': return <Gift className="w-5 h-5" />;
      case 'experience': return <Star className="w-5 h-5" />;
      default: return <Gift className="w-5 h-5" />;
    }
  };

  const canAfford = (cost) => {
    return userProfile && userProfile.total_points >= cost;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading rewards...</p>
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
            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Rewards Store</h1>
          <p className="text-slate-600">Redeem your points for exclusive rewards and discounts</p>
        </div>

        {/* Points Balance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Your Balance</h2>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {userProfile?.total_points || 0}
              </p>
              <p className="text-sm text-slate-600 mt-2">Available Points</p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="vouchers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vouchers" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Available Rewards
            </TabsTrigger>
            <TabsTrigger value="redeemed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              My Rewards
            </TabsTrigger>
            <TabsTrigger value="expired" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Expired
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vouchers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers.map((voucher, index) => (
                <motion.div
                  key={voucher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RewardCard 
                    voucher={voucher}
                    canAfford={canAfford(voucher.points_cost)}
                    onRedeem={() => setSelectedVoucher(voucher)}
                    getVoucherIcon={getVoucherIcon}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="redeemed">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Redeemed Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No Rewards Redeemed Yet</h3>
                  <p className="text-slate-500">Start earning points by reporting violations to unlock rewards!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Expired Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No Expired Rewards</h3>
                  <p className="text-slate-500">Keep an eye on expiry dates to make sure you don't miss out!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Redeem Modal */}
        {selectedVoucher && (
          <RedeemModal
            voucher={selectedVoucher}
            userPoints={userProfile?.total_points || 0}
            onClose={() => setSelectedVoucher(null)}
            onRedeem={(voucher) => {
              // Handle redemption logic here
              console.log("Redeeming voucher:", voucher);
              setSelectedVoucher(null);
            }}
          />
        )}
      </div>
    </div>
  );
}