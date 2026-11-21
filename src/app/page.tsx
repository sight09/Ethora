"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Trophy, Globe, ChevronDown, Rocket, Crown, Play, Search, Menu, X } from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import "./landing.css";

interface Champion {
  rank: string;
  name: string;
  team: string;
  points: string;
  color: "gold" | "silver" | "bronze";
  avatar: string;
  flag: string;
}

const GAMES_LIST = [
  { name: "Free Fire", icon: "⚡" },
  { name: "PUBG Mobile", icon: "▣" },
  { name: "Valorant", icon: "✦" },
];

const DEFAULT_LEADERBOARDS: Record<
  string,
  { players: string; events: string; champions: Champion[] }
> = {
  "Free Fire": {
    players: "12.5K",
    events: "03",
    champions: [
      {
        rank: "01",
        name: "ShadowKing",
        team: "ADDIS WOLVES",
        points: "12,450",
        color: "gold",
        avatar: "/images/avatar-shadowking.png",
        flag: "🇪🇹",
      },
      {
        rank: "02",
        name: "ZenMaster",
        team: "JIMMA TITANS",
        points: "11,230",
        color: "silver",
        avatar: "/images/avatar-zenmaster.png",
        flag: "🇪🇹",
      },
      {
        rank: "03",
        name: "GameRift",
        team: "RIFT SQUAD",
        points: "10,980",
        color: "bronze",
        avatar: "/images/avatar-gamerift.png",
        flag: "🇪🇹",
      },
    ],
  },
  "PUBG Mobile": {
    players: "18.9K",
    events: "05",
    champions: [
      {
        rank: "01",
        name: "RedGhost",
        team: "OROMIA RED STRIKERS",
        points: "14,890",
        color: "gold",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&h=300&auto=format&fit=crop",
        flag: "🇪🇹",
      },
      {
        rank: "02",
        name: "ViperX",
        team: "BOLE LIONS",
        points: "13,100",
        color: "silver",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&h=300&auto=format&fit=crop",
        flag: "🇪🇹",
      },
      {
        rank: "03",
        name: "Bekila",
        team: "HAWASSA DYNASTY",
        points: "11,850",
        color: "bronze",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop",
        flag: "🇪🇹",
      },
    ],
  },
  "Valorant": {
    players: "15.2K",
    events: "04",
    champions: [
      {
        rank: "01",
        name: "ViperX",
        team: "APEX LEGION",
        points: "15,200",
        color: "gold",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&h=300&auto=format&fit=crop",
        flag: "🇪🇹",
      },
      {
        rank: "02",
        name: "PhantomQueen",
        team: "RIFT VALLEY VALKYRIES",
        points: "13,920",
        color: "silver",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=300&auto=format&fit=crop",
        flag: "🇪🇹",
      },
      {
        rank: "03",
        name: "InvokerGod",
        team: "TANA TITANS",
        points: "12,410",
        color: "bronze",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop",
        flag: "🇪🇹",
      },
    ],
  },
};

function CrownIcon({ color }: { color: "gold" | "silver" | "bronze" }) {
  if (color === "gold") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="16" fill="none">
        <path
          d="M2 19h20v2H2v-2zm1-5l4.5 2.5L12 7l4.5 9.5L21 14l-2 6H5l-2-6z"
          fill="url(#gold-crown-grad)"
        />
        <circle cx="3" cy="13" r="1.5" fill="#FDE047" />
        <circle cx="12" cy="6" r="1.8" fill="#FEF08A" />
        <circle cx="21" cy="13" r="1.5" fill="#FDE047" />
        <defs>
          <linearGradient id="gold-crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (color === "silver") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="15" fill="none">
        <path
          d="M2 19h20v2H2v-2zm1-5l4.5 2.5L12 7l4.5 9.5L21 14l-2 6H5l-2-6z"
          fill="url(#silver-crown-grad)"
        />
        <circle cx="3" cy="13" r="1.5" fill="#F8FAFC" />
        <circle cx="12" cy="6" r="1.8" fill="#FFFFFF" />
        <circle cx="21" cy="13" r="1.5" fill="#F8FAFC" />
        <defs>
          <linearGradient id="silver-crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="15" fill="none">
      <path
        d="M2 19h20v2H2v-2zm1-5l4.5 2.5L12 7l4.5 9.5L21 14l-2 6H5l-2-6z"
        fill="url(#bronze-crown-grad)"
      />
      <circle cx="3" cy="13" r="1.5" fill="#FDBA74" />
      <circle cx="12" cy="6" r="1.8" fill="#FED7AA" />
      <circle cx="21" cy="13" r="1.5" fill="#FDBA74" />
      <defs>
        <linearGradient id="bronze-crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const features = [
  {
    icon: "♛",
    title: "Epic tournaments",
    text: "Compete in exciting tournaments, challenge other squads, and fight for the top spot.",
  },
  {
    icon: "↗",
    title: "Live rankings",
    text: "Follow player progress, track your points, and see who is rising through the ranks.",
  },
  {
    icon: "♧",
    title: "Gaming community",
    text: "Connect with players, build your squad, and grow Ethiopia's esports community.",
  },
  {
    icon: "⬡",
    title: "Fair competition",
    text: "A trusted competitive space built around clear results and player achievement.",
  },
];

