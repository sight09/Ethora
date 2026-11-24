<p align="center">
  <a href="#ethora" target="_blank" rel="noopener noreferrer">
    <img src="./public/ethora-logo.png" alt="ETHORA Logo" width="160" height="160" style="border-radius: 28px; box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);" />
  </a>
</p>

<h1 align="center">ETHORA</h1>

<p align="center">
  <strong>WHERE GAMERS BECOME LEGENDS.</strong><br>
  <em>The Premier Esports Competition, Tournament & National Ranking Ecosystem for Ethiopia and the Horn of Africa.</em>
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <img src="https://img.shields.io/badge/Payments-Telebirr%20%7C%20CBE%20Birr-22D3EE?style=for-the-badge" alt="Payments" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-interactive-ethiopian-payment-simulator">Ethiopian Checkout</a> •
  <a href="#-social-oauth--security">OAuth & Security</a> •
  <a href="#-offline-avatars--canvas-compression">Avatars & Media</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-demo-credentials--roles">Demo Accounts</a> •
  <a href="#-documentation">Docs</a>
</p>

---

## 🌟 Overview

**ETHORA** is the central digital infrastructure uniting gamers, competitive teams, and tournament organizers across Ethiopia and East Africa. Designed with an esports cyber-arena aesthetic, ETHORA provides real-time bracket orchestration, verified national rankings (Elo/MMR), squad/clan management, an integrated AI gaming assistant, and simulated Ethiopian mobile money checkout (Telebirr & CBE Birr) with stamped digital tournament passes.

Whether competing in high-stakes LAN tournaments at Millennium Hall, climbing regional ladders across Addis Ababa, Hawassa, or Dire Dawa, or organizing grassroots community cups, ETHORA powers the complete competitive journey.

---

## ⚡ Key Features

### 🏆 1. Tournament Engine & Live Brackets
- **Multi-Format Support**: Single Elimination, Double Elimination, Swiss, and Group Stage tournaments.
- **Prize Pool Tracking**: Integrated tracking for verified cash pools (ETB) and digital trophies.
- **Interactive Bracket Visualizer**: Tree progression with instant match status updates, scores, and participant seeds.
- **Organizer Score Arbitration**: Real-time score recording and dispute resolution restricted to organizer and administrator roles.

### 📱 2. Interactive Ethiopian Mobile Money Checkout
- **Telebirr & CBE Birr Simulation**: Choose between Ethio Telecom's **Telebirr** and Commercial Bank of Ethiopia's **CBE Birr**.
- **Interactive USSD PIN Prompt**: Simulates mobile screen takeover with 4-digit security PIN verification.
- **Stamped Digital Entry Pass**: Generates official `ET-TX-######` receipt stamps with bracket seed allocation and printable passes.

### 🔐 3. Simulated Social OAuth & Cryptographic Security
- **Interactive OAuth Consent Dialogs**: Support for **Discord**, **Google**, and **Twitch** with one-click gamer onboarding and automatic avatar allocation.
- **SHA-256 Password Hashing**: Client-side cryptographic hashing (`quickHash`) preventing plaintext password storage in browser memory.
- **Persistent LocalStorage State**: Full state synchronization across page reloads for user profiles, tournament registrations, bracket scores, and teams.

### 🖼️ 4. Offline Esports Avatars & Canvas Compression
- **6 Local Cyberpunk SVG Avatars**: Standalone vector presets (`Viper`, `Lion`, `Rift`, `Apex`, `Habesha`, `Zen`) requiring zero external network requests.
- **Client-Side Canvas Compression**: HTML5 `<canvas>` compression engine (`src/lib/imageUpload.ts`) automatically downscaling user-uploaded avatars and tournament banners to lightweight WebP (<50KB).

### 👑 5. National Rankings & Ethiopian Geography
- **Tier Progression**: Structured tier classification (*Rookie*, *Challenger*, *Elite*, *Master*, *Immortal*, *Legend*).
- **Geographic Anchoring**: Hierarchy matching Ethiopian administrative divisions (*Region → Zone → Woreda → Local Cyber Lounge*).
- **Cross-Game MMR**: Dynamic rating adjustments based on performance, win streaks, and tournament multipliers.

