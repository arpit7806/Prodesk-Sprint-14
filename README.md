# Sprint 14 — Auth & Routing Walking Skeleton

MVP proving the login → session → protected route loop for the Next.js
track. No high-fidelity UI this sprint — the goal is functional state
management end to end.

## Stack

- Next.js 15 (App Router)
- NextAuth.js v4 (Credentials provider, JWT sessions)
- Redux Toolkit for global user state
- In-memory mock "database" (resets on server restart — swap for a real
  DB once the architecture is validated)

## Routes

| Route | Access | Notes |
|---|---|---|
| `/` | public | landing, links to login/register |
| `/login` | public | signs in via NextAuth credentials |
| `/register` | public | creates a user, then auto signs them in |
| `/dashboard` | **protected** | middleware redirects to `/login` if no valid session token |

## How the pieces connect

1. **Register** posts to `/api/register`, which writes to the in-memory
   store, then immediately calls `signIn()` so the user lands on the
   dashboard already authenticated.
2. **Login** calls NextAuth's `signIn("credentials", ...)`, which hits the
   `authorize()` callback in `lib/authOptions.js` against the mock DB.
3. **Middleware** (`middleware.js`) runs on every `/dashboard/*` request,
   reads the JWT via `getToken()`, and redirects unauthenticated hits back
   to `/login`.
4. **Dashboard** reads the NextAuth session client-side and syncs it into
   the Redux store (`store/userSlice.js`) so the payload rendered on
   screen is coming from global state, not directly off the session —
   this is the "state sync" requirement from Phase 3.

## Setup

```bash
npm install
cp .env.local.example .env.local
# generate a real secret and drop it into NEXTAUTH_SECRET, e.g.:
# openssl rand -base64 32
npm run dev
```

Visit `http://localhost:3000`, register an account, then try hitting
`/dashboard` directly in a private window to see the middleware redirect
kick in.

## Known limitations (by design, for this sprint)

- Users live in memory only — restarting the dev server wipes them.
- Passwords are stored in plain text in the mock DB. Fine for a walking
  skeleton, not fine for anything real — hash before this touches
  production.
- No password reset / email verification flows yet.
- Styling is intentionally minimal per the Phase 1 scope.
