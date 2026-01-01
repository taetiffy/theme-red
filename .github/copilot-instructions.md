<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->

# Copilot / AI Agent Quick Guide

Purpose: help an AI agent be productive in this Next.js + TypeScript project by surfacing architecture, conventions, and concrete code examples.

- Quick start (developer): `npm run dev` (uses `next dev --turbopack`). Build: `npm run build`. Start: `npm run start`.
- Repo type: Next.js app-router in `src/app` (server components by default). React 19 and Next 15.

Big picture
- App router: `src/app/layout.tsx` is the root layout and performs server-side calls to `src/services/*/server.ts` (example: `getSettingMeta`, `getSOS` from `src/services/setting/server.ts`). The layout injects CSS variables from server settings.
- Server vs Client: server API helper files live under `src/services/*/server.ts` and are used from server components. Client logic (hooks, providers, UI) use `"use client"` and live under `src/hooks`, `src/providers`, `src/components`.
- Global state: `zustand` stores under `src/stores` (example: `src/stores/member.ts`) — these are persisted and accessed via hooks like `useMemberStore`.
- Contexts & Providers: important runtime wiring is in `src/contexts` and `src/providers` (e.g. `WebSocketProvider.tsx`, `ModalProvider.tsx`). WebSocket connection and subscription model is implemented in `src/providers/WebSocketProvider.tsx` (use `subscribe(callback)` to receive events).

Key files and patterns (examples)
- Server service pattern: `src/services/setting/server.ts` — uses `fetchWithoutToken` and `getServerBaseUrl()`; service files export simple async functions that return parsed JSON.
- Fetch utilities: `src/utils/fetchUtils.ts` and `src/lib/fetcher.ts` — use these for consistent `fetch` options, caching (`next` cache options), and token handling (`fetchWithToken` / `fetchWithoutToken`). Always pass `BASE_URL` from `getServerBaseUrl()` or the server helpers.
- WebSockets: `src/providers/WebSocketProvider.tsx` — auto-reconnect logic, ping/pong, `send(message)` and `subscribe(cb)` interface. Authenticated state is combined with `useMemberStore`.
- Modal & disclosure: `src/contexts/ModalContext.ts` + `src/hooks/useCustomDisclosure.ts` — modal types are strongly typed; prefer these hooks for showing modals.
- Layout & theming: `src/app/layout.tsx` reads `getSettingMeta()` and inlines CSS variables to `:root` — theme colors come from server settings.

Conventions
- Filenames: server-only functions are named `server.ts` and are imported into server components. Client files include `"use client"` at the top.
- Types: shared types live in `src/types`. Use those types for request/response shapes.
- Styling: global styles in `src/styles/globals.css`. Component styles use CSS Modules (`*.module.css`) in `src/styles` and component folders.
- Assets: `public/` for static assets; `src/image` for project image collections. `next.config.ts` includes `images.remotePatterns` — add allowed hosts there when adding new remote images.
- State persistence: `zustand` stores use `persist` middleware with a named storage key (example: `member-store`). Use `useMemberStore.getState()` for programmatic access when needed.

Developer workflows & gotchas
- Run: `npm run dev` (server at localhost:3000). CI/build: `npm run build`. Lint: `npm run lint` (note: `next.config.ts` sets `eslint.ignoreDuringBuilds = true`).
- Next behavior: server components are default; adding `"use client"` changes rendering context — ensure hooks and browser-only APIs are used only in client components.
- Fetch caching: `fetchUtils` attaches `next` caching options. Use `{ noStore: true }` when you need fresh server-side requests (see `fetchWithoutToken` usage in `src/services`).
- WebSocket host and token: WebSocketProvider uses `getTokenFromCookie()` and `getHostname()` (utils) — for testing locally, override `serverUrl` prop or provide a compatible endpoint.

Integration points & external deps
- Authentication: token stored in cookies (`src/utils/cookieUtils.ts`) and used by `fetchWithToken` and `WebSocketProvider`.
- APIs: backend calls go to `${BASE_URL}/api/v3` as constructed in `fetchUtils`. Base URLs are resolved via `src/utils/url/server.ts` / client variants.
- Realtime: `socket.io-client` is available but the repo uses a raw WebSocket provider in `src/providers/WebSocketProvider.tsx`.
- State + notifications: `sonner` for toasts, `swr` for client fetching in some areas, and `zustand` for local state.

When editing or adding code
- For server-side data used by layouts/pages, prefer adding `src/services/<domain>/server.ts` functions that return parsed JSON and use `fetchWithoutToken` or `fetchWithToken`.
- For client features, add a `"use client"` provider/component and expose hooks through `src/hooks` or `src/providers`.
- Update `next.config.ts` when adding remote image hosts.
- New persisted stores: follow `src/stores/member.ts` pattern (use `persist` and `onRehydrateStorage` to initialize post-hydration).

Missing/unavailable info
- No explicit test setup in the repo. No `.github/copilot-instructions.md` existed before; this file is a starting point. If you want CI, test framework, or environment variable conventions, add a short README section or an `AGENT.md` and I will merge it.

If anything above is unclear or you want deeper examples (e.g., one full end-to-end change touching services → provider → UI), tell me which area and I will add a focused example patch.
