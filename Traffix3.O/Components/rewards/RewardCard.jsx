import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function RewardCard({ voucher, canAfford, onRedeem, getVoucherIcon }) {
  return (
    <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full ${
      !canAfford ? 'opacity-75' : ''
    }`}>
      <CardContent className="p-6 flex flex-col h-full">
        {voucher.image_url && (
          <img 
            src={voucher.image_url} 
            alt={voucher.title}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
        )}
        
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            {getVoucherIcon(voucher.voucher_type)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">{voucher.title}</h3>
            <p className="text-sm text-slate-600 mb-2">{voucher.partner_name}</p>
            <Badge className="bg-purple-100 text-purple-800 text-xs">
              {voucher.voucher_type.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 flex-1">{voucher.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-lg text-purple-600">{voucher.points_cost} pts</span>
            </div>
            {voucher.discount_amount && (
              <Badge className="bg-green-100 text-green-800">
                {voucher.voucher_type === 'discount' ? `${voucher.discount_amount}% OFF` : `$${voucher.discount_amount}`}
              </Badge>
            )}
          </div>
          
          {voucher.expiry_date && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>Expires: {format(new Date(voucher.expiry_date), 'MMM d, yyyy')}</span>
            </div>
          )}
          
          <div className="text-xs text-slate-500">
            {voucher.max_redemptions - voucher.current_redemptions} remaining
          </div>
          
          <Button
            onClick={onRedeem}
            disabled={!canAfford || voucher.current_redemptions >= voucher.max_redemptions}
            className={`w-full ${
              canAfford 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : 'bg-slate-300'
            }`}
          >
            {!canAfford ? 'Insufficient Points' : 
             voucher.current_redemptions >= voucher.max_redemptions ? 'Sold Out' :
             'Redeem Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}