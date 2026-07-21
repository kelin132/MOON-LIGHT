# Moonlight Haven

Dark, glassmorphic community platform: profiles, guilds, cards, casino games
(virtual currency), chat, and a role-gated staff dashboard — built on
Next.js 14 (App Router) + MongoDB, deployed to Vercel.

## 0. Before anything else — rotate your DB password

The MongoDB connection string you shared earlier in chat is no longer
private (it's in this conversation's history). **Rotate the database
user's password in MongoDB Atlas before deploying**, then put the new
connection string only in environment variables — never in code, never
in a prompt.

## 1. Align the schema with your existing bot

This site reads/writes the **same collections your Discord bot already
uses**, not a fresh database. Before running it:

1. Open `lib/models/User.ts`, `Guild.ts`, `Card.ts` and check the
   `collection: '...'` name in each against your bot's actual collection
   names (currently assumed `users`, `guilds`, `cards`).
2. Check the field names the bot writes (`username`, `role`, `coins`,
   `xp`, `level`, `guildId`, etc.) against what's declared in those
   models. Rename anything that doesn't match. `strict: false` is set so
   Mongoose won't delete fields it doesn't know about, but reads/writes
   under the *wrong* field name will silently no-op.
3. **`webPassword` must be a bcrypt hash**, not plaintext — the login
   flow in `lib/authOptions.ts` uses `bcrypt.compare`. Your bot needs to
   write bcrypt hashes into `webPassword` (e.g. when a user runs a
   "set my website password" bot command), or you can hash one manually:

   ```
   node scripts/hash-password.js "their-chosen-password"
   ```

   and `$set` the result on that user's `webPassword` field. A user with
   `webPassword: null` (the schema default) simply cannot log in yet —
   that's what enforces "only users who already have an account
   elsewhere can access the website."

## 2. Local development

```bash
npm install
cp .env.example .env.local   # fill in MONGODB_URI, NEXTAUTH_SECRET, etc.
npm run dev
```

Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`.

## 3. Deploying to Vercel

1. Push this project to a Git repo, import it in Vercel.
2. In Vercel → Project Settings → Environment Variables, set:
   - `MONGODB_URI` (the rotated connection string)
   - `MONGODB_DB_NAME` (only if not embedded in the URI)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → your production URL, e.g. `https://moonlighthaven.com`
   - `NEXT_PUBLIC_SITE_URL` → same production URL (used for Open Graph tags)
   - `NEXT_PUBLIC_BOT_INVITE_URL` → your bot's Discord OAuth invite link
3. Deploy. Vercel builds with `next build` automatically.

## 4. Open Graph / link previews

`app/layout.tsx` sets OG + Twitter card metadata pointing at
`/public/og-image.png` (1200×630). **Add that image file** — it isn't
included here since it needs real brand art. Until you add it, sharing a
link will fall back to no preview image rather than a broken one.

## 5. What's stubbed vs. production-ready

- **Auth, route protection, staff role-gating, casino balance math**:
  production-ready. Balance changes use atomic `findOneAndUpdate` with a
  `coins: { $gte: wager }` guard so concurrent requests can't push a
  balance negative.
- **Chat**: works, but polls every 4 seconds rather than using
  WebSockets. Fine for a low/medium-traffic community chat; if you want
  real-time push, swap the polling in `app/(app)/chat/page.tsx` for
  Pusher, Ably, or a Vercel-compatible WebSocket provider — the
  `/api/chat` REST endpoints can stay as-is for message history.
- **Casino games**: two working games (Slots, Bet) using an entirely
  virtual `coins` balance — no real-money processing anywhere in this
  codebase.
- **Map page (`/mape`)**: placeholder only — the route spec didn't
  define what data it shows, so it's a stub ready for your content.

## 6. Route map

| Route | Notes |
|---|---|
| `/login` | Only unauthenticated route |
| `/profile`, `/profile/edit` | Home + bio/avatar-URL/banner-URL editing |
| `/shop`, `/shop#cards`, `/cards`, `/cards/:id` | Card marketplace |
| `/guild` | All guilds, preview cards where `previewUrl` is set |
| `/rules`, `/leaderboard`, `/members`, `/mape` | Community pages |
| `/support`, `/support/team`, `/add-bot`, `/chat`, `/lagacy` | Support/community |
| `/user/:moonId` | Public profile |
| `/casinos/casino`, `/casinos/slots`, `/casinos/bet` | Virtual-currency games |
| `/moon/members`, `/moon/guilds`, `/moon/chat`, `/moon/suspends` | Staff only — `403` for everyone else |
