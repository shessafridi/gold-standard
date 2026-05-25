# Adding A New Module

This guide explains how to add a new backend module end to end in this repo.

It follows the architecture already used here:

```text
Prisma model
  -> Zod schemas in @workspace/api-schemas
  -> API contract in @workspace/api-contract
  -> server implementation in apps/api
  -> router registration in oRPC
  -> optional frontend consumption via @workspace/api-client
```

The goal is to keep one source of truth for data shapes and make sure business logic stays in services, not inside procedure handlers.

## Guiding Principles

- Define persistence in Prisma first.
- Define API inputs and outputs as Zod schemas in `packages/api-schemas`.
- Define the transport layer in `packages/api-contract`.
- Implement business rules in a service class.
- Keep database access in a repository class.
- Keep oRPC procedures thin: validate, authorize, call a service, return DTOs.
- Map Prisma models to response DTOs explicitly instead of returning raw records directly.

## Target Structure

For a module named `project`, the typical structure is:

```text
packages/
  api-schemas/src/project/
    index.ts
    project.schemas.ts

  api-contract/src/
    project.contract.ts

apps/api/src/modules/project/
  api/
    project.router.ts
  project.repository.ts
  project.service.ts
  project.dto.ts
```

You will usually also update:

- `packages/db/prisma/models/*.prisma`
- `packages/api-contract/src/index.ts`
- `apps/api/src/orpc/router.ts`

## Step 1: Add Or Update The Prisma Model

Create or update the Prisma model in `packages/db/prisma/models/`.

Example:

```prisma
model Project {
    id          String   @id @default(cuid())
    name        String
    description String?
    ownerId     String
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}
```

Then update the database artifacts:

```bash
pnpm db:generate
pnpm db:push
```

Use `db:migrate` instead of `db:push` when you want a real migration history.

What this step gives you:

- generated Prisma types in `@workspace/db`
- the ability to build a repository against the new model

## Step 2: Add Zod Schemas In `@workspace/api-schemas`

Create a module folder in `packages/api-schemas/src/<module>/`.

Typical contents:

- input schemas for create/update/filter operations
- output schemas for API responses
- inferred TypeScript types from those schemas

Example `project.schemas.ts`:

```ts
import { z } from 'zod';

const projectBaseSchema = z.object({
  name: z.string().trim().min(3).max(120),
  description: z.string().trim().max(1000).optional(),
});

export const createProjectSchema = projectBaseSchema;

export const updateProjectSchema = projectBaseSchema.partial().extend({
  id: z.string(),
});

export const projectSchema = projectBaseSchema.extend({
  id: z.string(),
  ownerId: z.string(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectOutput = z.infer<typeof projectSchema>;
```

Add an `index.ts`:

```ts
export * from './project.schemas';
```

Important conventions:

- Inputs and outputs should be explicit.
- Outputs are API DTOs, not raw Prisma models.
- Reuse shared validators from `packages/api-schemas/src/common` when possible.

## Step 3: Add The API Contract In `@workspace/api-contract`

Create `packages/api-contract/src/<module>.contract.ts`.

This is where you define the public API surface for the module:

- HTTP method
- path
- tags
- auth requirements
- input schema
- output schema

Example:

```ts
import { oc } from '@orpc/contract';
import { z } from 'zod';

import {
  createProjectSchema,
  projectSchema,
  updateProjectSchema,
} from '@workspace/api-schemas/project';

import { withAuth } from './utils/with-auth';

export const projectContract = {
  create: oc
    .route({
      method: 'POST',
      path: '/projects',
      tags: ['Projects'],
      spec: withAuth,
    })
    .input(createProjectSchema)
    .output(projectSchema),

  getById: oc
    .route({
      method: 'GET',
      path: '/projects/{id}',
      tags: ['Projects'],
      spec: withAuth,
    })
    .input(z.object({ id: z.string() }))
    .output(projectSchema),

  update: oc
    .route({
      method: 'PATCH',
      path: '/projects/{id}',
      tags: ['Projects'],
      spec: withAuth,
    })
    .input(updateProjectSchema)
    .output(projectSchema),
};
```

Then register the contract in `packages/api-contract/src/index.ts`:

```ts
import { projectContract } from './project.contract';

export const contract = {
  // existing modules...
  project: projectContract,
};
```

Notes:

- Use `withAuth` for authenticated procedures.
- Add clear tags and descriptions because these feed the generated OpenAPI docs.
- The contract should describe the API shape only. No business logic goes here.

## Step 4: Create A Repository

Create `apps/api/src/modules/<module>/<module>.repository.ts`.

The repository owns database access only.

Example:

```ts
import type { Prisma, Project } from '@workspace/db';
import { prisma } from '@workspace/db';

export class ProjectRepository {
  async findById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id } });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return prisma.project.create({ data });
  }

  async updateById(
    id: string,
    data: Prisma.ProjectUpdateInput
  ): Promise<Project> {
    return prisma.project.update({ where: { id }, data });
  }
}

export const projectRepository = new ProjectRepository();
```

Repository rules:

- Keep repositories focused on persistence.
- Do not put authorization or business workflow logic here.
- It is fine to add convenience query methods like `findOne`, `exists`, `count`, or `findMany`.

## Step 5: Create DTO Mappers

Create `apps/api/src/modules/<module>/<module>.dto.ts`.

This layer maps Prisma records to API output types.

