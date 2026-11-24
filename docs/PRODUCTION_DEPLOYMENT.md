# ETHORA Production Deployment & Cloud Migration Guide

## 🚀 Overview
ETHORA is built on Next.js 14 (App Router) with full TypeScript type safety. It currently runs in a self-contained local simulation mode using `localStorage` and client-side canvas compression.

This guide provides the exact steps to migrate the platform to a scalable production cloud architecture.

---

## 🏗️ Production Target Architecture

| Component | Technology | Recommended Provider |
| :--- | :--- | :--- |
| **Frontend & SSR** | Next.js 14 App Router | [Vercel](https://vercel.com) / [Railway](https://railway.app) / Docker |
| **Relational Database** | PostgreSQL 15+ | [Supabase](https://supabase.com) / [Neon](https://neon.tech) / AWS RDS |
| **Authentication** | OAuth 2.0 + JWT + MFA | Supabase Auth / NextAuth.js (Auth.js) |
| **Object Storage** | S3-Compatible Bucket | [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) / AWS S3 |
| **Payment Gateway** | Telebirr, CBE Birr, Cards | [Chapa](https://chapa.co) / Telebirr Direct API |
| **AI Assistant** | LLM Streaming API | Google Gemini 1.5 Flash / Pro API |

---

## 🗄️ Database Schema (PostgreSQL / Supabase)

Run the following SQL migration in your database console:

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    gamer_tag TEXT UNIQUE NOT NULL,
    real_name TEXT NOT NULL,
    ethora_id TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    banner_url TEXT,
    bio TEXT,
    role TEXT NOT NULL DEFAULT 'gamer' CHECK (role IN ('gamer', 'organizer', 'admin', 'organization')),
    region_id TEXT NOT NULL,
    zone_id TEXT NOT NULL,
    woreda_id TEXT NOT NULL,
    community_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tournaments Table
CREATE TABLE public.tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    game_id TEXT NOT NULL,
    game_name TEXT NOT NULL,
    banner_url TEXT,
    organizer_id UUID REFERENCES public.profiles(id),
    prize_pool_etb NUMERIC NOT NULL DEFAULT 0,
    entry_fee_etb NUMERIC NOT NULL DEFAULT 0,
    format TEXT NOT NULL CHECK (format IN ('Single Elimination', 'Double Elimination', 'Round Robin', 'Group Stage')),
    status TEXT NOT NULL DEFAULT 'registration_open' CHECK (status IN ('registration_open', 'live', 'upcoming', 'completed')),
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    registration_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    venue_type TEXT NOT NULL,
    venue_name TEXT,
    max_participants INTEGER NOT NULL DEFAULT 16,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tournament Registrations & Payments
CREATE TABLE public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
    gamer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    in_game_name TEXT NOT NULL,
    rank_tier TEXT DEFAULT 'Diamond',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'waitlisted')),
    payment_status TEXT NOT NULL DEFAULT 'free' CHECK (payment_status IN ('free', 'pending', 'paid', 'refunded')),
    payment_method TEXT,
    transaction_ref TEXT UNIQUE,
    amount_etb NUMERIC NOT NULL DEFAULT 0,
    seed_number INTEGER,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Matches & Bracket Results
CREATE TABLE public.bracket_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
    round_number INTEGER NOT NULL,
    match_number INTEGER NOT NULL,
    participant1_id UUID REFERENCES public.profiles(id),
    participant2_id UUID REFERENCES public.profiles(id),
    score1 INTEGER DEFAULT 0,
    score2 INTEGER DEFAULT 0,
    winner_id UUID REFERENCES public.profiles(id),
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'disputed')),
    scheduled_time TIMESTAMP WITH TIME ZONE
);
```

---

## ⚙️ Environment Configuration

Create `.env.production`:

```env
# Next.js App URL
NEXT_PUBLIC_APP_URL=https://ethora.et

# Supabase / PostgreSQL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Cloudflare R2 / AWS S3 (Avatars & Banners)
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_BUCKET_NAME=ethora-media
NEXT_PUBLIC_MEDIA_CDN_URL=https://media.ethora.et

# Ethiopian Payment Gateways (Chapa / Telebirr)
CHAPA_PUBLIC_KEY=CHAPUBK_LIVE-xxxxxxxxxxxxxxx
CHAPA_SECRET_KEY=CHASECK_LIVE-xxxxxxxxxxxxxxx
CHAPA_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx

# AI Assistant
GEMINI_API_KEY=AIzaSy...
```

---

## 🚢 Deploying to Vercel (Recommended)

1. Push your repository to GitHub / GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `ethora` repository.
4. Framework Preset will auto-detect **Next.js**.
5. Add your Production Environment Variables.
6. Click **Deploy**.

Vercel builds and deploys edge-cached pages in under 90 seconds.

---

## 🐳 Docker Deployment (Alternative Self-Hosted)

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t ethora-esports .
docker run -p 3000:3000 --env-file .env.production ethora-esports
```
