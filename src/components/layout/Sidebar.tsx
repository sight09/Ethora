"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Trophy,
  Users,
  Swords,
  Layers,
  Sparkles,
  Bell,
  Menu,
  X,
  ChevronDown,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Settings,
  Flame,
  LayoutDashboard,
  PlusCircle,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  ChevronLeft,
  LogIn,
  LogOut,
} from "lucide-react";
import EthoraLogo, { EthoraEmblem } from "@/components/brand/EthoraLogo";
import { useEthora, RoleType } from "@/context/EthoraContext";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenAIChat?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = true,
  onToggleCollapse,
  onOpenAIChat,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentSession,
    setRole,
    logout,
    currentUser,
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
  } = useEthora();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isOrganizer = currentSession.role === "organizer";
  const isAdmin = currentSession.role === "admin";
  const isGuest = currentSession.role === "guest";

  const rolesList: { role: RoleType; title: string; subtitle: string; icon: any }[] = [
    { role: "gamer", title: "Yared 'ViperX'", subtitle: "Rank #1 Pro Gamer", icon: Flame },
    { role: "organizer", title: "Lion City Esports", subtitle: "Tournament Organizer", icon: Swords },
    { role: "organization", title: "Great Rift Syndicate", subtitle: "Esports Org Director", icon: Layers },
    { role: "admin", title: "ETHORA Ops Lead", subtitle: "Platform Administrator", icon: ShieldAlert },
  ];

  interface NavItem {
    label: string;
    href: string;
    icon: any;
    badge?: string;
    highlight?: boolean;
  }

  // Navigation items: Primary home/dashboard for current persona
  const homeNav: NavItem = {
    label: isOrganizer ? "Organizer Hub" : isAdmin ? "Admin Console" : "Dashboard",
    href: isOrganizer ? "/organizer" : isAdmin ? "/admin" : isGuest ? "/" : "/dashboard",
    icon: LayoutDashboard,
  };

  // Competitions navigation (Tournaments & Rankings only — no duplicate Overview)
  const competitionsNav: NavItem[] = [
    { label: "Tournaments", href: "/tournaments", icon: Swords, badge: "Live" },
    { label: "Rankings", href: "/rankings", icon: Trophy },
  ];

  const gamerNav: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/profile", icon: Users },
    { label: "Passport Settings", href: "/profile/settings", icon: Settings },
  ];

  const organizerNav: NavItem[] = [
    { label: "Organizer Hub", href: "/organizer", icon: LayoutDashboard },
    { label: "Create Tournament", href: "/organizer/create", icon: PlusCircle },
  ];

  const adminNav: NavItem[] = [
    { label: "Admin Console", href: "/admin", icon: ShieldAlert },
  ];

  const communityNav: NavItem[] = [
    { label: "Gamers", href: "/gamers", icon: Users },
    { label: "Teams", href: "/teams", icon: Layers },
    { label: "Organizations", href: "/organizations", icon: ShieldCheck },
  ];

  // ==========================================
  // RENDER COLLAPSED VIEW (w-20, Professional Spacing & Standard Gap)
  // ==========================================
  const renderCollapsedContent = () => (
    <div className="flex flex-col h-full bg-[#14111F] border-r border-[rgba(168,85,247,0.25)] text-[#B8B3CC] select-none items-center py-3 w-20">
      {/* Top: LOGO ICON AS COLLAPSE/EXPAND TOGGLE BUTTON */}
      <div className="flex flex-col items-center w-full pb-3 border-b border-[rgba(168,85,247,0.18)]">
        <div className="relative group">
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
            title="Click logo to expand sidebar"
            aria-label="Expand sidebar"
          >
            <EthoraEmblem size="md" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A855F7] border-2 border-[#14111F] flex items-center justify-center text-[9px] font-bold text-white shadow">
              <ChevronRight className="w-2.5 h-2.5" />
            </span>
          </button>

          {/* Hover Tooltip */}
          <div className="absolute left-full ml-3 top-1 px-3 py-1.5 rounded-lg bg-[#14111F] border border-[rgba(168,85,247,0.25)] text-[#F4F1FF] text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
            Click logo to expand sidebar
          </div>
        </div>
      </div>

      {/* Middle: Navigation Icons starting right below header with professional 8px spacing */}
      <div className="flex-1 w-full flex flex-col items-center pt-3 pb-2 gap-2">
        {/* Primary Role Home / Dashboard */}
        <div key={homeNav.href} className="relative group flex justify-center w-full">
          <Link
            href={homeNav.href}
            className={`w-11 h-11 rounded-xl transition-all duration-200 relative flex items-center justify-center ${
              pathname === homeNav.href
                ? "bg-[#A855F7]/20 text-[#F4F1FF] border border-[#A855F7]/40 shadow-[0_0_14px_rgba(168,85,247,0.35)]"
                : "text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#A855F7]/12"
            }`}
          >
            {pathname === homeNav.href && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
            )}
            <LayoutDashboard className={`w-5 h-5 ${pathname === homeNav.href ? "text-[#A855F7]" : ""}`} strokeWidth={1.75} />
          </Link>

          {/* Hover Tooltip on Right */}
          <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#14111F] border border-[rgba(168,85,247,0.25)] text-[#F4F1FF] text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
            {homeNav.label}
          </div>
        </div>

        {/* Competitions */}
        {competitionsNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative group flex justify-center w-full">
              <Link
                href={item.href}
                className={`w-11 h-11 rounded-xl transition-all duration-200 relative flex items-center justify-center ${isActive
                  ? "bg-[#A855F7]/20 text-[#F4F1FF] border border-[#A855F7]/40 shadow-[0_0_14px_rgba(168,85,247,0.35)]"
                  : "text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#A855F7]/12"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-[#A855F7]" : ""}`} strokeWidth={1.75} />
                {item.badge && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
                )}
              </Link>

              {/* Hover Tooltip on Right */}
              <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#14111F] border border-[rgba(168,85,247,0.25)] text-[#F4F1FF] text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
                {item.label}
              </div>
            </div>
          );
        })}

        {/* Subtle section divider between competitions and community */}
        <div className="w-8 h-[1px] bg-[rgba(168,85,247,0.2)] my-1" />

        {/* Community Nav */}
        {communityNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative group flex justify-center w-full">
              <Link
                href={item.href}
                className={`w-11 h-11 rounded-xl transition-all duration-200 relative flex items-center justify-center ${isActive
                  ? "bg-[#A855F7]/20 text-[#F4F1FF] border border-[#A855F7]/40 shadow-[0_0_14px_rgba(168,85,247,0.35)]"
                  : "text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#A855F7]/12"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-[#A855F7]" : ""}`} strokeWidth={1.75} />
              </Link>

              {/* Hover Tooltip on Right */}
              <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#14111F] border border-[rgba(168,85,247,0.25)] text-[#F4F1FF] text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom: Alerts, Profile Avatar with Role Switcher, Fiber status */}
      <div className="mt-auto w-full pt-3 pb-1 border-t border-[rgba(168,85,247,0.18)] flex flex-col items-center gap-2.5">
        {/* Notifications Icon */}
        <div className="relative group">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#141826] transition relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-violet-400" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-violet-600" />
            )}
          </button>

          {notifOpen && (
            <div className="fixed left-20 bottom-24 w-72 rounded-xl border border-[#232A42] bg-[#0E111A] p-3 shadow-2xl z-50 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#232A42]">
                <span className="text-[11px] font-bold text-white uppercase font-mono">Alerts</span>
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] text-violet-400 hover:text-violet-300"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1.5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded bg-[#141826] text-[11px]">
                    <p className="font-bold text-white">{n.title}</p>
                    <p className="text-slate-400 text-[10px]">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar with Role Switcher (Moved to Bottom) */}
        <div className="relative group">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="relative p-0.5 rounded-xl border border-violet-500/40 hover:border-violet-400 hover:scale-105 active:scale-95 transition"
            title={`Active Persona: ${currentSession.tag} (${currentSession.role})`}
            aria-label="Profile and role switcher"
          >
            <img
              src={currentSession.avatar}
              alt={currentSession.tag}
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A0D15]" />
          </button>

          {/* Hover Tooltip */}
          <div className="absolute left-full ml-3 bottom-1 px-3 py-1.5 rounded-lg bg-[#0E111A] border border-[#232A42] text-white text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
            {currentSession.tag} ({currentSession.role})
          </div>

          {/* Role switcher popup when clicked */}
          {roleMenuOpen && (
            <div className="fixed left-20 bottom-12 w-64 rounded-xl border border-[#232A42] bg-[#0E111A] shadow-2xl p-2 z-50 space-y-1">
              <div className="px-2 py-1.5 border-b border-[#232A42] mb-1 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase text-slate-400">Account & Persona</p>
                <Link
                  href="/auth/signin"
                  onClick={() => setRoleMenuOpen(false)}
                  className="text-[10px] text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Login Page</span>
                </Link>
              </div>
              {rolesList.map((item) => {
                const RoleIcon = item.icon;
                const isSelected = currentSession.role === item.role;
                return (
                  <button
                    key={item.role}
                    onClick={() => {
                      setRole(item.role);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition ${isSelected
                      ? "bg-violet-600 text-white font-bold"
                      : "hover:bg-[#141826] text-slate-300"
                      }`}
                  >
                    <RoleIcon className="w-3.5 h-3.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs truncate block">{item.title}</span>
                      <span className="text-[10px] opacity-70 truncate block">{item.subtitle}</span>
                    </div>
                  </button>
                );
              })}
              <div className="pt-1 mt-1 border-t border-[#232A42] flex items-center justify-between px-1">
                <Link
                  href="/auth/signin"
                  onClick={() => setRoleMenuOpen(false)}
                  className="p-1.5 text-[11px] text-slate-400 hover:text-white flex items-center gap-1.5 rounded-lg hover:bg-[#141826] transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-violet-400" />
                  <span>Sign In</span>
                </Link>
                {currentSession.role !== "guest" && (
                  <button
                    onClick={() => {
                      logout();
                      setRoleMenuOpen(false);
                      router.push("/");
                    }}
                    className="p-1.5 text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1.5 rounded-lg hover:bg-[#141826] transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Subtle Ethiopian Tri-color Accent */}
        <div className="h-1 w-8 rounded-full ethiopia-flag-stripe opacity-80" />
      </div>
    </div>
  );

  // ==========================================
  // RENDER EXPANDED VIEW (w-64, Logo triggers Collapse)
  // ==========================================
  const renderExpandedContent = () => (
    <div className="flex flex-col h-full bg-[#14111F] border-r border-[rgba(168,85,247,0.25)] text-[#B8B3CC] select-none font-sans">
      {/* 1. BRAND HEADER: CLICKING LOGO OR COLLAPSE BUTTON COLLAPSES SIDEBAR */}
      <div className="p-4 border-b border-[rgba(168,85,247,0.25)] flex items-center justify-between group">
        <button
          onClick={onToggleCollapse}
          className="flex items-center gap-2.5 text-left transition hover:opacity-90 focus:outline-none"
          title="Click logo to collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <EthoraLogo
            size="sm"
            showTagline={true}
            asLink={false}
          />
        </button>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#A855F7]/15 transition border border-[rgba(168,85,247,0.25)]"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4 text-[#A855F7]" />
          </button>
        )}
      </div>

      {/* 2. NAVIGATION SECTIONS */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* Competitions */}
        <div className="space-y-1">
          <span className="px-3 text-[12px] font-[600] text-[#7D7896] uppercase tracking-[0.2em] block mb-1.5">
            Competitions
          </span>
          {competitionsNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] transition ${isActive
                  ? "font-[600] text-[#F4F1FF] bg-[#A855F7]/15 border-l-[3px] border-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                  : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF] hover:bg-[#A855F7]/10"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#A855F7]" : "text-[#7D7896]"}`} strokeWidth={1.75} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[11px] font-[600] rounded-full bg-[#A855F7]/30 text-[#F4F1FF] border border-[#A855F7]/40">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {currentSession.role === "gamer" && (
          <div className="space-y-1">
            <span className="px-3 text-[12px] font-[600] text-[#7D7896] uppercase tracking-[0.2em] block mb-1.5">
              My Arena
            </span>
            {gamerNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] transition ${isActive
                    ? "font-[600] text-[#F4F1FF] bg-[#A855F7]/15 border-l-[3px] border-[#A855F7]"
                    : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF] hover:bg-[#A855F7]/10"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#A855F7]" : "text-[#7D7896]"}`} strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {isOrganizer && (
          <div className="space-y-1">
            <span className="px-3 text-[12px] font-[600] text-[#7D7896] uppercase tracking-[0.2em] block mb-1.5">
              Organizer Suite
            </span>
            {organizerNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] transition ${isActive
                    ? "font-[600] text-[#F4F1FF] bg-[#A855F7]/15 border-l-[3px] border-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                    : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF] hover:bg-[#A855F7]/10"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#A855F7]" : "text-[#7D7896]"}`} strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {isAdmin && (
          <div className="space-y-1">
            <span className="px-3 text-[12px] font-[600] text-[#7D7896] uppercase tracking-[0.2em] block mb-1.5">
              Administration
            </span>
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] transition ${isActive
                    ? "font-[600] text-[#F4F1FF] bg-rose-950/40 border-l-[3px] border-rose-500"
                    : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF] hover:bg-[#A855F7]/10"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-[18px] h-[18px] ${isActive ? "text-rose-400" : "text-[#7D7896]"}`} strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="space-y-1">
          <span className="px-3 text-[12px] font-[600] text-[#7D7896] uppercase tracking-[0.2em] block mb-1.5">
            Community
          </span>
          {communityNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] transition ${isActive
                  ? "font-[600] text-[#F4F1FF] bg-[#A855F7]/15 border-l-[3px] border-[#A855F7]"
                  : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF] hover:bg-[#A855F7]/10"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#A855F7]" : "text-[#7D7896]"}`} strokeWidth={1.75} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. PROFILE / ACTIVE PERSONA & FOOTER STATUS (MOVED TO BOTTOM) */}
      <div className="p-3 border-t border-[#232A42] bg-[#0E111A]/95 space-y-2.5 relative shrink-0 font-sans">
        {/* Role Switcher Menu (Opens upward above profile button) */}
        {roleMenuOpen && (
          <div className="absolute left-3 right-3 bottom-full mb-2 rounded-xl border border-[#232A42] bg-[#0E111A] shadow-2xl p-2 z-50 space-y-1">
            <div className="px-2 py-1.5 border-b border-[#232A42] mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Account & Persona
              </span>
              <Link
                href="/auth/signin"
                onClick={() => {
                  setRoleMenuOpen(false);
                  setMobileOpen(false);
                }}
                className="text-[11px] text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login Page</span>
              </Link>
            </div>
            {rolesList.map((item) => {
              const RoleIcon = item.icon;
              const isSelected = currentSession.role === item.role;
              return (
                <button
                  key={item.role}
                  onClick={() => {
                    setRole(item.role);
                    setRoleMenuOpen(false);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg flex items-center gap-2.5 transition ${isSelected
                    ? "bg-violet-600 text-white font-bold"
                    : "hover:bg-[#141826] text-slate-300"
                    }`}
                >
                  <RoleIcon className="w-3.5 h-3.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs truncate block">{item.title}</span>
                    <span className="text-[10px] opacity-70 truncate block">{item.subtitle}</span>
                  </div>
                </button>
              );
            })}
            <div className="pt-1.5 mt-1 border-t border-[#232A42] flex items-center justify-between px-1">
              <Link
                href="/auth/signin"
                onClick={() => {
                  setRoleMenuOpen(false);
                  setMobileOpen(false);
                }}
                className="p-1.5 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 rounded-lg hover:bg-[#141826] transition font-medium"
              >
                <LogIn className="w-3.5 h-3.5 text-violet-400" />
                <span>Go to Sign In</span>
              </Link>
              {currentSession.role !== "guest" && (
                <button
                  onClick={() => {
                    logout();
                    setRoleMenuOpen(false);
                    setMobileOpen(false);
                    router.push("/");
                  }}
                  className="p-1.5 text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 rounded-lg hover:bg-[#141826] transition font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Profile Card Button */}
        <button
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="w-full p-2 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] hover:border-violet-500/40 transition flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={currentSession.avatar}
                alt=""
                className="w-9 h-9 rounded-lg object-cover border border-violet-500/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141826]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[13px] font-semibold text-white block truncate group-hover:text-violet-300 transition">
                {currentSession.tag}
              </span>
              <span className="text-[11px] text-slate-400 capitalize block truncate">
                {currentSession.role === "gamer" ? "Rank #1 Pro Gamer" : currentSession.role}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1 group-hover:text-white transition" />
        </button>

        {/* Alerts / Fiber Status Row */}
        <div className="flex items-center justify-between text-xs px-1">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="flex items-center gap-1.5 font-medium text-slate-400 hover:text-white transition"
          >
            <Bell className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[11px]">Alerts</span>
            {unreadNotificationCount > 0 && (
              <span className="w-3.5 h-3.5 rounded-full bg-violet-600 text-[9px] font-bold text-white flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            48ms Fiber
          </span>
        </div>

        {/* Tri-color stripe */}
        <div className="h-1 w-full rounded-full ethiopia-flag-stripe opacity-75" />
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Collapsed or Expanded) */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col shadow-2xl transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
          }`}
      >
        {isCollapsed ? renderCollapsedContent() : renderExpandedContent()}
      </aside>

      {/* 2. MOBILE TOP BAR */}
      <header className="lg:hidden sticky top-0 z-40 w-full border-b border-[#232A42] bg-[#08090E]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg border border-[#232A42] bg-[#0E111A] text-slate-300 hover:text-white"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div onClick={() => setMobileOpen(true)} className="cursor-pointer">
            <EthoraEmblem size="sm" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick AI Icon in Mobile Header */}
          <button
            onClick={onOpenAIChat}
            className="px-2.5 py-1.5 rounded-xl bg-[#14111F] text-[#F4F1FF] border border-[rgba(168,85,247,0.35)] hover:border-[#A855F7] flex items-center gap-1.5 text-xs font-bold"
          >
            <div className="w-4 h-4 rounded-md overflow-hidden flex items-center justify-center">
              <img src="/ethora-logo.png" alt="ETHORA AI" className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]" />
            </div>
            <span>AI</span>
          </button>

          <img
            src={currentSession.avatar}
            alt=""
            className="w-8 h-8 rounded-lg object-cover border border-violet-500/40"
          />
        </div>
      </header>

      {/* 3. MOBILE SLIDE-IN DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[85vw] h-full z-10 shadow-2xl">
            {renderExpandedContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
