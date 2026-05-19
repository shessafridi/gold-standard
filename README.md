# e2e Typescript

This repository is a personal full-stack template and reference project.

It is meant to be a kind of gold-standard baseline for how to structure things: a place to codify preferred patterns for monorepo layout, API contracts, schema ownership, auth flows, shared packages, and backend layering.

Instead of being just a demo app, this repo is intended to answer questions like:

- How should a new feature/module be added?
- Where should contracts, schemas, services, and repositories live?
- How should frontend and backend types stay aligned?
- What does a clean full-stack TypeScript monorepo look like?

## What This Repo Is

- A `pnpm` workspace managed with Turborepo
- A full-stack TypeScript monorepo
- A template for project structure and conventions
- A reference implementation for typed APIs and shared contracts

## Apps

- `apps/web`: Vite + React frontend
- `apps/api`: Hono + oRPC backend

## Packages

- `packages/api-schemas`: shared Zod schemas for inputs and outputs
- `packages/api-contract`: shared oRPC contract definitions
- `packages/api-client`: typed API client and TanStack Query helpers
- `packages/auth-react`: reusable client-side auth state utilities
- `packages/db`: Prisma schema, generated client, and DB access package
- `packages/ui`: shared UI components and styles

## Architectural Direction

This repo favors a clear separation of concerns:

- Prisma models define persistence
- Zod schemas define API inputs and outputs
- API contracts define the transport surface
- Routers implement procedures
- Services hold business logic
- Repositories handle database access

That means new backend modules should generally follow:

```text
procedure -> service -> repository -> prisma
                     -> dto mapper -> output schema
```

## Documentation

- [Architecture](docs/architecture.md)
- [Adding a new module](docs/adding-a-new-module.md)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run everything in dev:

```bash
pnpm dev
```

Common commands:

```bash
pnpm build
pnpm lint
pnpm check-types
pnpm db:generate
pnpm db:push
```

## Notes

- This repo is still evolving and acts as a working standard, not a frozen boilerplate.
- Some modules are more complete than others, but the intended structure is already visible in the current architecture.
- When in doubt, prefer consistency with the documented patterns over quick one-off implementations.