### 🤖 6. ETHORA AI Gaming Assistant
- **Context-Aware Co-Pilot**: Answers player inquiries regarding upcoming tournaments, local meta strategies, rulesets, and registration deadlines.
- **Direct Tournament Deep Links**: Immediate action links to bracket visualizers and open registrations.

---

## 💳 Interactive Ethiopian Payment Simulator

The tournament registration flow features an authentic Ethiopian mobile fintech checkout modal (`src/components/tournament/EthiopianCheckoutModal.tsx`):

```
┌────────────────────────────────────────────────────────┐
│  Tournament Registration & Checkout                   ✕│
├────────────────────────────────────────────────────────┤
│  1. Roster Info   ▶   2. Telebirr / CBE   ▶   3. Pass  │
├────────────────────────────────────────────────────────┤
│  Select Provider:                                      │
│  ┌───────────────────────┐   ┌───────────────────────┐ │
│  │ 📱 telebirr           │   │ 🏦 CBE Birr           │ │
│  │ Ethio Telecom         │   │ Commercial Bank       │ │
│  └───────────────────────┘   └───────────────────────┘ │
│                                                        │
│  Phone: +251 [ 0911234567               ]              │
│  Total: 250 ETB • Recipient: Ethora Esports Hub        │
│                                                        │
│  [  Send USSD PIN Prompt  ]                            │
│                                                        │
│  USSD Prompt: Enter 4-Digit Security PIN: [ • • • • ]  │
│  [ Confirm & Authorize ]                               │
├────────────────────────────────────────────────────────┤
│  ★ OFFICIAL STAMPED ENTRY PASS: ET-TX-849201           │
│  Allocated Bracket Seed: SEED #4                       │
└────────────────────────────────────────────────────────┘
```

---

## 🎨 Offline Avatars & Media System

All avatars and presentation banners are designed to be completely offline-resilient:
- **Local Presets**: Stored in `public/images/avatars/`:
  - `avatar-viper.svg` (Viper Duelist)
  - `avatar-lion.svg` (LionCity Ops)
  - `avatar-rift.svg` (Rift Syndicate)
  - `avatar-apex.svg` (Apex Warrior)
  - `avatar-habesha.svg` (Habesha Crest)
  - `avatar-zenmaster.svg` (Zen Precision)
