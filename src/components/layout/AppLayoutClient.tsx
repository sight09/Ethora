"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import FloatingAIChat from "@/components/ai/FloatingAIChat";
import PublicHeader from "@/components/layout/PublicHeader";
import { useEthora } from "@/context/EthoraContext";

export const AppLayoutClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useEthora();

  const isAuthPage = pathname?.startsWith("/auth");
  const isLandingPage = pathname === "/";
  const isPublicPage =
    isLandingPage ||
    isAuthPage ||
    pathname === "/rankings" ||
    pathname?.startsWith("/tournaments");

  // Protect private routes: newcomers/unauthenticated visitors must sign in
  useEffect(() => {
    if (isInitialized && !isAuthenticated && !isPublicPage) {
      router.push(`/auth/signin?redirect=${encodeURIComponent(pathname || "/")}`);
    }
  }, [isInitialized, isAuthenticated, isPublicPage, pathname, router]);

  // Sidebar starts COLLAPSED by default for authenticated users
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleToggleAIChat = () => {
    setAiChatOpen((prev) => !prev);
  };

  // 1. Auth pages only: standalone full screen without floating chat distractions
  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full bg-[#05030a] text-slate-100">
        {children}
      </div>
    );
  }

  // 2. Landing page: standalone esports experience WITH the floating circular AI Chat Copilot!
  if (isLandingPage) {
    return (
      <div className="min-h-screen w-full bg-[#05030a] text-slate-100 relative">
        {children}
        <FloatingAIChat
          isOpen={aiChatOpen}
          onToggle={handleToggleAIChat}
        />
      </div>
    );
  }

  // 3. Unauthenticated visitor viewing allowed public pages (/rankings, /tournaments):
  // Clean public header with logo, rankings, tournaments, and sign in button - NO SIDEBAR!
  if (!isAuthenticated) {
    if (!isPublicPage) {
      // Waiting for redirect to /auth/signin
      return (
        <div className="min-h-screen w-full bg-[#08090E] flex items-center justify-center text-slate-400">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Redirecting to Sign In...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col bg-[#08090E] text-slate-100 relative">
        <PublicHeader />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <FloatingAIChat
          isOpen={aiChatOpen}
          onToggle={handleToggleAIChat}
        />
      </div>
    );
  }

  // 3. Authenticated user: Full platform experience with collapsible SIDEBAR!
  return (
    <div className="min-h-screen flex flex-col bg-[#08090E] text-slate-100">
      {/* 1. COLLAPSIBLE SIDEBAR */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onOpenAIChat={() => setAiChatOpen(true)}
      />

      {/* 2. MAIN CONTENT AREA (Dynamically padded: pl-20 when collapsed, pl-64 when expanded) */}
      <div
        className={`flex-1 flex flex-col min-h-screen w-full transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <main className="flex-1 w-full flex flex-col">{children}</main>
      </div>

      {/* 3. FLOATING AI CHAT WIDGET WITH SMALL ROBOT ICON IN BOTTOM-RIGHT */}
      <FloatingAIChat
        isOpen={aiChatOpen}
        onToggle={handleToggleAIChat}
      />
    </div>
  );
};

export default AppLayoutClient;
