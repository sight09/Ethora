"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  UserCheck,
  CheckCircle2,
  Calendar,
  LogOut,
  Settings,
  Flame,
  LayoutDashboard,
  PlusCircle,
  BarChart3,
} from "lucide-react";
import EthoraLogo from "@/components/brand/EthoraLogo";
import { useEthora, RoleType } from "@/context/EthoraContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const {
    currentSession,
    setRole,
    currentUser,
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
  } = useEthora();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Determine top-level links depending on role
  const isOrganizer = currentSession.role === "organizer";
  const isAdmin = currentSession.role === "admin";
  const isGuest = currentSession.role === "guest";

  interface NavLinkItem {
    label: string;
    href: string;
    icon: any;
    badge?: string;
    highlight?: boolean;
  }

  const publicLinks: NavLinkItem[] = [
    { label: "Tournaments", href: "/tournaments", icon: Swords },
    { label: "Rankings", href: "/rankings", icon: Trophy },
    { label: "Gamers", href: "/gamers", icon: Users },
    { label: "Teams", href: "/teams", icon: Layers },
    { label: "Ethora AI", href: "/assistant", icon: Sparkles, badge: "AI" },
  ];

  const gamerLinks: NavLinkItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Tournaments", href: "/tournaments", icon: Swords },
    { label: "Rankings", href: "/rankings", icon: Trophy },
    { label: "My Profile", href: "/profile", icon: Users },
    { label: "Ethora AI", href: "/assistant", icon: Sparkles, badge: "AI" },
  ];

  const organizerLinks: NavLinkItem[] = [
    { label: "Organizer Hub", href: "/organizer", icon: LayoutDashboard },
    { label: "Create Tournament", href: "/organizer/create", icon: PlusCircle, highlight: true },
    { label: "Manage Tournaments", href: "/tournaments", icon: Swords },
    { label: "Rankings", href: "/rankings", icon: Trophy },
    { label: "Ethora AI", href: "/assistant", icon: Sparkles },
  ];

  const adminLinks: NavLinkItem[] = [
    { label: "Admin Console", href: "/admin", icon: ShieldAlert },
    { label: "Tournaments", href: "/tournaments", icon: Swords },
    { label: "Rankings", href: "/rankings", icon: Trophy },
    { label: "Gamers", href: "/gamers", icon: Users },
  ];

  let activeNavLinks = publicLinks;
  if (currentSession.role === "gamer") activeNavLinks = gamerLinks;
  else if (isOrganizer) activeNavLinks = organizerLinks;
  else if (isAdmin) activeNavLinks = adminLinks;

  const rolesList: { role: RoleType; title: string; subtitle: string; icon: any }[] = [
    { role: "gamer", title: "Yared 'ViperX'", subtitle: "Rank #1 Pro Gamer", icon: Flame },
    { role: "organizer", title: "Lion City Esports", subtitle: "Tournament Organizer", icon: Swords },
    { role: "organization", title: "Great Rift Syndicate", subtitle: "Esports Org Director", icon: Layers },
    { role: "admin", title: "ETHORA Ops Lead", subtitle: "Platform Administrator", icon: ShieldAlert },
    { role: "guest", title: "Guest Visitor", subtitle: "Public Landing View", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#232A42] bg-[#08090E]/85 backdrop-blur-md">
      {/* Subtle top brand glow strip */}
      <div className="h-[2px] w-full ethiopia-flag-stripe opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <EthoraLogo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {activeNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? "text-white bg-violet-500/10 border border-violet-500/30 text-shadow"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  } ${link.highlight ? "bg-violet-600 hover:bg-violet-500 text-white shadow-glow-violet" : ""}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-violet-400" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Role Simulator Switcher + Notifications + User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Interactive Role Simulator Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleMenuOpen(!roleMenuOpen);
                setNotifOpen(false);
                setUserDropdownOpen(false);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#3A456B] bg-[#141826] hover:bg-[#1C2237] transition flex items-center gap-2 text-xs font-semibold text-slate-200"
              title="Switch role to experience ETHORA from another perspective"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline text-slate-400 uppercase tracking-wider text-[10px]">Role:</span>
              <span className="font-mono text-violet-300 capitalize">{currentSession.role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#232A42] bg-[#0E111A] shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-[#232A42] mb-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Active Persona & Role
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Explore role-based dashboards, features & permissions
                  </p>
                </div>
                <div className="space-y-1">
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
                        className={`w-full text-left p-2.5 rounded-lg flex items-center gap-3 transition ${
                          isSelected
                            ? "bg-violet-600/20 border border-violet-500/40 text-white"
                            : "hover:bg-[#141826] text-slate-300"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-violet-600 text-white" : "bg-[#1C2237] text-slate-400"
                          }`}
                        >
                          <RoleIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate">{item.title}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Drawer */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setRoleMenuOpen(false);
                setUserDropdownOpen(false);
              }}
              className="p-2 rounded-lg border border-[#232A42] bg-[#0E111A] hover:bg-[#141826] text-slate-300 hover:text-white relative transition"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-[10px] font-bold text-white flex items-center justify-center shadow-glow-violet">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[#232A42] bg-[#0E111A] shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#232A42] mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/30">
                        {unreadNotificationCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotificationCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-violet-400 hover:text-violet-300 transition"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2.5 rounded-lg border transition ${
                        notif.read
                          ? "bg-[#141826]/40 border-[#232A42]/50 text-slate-400"
                          : "bg-violet-950/20 border-violet-500/30 text-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-white">{notif.title}</span>
                        <span className="text-[10px] text-slate-500 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile / Auth Button */}
          {isGuest ? (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-violet-600 hover:bg-violet-500 text-white shadow-glow-violet transition"
              >
                Join ETHORA
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setRoleMenuOpen(false);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-lg border border-[#232A42] bg-[#0E111A] hover:bg-[#141826] transition"
              >
                <img
                  src={currentSession.avatar}
                  alt={currentSession.tag}
                  className="w-7 h-7 rounded-md object-cover border border-violet-500/40"
                />
                <span className="hidden md:inline text-xs font-bold text-white max-w-[100px] truncate">
                  {currentSession.tag}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#232A42] bg-[#0E111A] shadow-2xl p-2 z-50">
                  <div className="p-3 border-b border-[#232A42] mb-1">
                    <p className="text-xs font-bold text-white truncate">{currentSession.name}</p>
                    <p className="text-[11px] text-violet-400 font-mono truncate">{currentSession.tag}</p>
                    {currentUser && (
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        ID: <span className="font-mono text-cyan-300">{currentUser.ethoraId}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={isOrganizer ? "/organizer" : "/dashboard"}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#141826] hover:text-white transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-violet-400" />
                      <span>{isOrganizer ? "Organizer Overview" : "Gamer Dashboard"}</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#141826] hover:text-white transition"
                    >
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>View Public Profile</span>
                    </Link>

                    <Link
                      href="/profile/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#141826] hover:text-white transition"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Account Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setRole("guest");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Log Out (Switch to Guest)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#232A42] bg-[#0E111A] text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#232A42] bg-[#0B0E17] px-4 py-4 space-y-3">
          <div className="space-y-1">
            {activeNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-[#141826] hover:text-white transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-violet-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-violet-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#232A42]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Role Switcher</p>
            <div className="grid grid-cols-2 gap-2">
              {rolesList.map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    setRole(item.role);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs font-semibold text-left transition ${
                    currentSession.role === item.role
                      ? "bg-violet-600 text-white"
                      : "bg-[#141826] text-slate-300 hover:bg-[#1C2237]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