- **Local Arena Backdrops**: `ethora-stadium-banner.jpg` (Millennium Hall Addis Ababa), `login-arena-clean.jpg` (Vanguard Stage), `ethora-ranking-bg.png` (Apex Grid).
- **Canvas Compression**: Custom images are scaled and exported as compressed WebP Data URLs, ensuring safe coexistence within `localStorage`.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14.2](https://nextjs.org/) (App Router) | React Server Components, client routing, and asset optimization |
| **Language** | [TypeScript 5.0](https://www.typescriptlang.org/) | Strict type checking with 0 build errors |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Cyberpunk dark theme palette (`#05030D`, `#0E101B`, `#A855F7`) |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean vector iconography |
| **Image Processing** | HTML5 Canvas API | In-browser client-side image compression (<50KB WebP) |
| **Database & ORM** | [SQLite](https://www.sqlite.org/) + [Prisma ORM](https://www.prisma.io/) | Self-contained relational database (`prisma/ethora.db`) with full type safety |
| **State & Hydration** | React Context + SQLite REST APIs | Real-time multi-device database sync across PC and mobile over LAN |

---

## 📂 Project Structure

```bash
ethora/
├── docs/                               # Comprehensive Architecture & Deployment Docs
│   ├── ARCHITECTURE.md                 # System diagrams, state sync, security model
│   ├── ETHIOPIAN_PAYMENTS.md           # Telebirr & CBE Birr simulator & API migration
│   └── PRODUCTION_DEPLOYMENT.md        # Supabase/PostgreSQL schema, S3/R2, Vercel
├── public/                             # Public static assets
│   ├── images/
│   │   ├── avatars/                    # 6 local cyberpunk esports SVG avatars
│   │   ├── ethora-stadium-banner.jpg   # Millennium Hall tournament backdrop
│   │   └── login-arena-clean.jpg       # Vanguard arena background
│   └── ethora-logo.png                 # Official brand logo
├── src/
│   ├── app/                            # App Router routes
│   │   ├── admin/                      # Administration console & dispute moderation
│   │   ├── assistant/                  # AI Assistant portal
│   │   ├── auth/                       # Sign In, Sign Up with simulated OAuth
│   │   ├── dashboard/                  # Gamer home dashboard
│   │   ├── gamers/                     # Player directory & profiles
│   │   ├── organizer/                  # 9-Step tournament creator & organizer hub
│   │   ├── profile/                    # Profile settings & avatar uploader
│   │   ├── rankings/                   # National & regional leaderboards
│   │   ├── tournaments/                # Tournament listings, checkout modal & brackets
│   │   └── page.tsx                    # Cyber arena hero landing page
│   ├── components/                     # Reusable UI components
│   │   ├── auth/                       # OAuthModal, InteractiveAuthMascot
│   │   ├── layout/                     # Sidebar, Navbar, MobileHeader
│   │   └── tournament/                 # EthiopianCheckoutModal
│   ├── context/                        # EthoraContext (State, quickHash, local storage)
│   ├── data/                           # Mock datasets, geography hierarchy, supported games
│   └── lib/                            # Image compression utility (imageUpload.ts), utils
└── tailwind.config.ts                  # Cyber color palette & glowing drop-shadows
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher (tested on Node `v24.x`)
- **npm**, **yarn**, or **pnpm**

### 2. Installation
```bash
git clone https://github.com/your-username/ethora.git
cd ethora
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Managing the SQLite Database
- **Open Visual Database Studio**:
  ```bash
  npx prisma studio
  ```
  Opens an interactive GUI in your browser at `http://localhost:5555` to view, query, and edit all athletes, tournaments, registrations, and teams!
- **Reset or Re-Seed Database**:
  ```bash
  node prisma/seed.js
  ```
- **Direct Database File**:
  Stored locally at `prisma/ethora.db` (can be opened with [DB Browser for SQLite](https://sqlitebrowser.org/)).

---

## 👥 Demo Credentials & Roles

The platform includes built-in role personas accessible from the bottom role switcher on the sidebar:

| Role | Username / Tag | Email | Access Scope |
| :--- | :--- | :--- | :--- |
| **Gamer** | `ViperX` | `yared.viper@ethora.et` | Join tournaments, Ethiopian checkout, track MMR, update avatar |
| **Organizer** | `LionCityOps` | `organizer@lioncity.et` | Create tournaments (9-step wizard), submit bracket scores |
| **Admin** | `RiftAdmin` | `management@greatriftesports.com` | Platform oversight, dispute moderation, manage sanctioning |
| **Organization** | `GreatRift` | `director@greatriftesports.com` | Org roster management and contract tracking |

> *Tip: Social login with Discord, Google, or Twitch works instantly with 1-click simulation.*

---

## 📚 Documentation

For in-depth guides and deployment references, see the [`docs/`](./docs) directory:
- 📖 [**System Architecture & Data Flow**](./docs/ARCHITECTURE.md)
- 💳 [**Ethiopian Payment Gateways & USSD Integration**](./docs/ETHIOPIAN_PAYMENTS.md)
- 🚢 [**Production Cloud Deployment & Database Schema**](./docs/PRODUCTION_DEPLOYMENT.md)

---

## 📄 License

Distributed under the **MIT License**.

<p align="center">
  <sub>Built with passion for the Ethiopian & African esports gaming community.</sub><br>
  <sub><strong>ETHORA</strong> — Where Gamers Become Legends.</sub>
</p>
