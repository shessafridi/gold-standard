# Architecture

## Overview

This repository is a `pnpm` + Turborepo monorepo with two runnable apps:

- `apps/web`: Vite + React frontend
- `apps/api`: Hono + oRPC API server

The apps are backed by shared workspace packages for API contracts, API client generation, auth state, UI components, and Prisma database access.

At a high level, the frontend talks to the API through a typed oRPC client, the API uses Prisma for persistence, and the shared packages keep types and contracts aligned across the stack.

## Repository Shape

```text
apps/
  api/         Hono server, oRPC handlers, business modules, infrastructure
  web/         React app, TanStack Router, React Query, auth screens

packages/
  api-schemas/ Zod schemas for request/response shapes
  api-contract/ Shared oRPC contract built from schemas
  api-client/  Typed client + TanStack Query helpers from the contract
  auth-react/  Reusable client-side auth store/provider
  db/          Prisma schema, generated client, sqlite-backed Prisma instance
  ui/          Shared UI components and global styles

tooling/
  prettier/    Shared Prettier config
  typescript/  Shared TS config presets
```

## Runtime Flow

```text
React UI
  -> @workspace/api-client
  -> HTTP /api/*
  -> Hono server
  -> oRPC router + middleware
  -> service / repository layer
  -> Prisma
  -> SQLite
```

## Frontend

`apps/web` is a client-side React app built with Vite.

- Routing uses TanStack Router with file-based routes and a generated `routeTree`.
- Server state uses TanStack React Query.
- Authentication state is managed by `@workspace/auth-react` and persisted in `localStorage`.
- The oRPC client is created in `src/core/clients/orpc-client.ts` and injects the bearer token into request headers.
- Protected areas are grouped under `/_dashboard`, where route guards redirect anonymous users to `/sign-in`.

Current route shape is simple:

- `/sign-in` and `/sign-up` for auth entry
- `/` redirects to `/app`
- `/_dashboard/*` is the authenticated section

## API

`apps/api` exposes a Hono server and mounts oRPC handlers under `/api`.

- `src/server.ts` boots the server, wires `/api/*`, and exposes `/health`.
- `src/orpc/router.ts` composes the top-level API from `auth`, `post`, and `user` routers.
- `src/orpc/index.ts` defines two access levels:
  - `pub` for public procedures
  - `authed` for procedures that require a valid bearer token
- `src/orpc/handle.ts` wraps the router with OpenAPI generation and CORS support.

The API is organized by feature module:

- `modules/auth`: registration, login, password reset, email verification
- `modules/user`: profile and account operations
- `modules/post`: post CRUD entry points, currently minimal
- `modules/token-verification`: OTP/reset token lifecycle

Within a module, the pattern is:

```text
router -> service -> repository/db -> dto/output mapping
```

This keeps transport concerns in routers and business logic in services.

## Shared Contracts

The shared package flow is intentional and is one of the main architectural decisions in this repo:

```text
@workspace/api-schemas
  -> @workspace/api-contract
  -> @workspace/api-client
  -> apps/web and @workspace/auth-react
```

- `api-schemas` defines Zod schemas and shared payload types.
- `api-contract` declares the API surface once, independent of server/client implementation.
- `api-client` creates the typed oRPC client and query helpers from that contract.

This means the frontend does not manually duplicate endpoint types.

## Data Layer

`@workspace/db` owns the Prisma schema and exports a shared Prisma client.

- Prisma is configured in `packages/db/prisma`.
- The current datasource is SQLite.
- The Prisma client is created through `@prisma/adapter-better-sqlite3`.
- The DB path resolves relative to the package so both apps can use the same local database consistently.

Current core models:

- `User`
- `VerificationToken`
- `Post`
- `Tag`

## Auth and Notifications

Authentication is token-based:

- login and verification flows issue JWTs
- authenticated API procedures resolve the current user from the bearer token
- the frontend stores the token via `@workspace/auth-react`

Verification and recovery flows use `VerificationToken` records plus a notifications layer:

- token generation lives in `modules/token-verification`
- notification orchestration lives in `infrastructure/notifications`
- email delivery is handled via the email infrastructure and templated emails

The notification layer is already shaped to support multiple transports such as email, SMS, WhatsApp, and push.

## Build and Developer Workflow

- Workspace management: `pnpm`
- Task orchestration: Turborepo
- Frontend dev server: `vite`
- API dev server: `nodemon` + `tsx`
- Shared formatting and TS config live under `tooling/`

Top-level scripts run through Turbo for repo-wide build, lint, type-check, and Prisma tasks.

## Notes

- `docs/architecture.md` documents the current implementation, not a target-state design.
- The backend structure is ahead of the current feature surface: auth and user flows are more developed than posts.
- The root `README.md` still contains starter content, so this file should be treated as the source of truth for the actual codebase layout.