Example:

```ts
import type { ProjectOutput } from '@workspace/api-schemas/project';
import type { Project } from '@workspace/db';

export const buildProjectDto = (project: Project): ProjectOutput => ({
  id: project.id,
  name: project.name,
  description: project.description ?? undefined,
  ownerId: project.ownerId,
});
```

Why this matters:

- it decouples the API from the database shape
- it lets you normalize nullable DB fields
- it gives you one place to format dates, enums, and derived fields

## Step 6: Create A Service

Create `apps/api/src/modules/<module>/<module>.service.ts`.

The service contains business logic and orchestrates repositories, token flows, notifications, and any cross-module rules.

Example:

```ts
import { NotFoundError } from '@/shared/errors';

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from '@workspace/api-schemas/project';

import type { ProjectRepository } from './project.repository';
import { buildProjectDto } from './project.dto';
import { projectRepository as projectRepositorySingleton } from './project.repository';

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(input: CreateProjectInput, ownerId: string) {
    const project = await this.projectRepository.create({
      name: input.name,
      description: input.description,
      ownerId,
    });

    return buildProjectDto(project);
  }

  async getById(id: string) {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    return buildProjectDto(project);
  }

  async update(input: UpdateProjectInput) {
    const existing = await this.projectRepository.findById(input.id);

    if (!existing) {
      throw new NotFoundError('Project not found');
    }

    const updated = await this.projectRepository.updateById(input.id, {
      name: input.name,
      description: input.description,
    });

    return buildProjectDto(updated);
  }
}

export const projectService = new ProjectService(projectRepositorySingleton);
```

Service rules:

- Put business rules here.
- Call repositories from services.
- Return DTOs from services when possible.
- Throw domain-appropriate errors from `@/shared/errors` or `ORPCError` where needed.

## Step 7: Implement The Contract In A Router

Create `apps/api/src/modules/<module>/api/<module>.router.ts`.

This is the procedure layer. It should stay thin and call the service.

Example:

```ts
import { authed } from '@/orpc';

import { projectService } from '../project.service';

export const projectRouter = authed.project.router({
  create: authed.project.create.handler(
    async ({ input, context: { user } }) => {
      return projectService.create(input, user.id);
    }
  ),

  getById: authed.project.getById.handler(async ({ input }) => {
    return projectService.getById(input.id);
  }),

  update: authed.project.update.handler(async ({ input }) => {
    return projectService.update(input);
  }),
});
```

Router rules:

- Procedures should mostly delegate.
- Do auth selection here by choosing `pub` or `authed`.
- Avoid placing raw Prisma calls directly in handlers for new modules.
- Avoid placing substantial business logic in handlers.

## Step 8: Register The Router

Update `apps/api/src/orpc/router.ts`.

Example:

```ts
import { projectRouter } from '@/modules/project/api/project.router';

export const router = os.router({
  // existing modules...
  project: projectRouter,
});
```

This step makes the module available through the top-level oRPC API.

## Step 9: Export Schemas Cleanly

If this is a new schema namespace, make sure consumers can import it cleanly from `@workspace/api-schemas/<module>`.

That usually means:

- create `packages/api-schemas/src/<module>/index.ts`
- ensure the package export map includes `"./<module>"`

Example package export:

```json
"./project": {
  "import": "./dist/project.mjs",
  "require": "./dist/project.cjs"
}
```

If you create a brand-new package entry and forget the export map, downstream imports will fail.

## Step 10: Verify The Module End To End

At minimum, run:

```bash
pnpm db:generate
pnpm check-types
pnpm build
```

If you changed DB structure locally, also run:

```bash
pnpm db:push
```

Then verify:

- the contract compiles
- the router is registered
- the API handler exposes the new endpoints under `/api`
- the generated OpenAPI docs include the new routes
- the returned payload matches the output Zod schema

## Recommended Order Of Work

When adding a new module, this order tends to be the smoothest:

1. Add Prisma model changes.
2. Generate Prisma client.
3. Add Zod input and output schemas.
4. Add the API contract.
5. Add repository methods.
6. Add DTO mappers.
7. Add service methods.
8. Add oRPC router handlers.
9. Register the module in the top-level contract and server router.
10. Run type-check and build.

## What To Keep Out Of Each Layer

Prisma model:

- No API-specific response shaping.

Zod schemas:

- No database logic.
- No service orchestration.

Contract:

- No business rules.
- No persistence logic.

Repository:

- No auth decisions.
- No workflow logic.

Service:

- No HTTP or route wiring.

Router/procedure handler:

- No large business workflows.
- No repeated Prisma access logic.

## Minimal Checklist

- Prisma model added or updated
- Prisma client regenerated
- Input Zod schemas added
- Output Zod schemas added
- `index.ts` export added in `api-schemas`
- `api-contract` file added
- contract registered in `packages/api-contract/src/index.ts`
- repository created
- DTO mapper created
- service created
- router created
- router registered in `apps/api/src/orpc/router.ts`
- type-check and build passed

## Final Notes

For new work, prefer the `user` and `auth` modules as architecture references because they already reflect the intended layering better than `post`.

The `post` module is useful as a small contract example, but future modules should follow this pattern more consistently:

```text
procedure -> service -> repository -> prisma
                      -> dto mapper -> output schema
```

If in doubt, keep procedure handlers boring and move the real logic into services.
