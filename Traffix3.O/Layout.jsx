import React, { useState } from "react";
import { motion } from "framer-motion";
import CursorEffects from "@/components/ui/cursor-effects";
import BackgroundCars from "@/components/ui/background-cars";
import FloatingParticles from "@/components/ui/floating-particles";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Shield,
  BarChart3,
  Upload,
  User,
  Gift,
  Trophy,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Upload Video",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Rewards",
    url: "/rewards",
    icon: Gift,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Fleet Management",
    url: "/fleet",
    icon: Building2,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
];

export default function Layout({ children, currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <CursorEffects />
      <BackgroundCars />
      <FloatingParticles />
      
      <SidebarProvider>
        <Sidebar className="border-r-0 bg-white/80 backdrop-blur-md shadow-xl">
          <SidebarHeader className="p-6 border-b border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-800">Traffix</h2>
                <p className="text-sm text-slate-500">AI Traffic Monitoring</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-600 font-semibold mb-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => setCurrentPage(item.url.slice(1))}
                        className={`w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          currentPage === item.url.slice(1)
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-200/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800">John Doe</p>
                <p className="text-sm text-slate-500">Premium User</p>
              </div>
              <LogOut className="w-4 h-4 text-slate-400" />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <SidebarTrigger className="mb-6 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200" />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}