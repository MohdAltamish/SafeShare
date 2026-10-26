# AGENTS.md: SafeShare

## Project context
SafeShare is a client-only React + Vite app that uses Cloudinary AI to blur faces, redact text, and generate alt text for uploaded images. Read `docs/PRD.md` and `docs/ARCHITECTURE.md` before coding.

## Roles
### Builder agent
- Implements features exactly as listed in PRD section 6, in priority order (P0 first).
- Follows RULES.md.

### Reviewer agent
- Checks each change against the Definition of Done in PWD.md.
- Checks accessibility items in UI-UX.md.
- Flags secrets, dead code, and scope creep.

### Docs agent
- Writes README, Notion build-log entries, and the pitch script from the actual code. Never invents features.

## Setup commands
```
npm create vite@latest safeshare -- --template react
cd safeshare && npm i && npm i -D tailwindcss @tailwindcss/vite
npm run dev
npm run build
```

## Boundaries
- Do: edit files under `src/`, `docs/`, `public/`, and the README.
- Ask first: adding dependencies, changing the architecture, adding a backend.
- Never: add auth, a database, or a server unless the user asks. Commit secrets. Delete docs.

## Definition of done per task
Runs locally, no console errors, matches UI-UX.md states, committed with a conventional message.
