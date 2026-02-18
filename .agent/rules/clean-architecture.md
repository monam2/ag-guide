# Clean Architecture Rules

## 1. Core Principle: The Dependency Rule

- **Dependencies MUST point inwards.**
- Inner layers (Domain) **must NOT** know about outer layers (Use Cases, Interface Adapters, Frameworks).
- Domain entities should be independent of any database or UI library.

## 2. Layers & Responsibilities

### Domain Layer (Inner-most)

- **Entities**: Pure TypeScript classes representing core business objects.
  - Encapsulate business rules and state validation.
  - Provide static `create` methods for consistent instantiation.
  - Example: `Post.create(...)`
- **Repositories (Interfaces)**: Defines how data is accessed, without implementation details.
  - Use interfaces (`I[Name]Repository`).
  - Return Domain Entities or Promises of Entities.
  - Example: `interface IPostRepository { save(post: Post): Promise<void>; }`

### Use Case Layer

- application specific business rules.
- Orchestrates the flow of data to and from the entities.
- **Rules**:
  - Implement as Classes with a single public method (e.g., `execute(...)`).
  - Inject dependencies (Repositories) via constructor.
  - Do NOT import from `infrastructure` or `presentation` layers.
  - Example: `class CreatePost { constructor(private repo: IPostRepository) {} execute(...) { ... } }`

### Interface Adapters Layer (Outer)

- Convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency (DB, Web).
- **Repositories (Implementation)**: Concrete implementation of repository interfaces.
  - Map database models (e.g., MongoDB, SQL) to Domain Entities.
- **Presenters**: Prepare data for the view.

### Frameworks & Drivers Layer (Outermost)

- Framework code (Next.js, Express), Database drivers, UI libraries (React).
- All details go here.

## 3. Folder Structure

Maintain strict separation of concerns:

```
src/
├── domain/           # Enterprise Business Rules
│   ├── entities/     # Enterprise Business Objects
│   ├── repositories/ # Interfaces for Repositories
│   └── use-cases/    # Application Business Rules
├── infrastructure/   # Frameworks & Drivers (DB impl, External APIs)
└── presentation/     # Interface Adapters (UI, Controllers)
```

## 4. Implementation Guidelines

- **DTOs**: Use simple interfaces/types for input/output boundaries (e.g., `CreatePostRequest`).
- **Use Case Interaction**: Presentation layer calls Use Cases, Use Cases use Entities and Repository Interfaces.
- **Inversion of Control**: Use Dependency Injection to wire up dependencies (e.g., passing `PostRepository` into `CreatePost` use case).
