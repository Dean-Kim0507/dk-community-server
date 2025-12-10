# (IN-PROGRESS) Backend Refactoring: Migrating to Hexagonal Architecture

This backend is being refactored from a layered layout into a hexagonal architecture that separates domain, application, and infrastructure concerns.

Most software development involves improving existing systems. Refactoring lets us keep proven features, find improvements, and modernize the codebase, all while preserving what already works.

## Problems of Old Codebase

- **Tight coupling:** Business logic, data access, and HTTP handling are all intermixed, making it difficult to separate concerns or adjust one without impacting the others.
- **Impure domain:** The domain layer depends on external modules—any change to infrastructure (e.g., switching from SQL to NoSQL) forces changes throughout the domain logic.
- **Difficult testing:** It's hard to test business logic in isolation, as it's entangled with HTTP, Express, and ORM concerns.

## What is Hexagonal Architecture?

- Puts business logic at the center, isolated from frameworks.
- **Dependency Inversion Principles**: Uses "ports" (interfaces) and "adapters" (implementations) to connect with the outside world.
- Makes core code easier to test, maintain, and adapt.

### Port and adapter

- Port: A port is an interface that sits at the boundary of your domain/application.
It answers:
“What does my business logic need?”
“What does my business logic expose?”

- Adapter: An adapter is a concrete implementation of a port for a specific technology.

Code Example:

```ts
// example.port.ts
export interface ExamplePort {
  doWork(input: Input): Promise<Output>;
}

// example.adapter.ts
@injectable()
export class ExampleAdapter implements ExamplePort {
  constructor(@inject(SOME_DEP_TOKEN) private dependency: SomePort) {}

  async doWork(input: Input): Promise<Output> {
    ...
  }
}
```

### Key Resolutions Provided by Hexagonal Architecture

Registration logic lives in a **domain adapter** (`RegisterUserProviderAdapter`), behind a **port (interface)** (/domain/provider/register-user/register-user.adapter.ts).

- **Separation of concerns**: Clearly divides responsibilities across three layers—domain (business rules), application (use cases), and infrastructure (frameworks, databases, and external services)
- **Centralized business logic**: Register rules live in one domain service, not scattered across controllers/routes.
- **Tech-agnostic core:** "Business logic" has no dependency on Express/TypeORM/etc; those are details managed outside of the domain.
- **Testability**: You can test registration without an HTTP server; use cases operate on plain objects and mocks.
- **Explicit contracts**: Data flow (input, output, errors) moves via interfaces, so changes are easier to track and validate.

#### File structure (before vs after)

```
Before (@server)
server/
└─ src
   ├─ server.ts
   ├─ data-source.ts
   ├─ routes/
   ├─ middlewares/
   ├─ entities/
   └─ utils/
```

```
After (hexagonal in server-new)
server-new/
└─ src
   ├─ domain/
   │  ├─ entities/
   │  ├─ repositories/
   │  └─ provider/register-user/
   ├─ application/
   │  └─ use-cases/{admin,customer}/
   ├─ infrastructure/
   │  ├─ web/express/
   │  ├─ repositories/user/
   │  └─ typeorm/entities/
   ├─ configuration/dependency-registries/
   ├─ shared/messages/
   └─ utils/
```

## How to run

1. Run `npm i`.
2. Configure database settings in `data-source.ts`.
3. Run `npm start`.
