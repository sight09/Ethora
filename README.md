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
  <img src="https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20Ready-A855F7?style=for-the-badge" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-architecture--tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Quick Start</a> •
  <a href="#-demo-credentials--roles">Demo Accounts</a> •
  <a href="#-supported-esports-titles">Supported Games</a>
</p>

---

## 🌟 Overview

**ETHORA** is the central digital infrastructure uniting gamers, teams, and tournament organizers across Ethiopia and East Africa. Designed with an esports cyber-arena aesthetic, ETHORA provides real-time bracket orchestration, verified national rankings (Elo/MMR), squad/clan management, and an integrated AI gaming assistant tailored for the local competitive scene.

Whether competing in high-stakes LAN tournaments at Millennium Hall, climbing regional ladders across Addis Ababa, Hawassa, or Dire Dawa, or organizing grassroots community cups, ETHORA powers the complete competitive journey.

---

## ⚡ Key Features

### 🏆 1. Tournament Engine & Brackets
- **Multi-Format Support**: Single Elimination, Double Elimination, Swiss, and Group Stage tournaments.
- **Prize Pool Tracking**: Integrated tracking for verified cash pools (ETB) and digital trophies.
- **Live Bracket Visualizer**: Interactive tree progression with instant match status updates, scores, and participant seeds.

### 👑 2. National Rankings & Leaderboards
- **Tier Progression**: Structured tier classification (*Rookie*, *Challenger*, *Elite*, *Master*, *Immortal*, *Legend*).
- **Cross-Game MMR**: Dynamic rating adjustments based on performance, win streaks, and tournament multipliers.
- **Regional Progression**: City and regional leaderboards showcasing the top competitors from Addis Ababa, Oromia, Amhara, Tigray, Sidama, and beyond.

### 🛡️ 3. Gamer & Team Identity
- **Verified Gamer Profiles**: Match history, head-to-head records, win-rate metrics, preferred agents/weapons, and hardware specs.
- **Squad Rosters**: Team creation, roster management, squad captain roles, and organization affiliation.

### 🏛️ 4. Organizer Suite
- **Tournament Creation Wizard**: Step-by-step tournament builder with custom seeding, rulesets, entry criteria, and venue designation.
- **Match Arbitration**: Score submissions, dispute resolution, and match verification.

### 🤖 5. ETHORA AI Gaming Assistant
- **Context-Aware Co-Pilot**: Answers player inquiries regarding upcoming verified tournaments, meta builds, and regional rules in natural language.
- **Tournament Discovery**: Direct deep links to open registrations and bracket details.

### 🎨 6. High-Performance Cyber Aesthetic
- **Esports Arena Dark Theme**: Custom deep-violet palette (`#05030D`, `#0A0A12`, `#14111F`, `#A855F7`).
- **Cinematic Transitions**: Ultra-fast GPU-accelerated entrance choreography, curved SVG neon HUD navigation, and interactive 3D hero podiums.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Server-side rendering, routing, route handlers, and asset optimization |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict end-to-end type safety |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + Custom CSS | Responsive layout engine with custom neon cyber keyframe animations |
| **Icons & Assets** | [Lucide React](https://lucide.dev/) | Clean, consistent vector iconography |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Victory celebrations and interactive trophy interactions |
| **State** | React Context (`EthoraContext`) | Synchronized user sessions, role transitions, tournament states, and mock databases |

---

## 📂 Project Structure

```bash
ethora/
├── public/                     # Static assets (logos, avatars, banners, favicons)
│   ├── images/                 # High-resolution gaming artwork and icons
│   ├── ethora-logo.png         # Official ETHORA emblem
│   └── favicon.ico             # Brand favicon
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Administrator dashboard & moderation
│   │   ├── assistant/          # Dedicated AI Assistant page
│   │   ├── auth/               # Sign In, Sign Up, and Password Reset
│   │   ├── dashboard/          # Gamer home dashboard
│   │   ├── gamers/             # Player directory & profiles
│   │   ├── organizations/      # Esports clubs & organizations
│   │   ├── organizer/          # Tournament organizer hub & builder
│   │   ├── rankings/           # National & regional leaderboards
│   │   ├── teams/              # Team rosters & squad directory
│   │   ├── tournaments/        # Tournament listings & bracket views
│   │   ├── globals.css         # Global styles & keyframe choreographies
│   │   ├── landing.css         # Landing page cyber arena styles
│   │   └── page.tsx            # ETHORA Hero Landing Page
│   ├── components/             # Reusable UI components
│   │   ├── ai/                 # Floating AI chat & assistant interfaces
│   │   ├── auth/               # Interactive auth mascot & cards
│   │   ├── brand/              # ETHORA brand SVG components
│   │   ├── dashboard/          # Gamer stats, match widgets & header
│   │   ├── landing/            # Typing animations, hero arena, leaderboards
│   │   └── layout/             # Sidebar, Navbar, and Footer
│   ├── context/                # Global state providers (EthoraContext)
│   ├── data/                   # Game profiles, regional data, and mock datasets
│   └── lib/                    # Shared utilities and helpers
├── tailwind.config.ts          # Custom cyber color definitions and extensions
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # Project dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm**, **yarn**, or **pnpm**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ethora.git
cd ethora
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🎮 Supported Esports Titles

ETHORA natively tracks stats, ranks, and brackets for major competitive titles:

| Game | Genre | Competitive Format | Active Players (ETH) |
| :--- | :--- | :--- | :--- |
| **Valorant** | Tactical FPS | 5v5 Bomb Defusal | 18,400+ |
| **EA SPORTS FC 24** | Sports / Football | 1v1 Competitive | 24,000+ |
| **PUBG Mobile** | Battle Royale | 4-Man Squads | 32,500+ |
| **Free Fire** | Battle Royale | Squad Battle Royale | 28,000+ |
| **Apex Legends** | Battle Royale | 3-Man Squads | 8,200+ |
| **Tekken 8** | Fighting | 1v1 Double Elimination | 5,100+ |

---

## 👥 Demo Credentials & Roles

The platform includes built-in mock accounts to test different roles:

| Role | Username / Tag | Email | Access Scope |
| :--- | :--- | :--- | :--- |
| **Gamer** | `ViperX` | `yared.viper@ethora.et` | Join tournaments, track MMR, view matches |
| **Organizer** | `LionCityOps` | `organizer@lioncity.et` | Create tournaments, seed brackets, manage venues |
| **Admin** | `RiftAdmin` | `management@greatriftesports.com` | Platform oversight, dispute moderation |
| **Super Admin**| `ETHORA_ROOT` | `security@ethora.et` | Full system control and security configurations |

> *Tip: Any password works with the built-in demo credentials during local development.*

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server with hot-reload.
- `npm run build`: Compiles TypeScript, bundles assets, and optimizes for production.
- `npm run start`: Serves the optimized production build.
- `npm run lint`: Analyzes codebase with ESLint rules.

---

## 🤝 Contributing

Contributions are welcomed to help advance the African esports ecosystem:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/EpicFeature`)
3. Commit your Changes (`git commit -m 'feat: Add EpicFeature'`)
4. Push to the Branch (`git push origin feature/EpicFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<p align="center">
  <sub>Built with passion for the Ethiopian & African esports gaming community.</sub><br>
  <sub><strong>ETHORA</strong> — Where Gamers Become Legends.</sub>
</p>
