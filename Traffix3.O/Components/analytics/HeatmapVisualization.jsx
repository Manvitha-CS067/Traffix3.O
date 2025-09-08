import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, AlertTriangle } from "lucide-react";

export default function HeatmapVisualization({ analyticsData }) {
  const getHotspotData = () => {
    const hotspotMap = {};
    
    analyticsData.forEach(item => {
      if (item.hotspot_locations) {
        item.hotspot_locations.forEach(location => {
          if (!hotspotMap[location]) {
            hotspotMap[location] = { location, count: 0, city: item.city };
          }
          hotspotMap[location].count += item.total_reports;
        });
      }
    });
    
    return Object.values(hotspotMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const getCityViolationData = () => {
    const cityMap = {};
    
    analyticsData.forEach(item => {
      if (!cityMap[item.city]) {
        cityMap[item.city] = { city: item.city, total: 0, violations: {} };
      }
      cityMap[item.city].total += item.total_reports;
      
      if (!cityMap[item.city].violations[item.violation_type]) {
        cityMap[item.city].violations[item.violation_type] = 0;
      }
      cityMap[item.city].violations[item.violation_type] += item.total_reports;
    });
    
    return Object.values(cityMap).sort((a, b) => b.total - a.total);
  };

  const hotspots = getHotspotData();
  const cityData = getCityViolationData();

  const getIntensityColor = (count, max) => {
    const intensity = count / max;
    if (intensity > 0.8) return 'bg-red-500';
    if (intensity > 0.6) return 'bg-orange-500';
    if (intensity > 0.4) return 'bg-yellow-500';
    if (intensity > 0.2) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const maxHotspotCount = Math.max(...hotspots.map(h => h.count), 1);
  const maxCityCount = Math.max(...cityData.map(c => c.total), 1);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            Violation Hotspots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hotspots.map((hotspot, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className={`w-4 h-4 rounded-full ${getIntensityColor(hotspot.count, maxHotspotCount)}`}
                  ></div>
                  <div>
                    <p className="font-medium text-slate-800">{hotspot.location}</p>
                    <p className="text-sm text-slate-600">{hotspot.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{hotspot.count}</p>
                  <p className="text-xs text-slate-500">reports</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800">High Priority Locations</p>
                <p className="text-sm text-amber-700">
                  Consider increasing enforcement in these areas. Deploy additional traffic personnel during peak hours.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            City-wise Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cityData.map((city, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">{city.city}</h3>
                  <span className="text-lg font-bold text-blue-600">{city.total}</span>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(city.violations).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${(count / city.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600 w-20 text-right">
                        {type.replace('_', ' ')} ({count})
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Intensity</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full ${getIntensityColor(city.total, maxCityCount)}`}
                      ></div>
                      <span className="font-medium">
                        {city.total > maxCityCount * 0.8 ? 'Very High' :
                         city.total > maxCityCount * 0.6 ? 'High' :
                         city.total > maxCityCount * 0.4 ? 'Medium' :
                         city.total > maxCityCount * 0.2 ? 'Low' : 'Very Low'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}