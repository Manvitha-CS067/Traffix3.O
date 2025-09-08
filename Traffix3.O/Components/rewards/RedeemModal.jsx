import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Coins, Gift, Calendar, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function RedeemModal({ voucher, userPoints, onClose, onRedeem }) {
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    
    // Simulate redemption process
    setTimeout(() => {
      onRedeem(voucher);
      setIsRedeeming(false);
    }, 2000);
  };

  const canAfford = userPoints >= voucher.points_cost;

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Confirm Redemption
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {voucher.image_url && (
            <img 
              src={voucher.image_url} 
              alt={voucher.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          )}
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{voucher.title}</h3>
            <p className="text-slate-600 mb-2">{voucher.partner_name}</p>
            <Badge className="bg-purple-100 text-purple-800">
              {voucher.voucher_type.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span>Cost:</span>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-purple-600">{voucher.points_cost} points</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span>Your Balance:</span>
              <span className="font-bold">{userPoints} points</span>
            </div>
            
            <div className="flex justify-between">
              <span>After Redemption:</span>
              <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                {userPoints - voucher.points_cost} points
              </span>
            </div>
            
            {voucher.expiry_date && (
              <div className="flex justify-between text-sm">
                <span>Expires:</span>
                <span>{format(new Date(voucher.expiry_date), 'MMM d, yyyy')}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-slate-600">{voucher.description}</p>
          
          {voucher.terms_conditions && (
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
              <strong>Terms & Conditions:</strong> {voucher.terms_conditions}
            </div>
          )}
          
          {!canAfford && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need {voucher.points_cost - userPoints} more points to redeem this reward.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isRedeeming}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleRedeem}
              disabled={!canAfford || isRedeeming}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isRedeeming ? 'Redeeming...' : 'Confirm Redemption'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}