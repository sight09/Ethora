"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import FloatingAIChat from "@/components/ai/FloatingAIChat";

export const AppLayoutClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  // Sidebar starts COLLAPSED by default
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleToggleAIChat = () => {
    setAiChatOpen((prev) => !prev);
  };

  // If on an authentication page (e.g. /auth/signin, /auth/signup), render standalone full screen
  if (isAuthPage) {
    return (
      <main className="min-h-screen w-full bg-[#070913] text-slate-100 overflow-x-hidden">
        {children}
      </main>
    );
  }

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