export default function EthoraLandingPage() {
  const { gamers } = useEthora();

  const router = useRouter();
  const [isExitingToAuth, setIsExitingToAuth] = useState(false);

  // Auto-sliding game selector index
  const [gameIndex, setGameIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigateToAuth = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExitingToAuth(true);
    setTimeout(() => {
      router.push(path);
    }, 110);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-switch games every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setGameIndex((prev) => (prev + 1) % GAMES_LIST.length);
        setAnimating(false);
      }, 220);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSelectGame = (idx: number) => {
    if (idx === gameIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setGameIndex(idx);
      setAnimating(false);
    }, 180);
  };

  const activeGame = GAMES_LIST[gameIndex];
  const activeBoard = DEFAULT_LEADERBOARDS[activeGame.name] || DEFAULT_LEADERBOARDS["Free Fire"];

  // Enrich with live mock data from context if available
  const enrichedChampions = activeBoard.champions.map((champ) => {
    const liveGamer = gamers.find(
      (g) => g.gamerTag.toLowerCase() === champ.name.toLowerCase()
    );
    if (liveGamer) {
      return {
        ...champ,
        avatar: liveGamer.avatar || champ.avatar,
        team: liveGamer.team?.name ? liveGamer.team.name.toUpperCase() : champ.team,
      };
    }
    return champ;
  });

  return (
    <main className={`ethora-home ${isExitingToAuth ? "page-transition-exit" : ""}`}>
      {/* High-speed Esports Portal Loading Beam */}
      {isExitingToAuth && <div className="portal-nav-bar" />}

      {/* 1. TOP HEADER (CURVED CYBER HUD, TRANSLUCENT & STICKY ON SCROLL) */}
      <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
        {/* Esports Smooth Curved HUD Neon Border */}
        <div className="header-hud-border-wrap" aria-hidden="true">
          <svg className="header-hud-svg" viewBox="0 0 1000 62" preserveAspectRatio="none">
            <defs>
              <linearGradient id="header-neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
                <stop offset="12%" stopColor="#A855F7" stopOpacity="1" />
                <stop offset="50%" stopColor="#9333EA" stopOpacity="1" />
                <stop offset="88%" stopColor="#A855F7" stopOpacity="1" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.85" />
              </linearGradient>
              <filter id="neon-glow" x="-10%" y="-30%" width="120%" height="160%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 0,0 L 18,38 C 22,48 32,60 50,60 L 950,60 C 968,60 978,48 982,38 L 1000,0"
              fill="none"
              stroke="url(#header-neon-grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neon-glow)"
            />
          </svg>
        </div>

        {/* Brand: Logo + Name */}
        <Link className="brand" href="/" aria-label="ETHORA home">
          <Image
            src="/ethora-logo.png"
            alt="ETHORA Logo"
            width={36}
            height={36}
            className="brand-logo-img"
            priority
          />
          <span className="brand-name">ETHORA</span>
        </Link>

        {/* Center Navigation Links (Matching Reference Image) */}
        <nav className="header-nav" aria-label="Primary navigation">
          <Link href="#home" className="header-nav-link active">Home</Link>
          <Link href="/tournaments" className="header-nav-link">Tournaments</Link>
          <Link href="/rankings" className="header-nav-link">Rankings</Link>
          <Link href="/gamers" className="header-nav-link">Community</Link>
          <Link href="/assistant" className="header-nav-link">Support</Link>
        </nav>

        {/* Right Actions: Search + Language + Get Started */}
        <div className="header-actions">
          <Link href="/tournaments" className="header-search-btn" aria-label="Search tournaments and rankings">
            <Search className="w-3.5 h-3.5 text-gray-300" />
          </Link>

          <div className="lang-selector">
            <Globe className="w-3.5 h-3.5 text-gray-300" />
            <span className="lang-text">EN</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <Link
            className="btn-get-started cursor-pointer"
            href="/auth/signin"
            onClick={handleNavigateToAuth("/auth/signin")}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Get Started</span>
          </Link>

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
            <div className="mobile-nav-links">
              <Link
                href="#home"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🏠</span> Home
              </Link>
              <Link
                href="/tournaments"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>⚔️</span> Tournaments
              </Link>
              <Link
                href="/rankings"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🏆</span> Rankings
              </Link>
              <Link
                href="/gamers"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>👥</span> Community
              </Link>
              <Link
                href="/assistant"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>⚡</span> AI Support
              </Link>
            </div>

            <div className="mobile-nav-actions">
              <Link
                href="/auth/signin"
                className="mobile-btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Rocket className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
              <Link
                href="/auth/signin"
                className="mobile-btn-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-art" />
        <div className="hero-overlay" />
        <div className="hero-content">
          {/* 1. Ethiopia's Premier Esports Platform Badge */}
          <div className="hero-badge">
            <Crown className="w-3.5 h-3.5 text-[#F5B82E] fill-[#F5B82E]" />
            <span>Ethiopia&apos;s Premier Esports Platform</span>
          </div>

          {/* 2. Stylized 3D Metallic Chrome ETHORA Wordmark with Glowing Yellow Star */}
          <div className="hero-wordmark-wrap">
            <img
              src="/images/ethora-hero-wordmark.png"
              alt="ETHORA"
              className="hero-wordmark-img"
            />
          </div>

          {/* 3. Slanted/Italic Bold Tagline */}
          <h2 className="hero-tagline">
            Where Gamers Become Legend
          </h2>

          {/* 4. Subtitle Description */}
          <p className="hero-subtitle">
            Compete. Climb. Be the best. Join ETHORA and show your skills in thrilling tournaments and rankings!
          </p>

          {/* 5. Hero Action Buttons */}
          <div className="hero-buttons">
            <Link className="btn-primary" href="/rankings">
              <span className="btn-trophy-emoji">🏆</span>
              <span>EXPLORE RANKINGS</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link className="btn-secondary" href="/tournaments">
              <span className="play-icon-wrap">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </span>
              <span>WATCH TRAILER</span>
            </Link>
          </div>

          {/* 6. Active Gamers Social Proof */}
          <div className="community-proof">
            <div className="avatar-stack">
              <img
                src="/images/ethora-mascot.png"
                alt="Pro Gamer"
                className="w-7 h-7 rounded-full object-cover border border-purple-400"
              />
              <img
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop"
                alt="Pro Gamer"
                className="w-7 h-7 rounded-full object-cover border border-purple-400"
              />
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="Pro Gamer"
                className="w-7 h-7 rounded-full object-cover border border-purple-400"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=100&auto=format&fit=crop"
                alt="Pro Gamer"
                className="w-7 h-7 rounded-full object-cover border border-purple-400"
              />
            </div>
            <div>
              <strong>+25K Active Gamers</strong>
              <small>One community. One arena.</small>
            </div>
          </div>
        </div>
        <div className="hero-vertical">
          ETHORA <i /> COMPETE WITHOUT LIMITS
        </div>
        <div className="hero-scroll">
          <span /> SCROLL TO EXPLORE
        </div>
      </section>

      {/* 3. QUICK BOARD SECTION (CURRENT STANDOUTS AUTO-SLIDER) */}
      <section
        className="quick-board"
        aria-label="Featured leaderboard"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left: Top Players intro */}
        <div className="board-intro">
          <div className="board-intro-header">
            <div className="crown-icon-wrap">
              <span>♛</span>
            </div>
            <div className="board-intro-text">
              <h2>Top Players</h2>
              <p>Current Leaderboard</p>
            </div>
          </div>
          <Link className="btn-view-rankings" href="/rankings">
            View Full Rankings <span>→</span>
          </Link>
        </div>

        {/* Middle: 3 Champions with Crown above Avatar */}
        <div className={`champion-list ${animating ? "animating" : ""}`}>
          {enrichedChampions.map((player) => (
            <div className="champion-card" key={player.rank + player.name}>
              <div className="champion-avatar-box">
                <div className={`crown-badge ${player.color}`}>
                  <CrownIcon color={player.color} />
                </div>
                <div className="player-avatar-ring rounded-full">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    width={44}
                    height={44}
                    style={{ aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "50%" }}
                    className="player-avatar-img rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/ethora-mascot.png";
                    }}
                  />
                </div>
              </div>
              <div className="champion-meta">
                <div className="player-name-row">
                  <span className="player-name">{player.name}</span>
                  <span className="player-flag-badge">{player.flag || "🇪🇹"}</span>
                </div>
                <div className="player-points-row">
                  <span className={`player-points-val ${player.color}`}>{player.points}</span>
                  <span className={`player-points-tag ${player.color}`}>PTS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Game switcher & live stats */}
        <div className="board-side">
          <div className="game-switch">
            {GAMES_LIST.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => handleSelectGame(idx)}
                className={gameIndex === idx ? "chosen" : ""}
                type="button"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
          <div className="board-stats">
            <div className="stat-pill">
              <Users className="stat-icon" />
              <div className="stat-meta">
                <small>Total Players</small>
                <strong>{activeBoard.players}</strong>
              </div>
            </div>
            <div className="stat-pill">
              <Trophy className="stat-icon" />
              <div className="stat-meta">
                <small>Ongoing Tournaments</small>
                <strong>{activeBoard.events}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Live Auto-slide progress bar */}
        <div className="board-progress-track">
          <div
            key={gameIndex}
            className={`board-progress-fill ${isPaused ? "paused" : ""}`}
          />
        </div>
      </section>

      {/* 4. FEATURES SECTION (MOVING SLOWLY FROM LEFT TO RIGHT) */}
      <section className="features-section" id="community">
        <div className="section-title">
          <p className="section-eyebrow">
            <span>✦</span> MORE THAN A GAME — A COMMUNITY
          </p>
          <h2>
            WHY CHOOSE <span>ETHORA?</span>
          </h2>
          <p>Everything you need to compete, connect, and make your mark.</p>
        </div>

        {/* Continuous Auto-Sliding Feature Carousel (Left to Right) */}
        <div className="features-slider-wrapper">
          <div className="features-track">
            {[...features, ...features].map((feature, index) => (
              <article
                className="feature-card feature-card-slide"
                key={`${feature.title}-${index}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <span className="feature-index">0{(index % 4) + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. JOIN SECTION (HOODED MASCOT CTA BANNER) */}
      <section className="join-section">
        <div className="join-copy">
          <p className="section-eyebrow">YOUR LEGEND STARTS HERE</p>
          <h2>
            READY TO <span>RISE?</span>
          </h2>
          <p>Create your gamer profile, find your competition, and start your journey to the top.</p>
          <Link
            className="btn-primary cursor-pointer"
            href="/auth/signup"
            onClick={handleNavigateToAuth("/auth/signup")}
          >
            Join ETHORA <span>↗</span>
          </Link>
        </div>
        <div className="mascot-frame">
          <Image
            src="/images/ethora-mascot.png"
            alt="ETHORA hooded gamer mascot"
            fill
            sizes="(max-width: 700px) 80vw, 420px"
            className="mascot-image"
          />
          <div className="mascot-glow" />
        </div>
      </section>

      {/* 6. SITE FOOTER (MATCHING REFERENCE IMAGE) */}
      <footer className="site-footer" id="support">
        {/* Left: Brand + Slogan */}
        <div className="footer-left">
          <Link className="brand" href="/">
            <Image
              src="/ethora-logo.png"
              alt="ETHORA Logo"
              width={38}
              height={38}
              className="brand-logo-img"
            />
            <span className="brand-name">ETHORA</span>
          </Link>
          <span className="footer-v-divider" />
          <span className="footer-slogan">Where Gamers Become Legend</span>
        </div>

        {/* Center: Legal & Support Links */}
        <div className="footer-nav">
          <Link href="/about" className="footer-link">About</Link>
          <span className="footer-sep">|</span>
          <Link href="/terms" className="footer-link">Terms</Link>
          <span className="footer-sep">|</span>
          <Link href="/privacy" className="footer-link">Privacy</Link>
          <span className="footer-sep">|</span>
          <Link href="/assistant" className="footer-link">Support</Link>
        </div>

        {/* Right: Social Gaming Icons (Discord, YouTube, Telegram, X, Gamepad) */}
        <div className="footer-socials">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="social-icon-btn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="social-icon-btn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="social-icon-btn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
            </svg>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="social-icon-btn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="/tournaments"
            aria-label="Games"
            className="social-icon-btn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}