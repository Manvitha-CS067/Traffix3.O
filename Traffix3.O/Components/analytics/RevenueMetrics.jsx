import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { DollarSign, TrendingUp, Target, Percent } from "lucide-react";

export default function RevenueMetrics({ analyticsData, revenueData }) {
  const getRevenueByCity = () => {
    const cityRevenue = {};
    
    analyticsData.forEach(item => {
      if (!cityRevenue[item.city]) {
        cityRevenue[item.city] = 0;
      }
      cityRevenue[item.city] += item.revenue_generated || 0;
    });
    
    return Object.entries(cityRevenue).map(([city, revenue]) => ({
      city,
      revenue: Math.round(revenue)
    })).sort((a, b) => b.revenue - a.revenue);
  };

  const getMonthlyRevenueTrend = () => {
    const monthlyData = {};
    
    analyticsData.forEach(item => {
      const month = item.date.substring(0, 7); // YYYY-MM format
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += item.revenue_generated || 0;
    });
    
    return Object.entries(monthlyData).map(([month, revenue]) => ({
      month,
      revenue: Math.round(revenue)
    })).sort((a, b) => a.month.localeCompare(b.month));
  };

  const getTotalRevenue = () => {
    return analyticsData.reduce((sum, item) => sum + (item.revenue_generated || 0), 0);
  };

  const getAverageRevenuePerReport = () => {
    const totalReports = analyticsData.reduce((sum, item) => sum + item.approved_reports, 0);
    const totalRevenue = getTotalRevenue();
    return totalReports > 0 ? totalRevenue / totalReports : 0;
  };

  const getRevenueGrowth = () => {
    const monthlyTrend = getMonthlyRevenueTrend();
    if (monthlyTrend.length < 2) return 0;
    
    const lastMonth = monthlyTrend[monthlyTrend.length - 1].revenue;
    const previousMonth = monthlyTrend[monthlyTrend.length - 2].revenue;
    
    return previousMonth > 0 ? ((lastMonth - previousMonth) / previousMonth) * 100 : 0;
  };

  const cityRevenueData = getRevenueByCity();
  const monthlyRevenueData = getMonthlyRevenueTrend();

  return (
    <div className="space-y-6">
      {/* Revenue KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-800">₹{getTotalRevenue().toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-2">Avg per Report</p>
                <p className="text-3xl font-bold text-blue-800">₹{getAverageRevenuePerReport().toFixed(0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-2">Growth Rate</p>
                <p className="text-3xl font-bold text-purple-800">{getRevenueGrowth().toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-2">Commission Rate</p>
                <p className="text-3xl font-bold text-orange-800">7.5%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Percent className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue by City</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Business Model Explanation */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Revenue Model & Business Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Government Partnership</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Commission Rate:</span>
                  <span className="font-semibold">7.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Avg Challan:</span>
                  <span className="font-semibold">₹{getAverageRevenuePerReport().toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Monthly Revenue:</span>
                  <span className="font-semibold text-green-600">₹{(getTotalRevenue() / 12).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Citizen Incentives</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Rewards Budget:</span>
                  <span className="font-semibold">25% of Revenue</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Points per Report:</span>
                  <span className="font-semibold">50-100 pts</span>
                </div>
                <Progress value={75} className="h-2 mt-2" />
                <span className="text-xs text-slate-500">Sustainable reward cycle</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Growth Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Monthly Growth:</span>
                  <span className="font-semibold text-green-600">+{getRevenueGrowth().toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">ROI for Govt:</span>
                  <span className="font-semibold">300%+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Cost per Enforcement:</span>
                  <span className="font-semibold">₹0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Sustainable Revenue Loop</h4>
            <p className="text-sm text-green-700">
              Citizens report violations → AI processes & authorities review → Government collects challan → 
              Traffix earns commission → Citizens get rewards → More engagement → Better enforcement
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}