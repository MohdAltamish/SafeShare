# SafeShare: Workflows

## 1. User flow
```mermaid
flowchart TD
  A[Open SafeShare] --> B{Choose image}
  B -->|Upload| C[Cloudinary Upload Widget]
  B -->|Demo image| D[Use preloaded public_id]
  C --> E[Receive public_id, tags, caption]
  D --> E
  E --> F[Build protected URL from toggles]
  F --> G[Render original vs protected]
  G --> H{Adjust toggles?}
  H -->|Yes| F
  H -->|No| I[Copy link or Download]
```

## 2. Technical sequence
```mermaid
sequenceDiagram
  participant U as User
  participant App as React App
  participant W as Cloudinary Widget
  participant C as Cloudinary
  U->>App: Click Upload
  App->>W: open(cloudName, uploadPreset)
  U->>W: Select file
  W->>C: Unsigned upload (preset enables OCR + captioning)
  C-->>W: public_id, tags, info
  W-->>App: onSuccess(result)
  App->>App: buildProtectedUrl(public_id, opts)
  App->>C: GET transformed image URL
  C-->>App: Protected image (generated on first request, then cached)
  App-->>U: Show before/after, alt text, link
```

## 3. Git workflow
- Branches: `main` (deployable), `feat/<name>`
- Commit style: `feat:`, `fix:`, `docs:`, `chore:`
- Merge via MR, 1 reviewer or self-review given the time limit
- Commit at least every 20 minutes (judges can see the history)

## 4. Notion documentation workflow
Pages: Problem, Users, Solution, Architecture, Build Log, Demo and Pitch.
Build Log entry format: `Time | What we built | What broke | How we fixed it | Screenshot`.
Add an entry after every milestone in PWD.md.

## 5. Release flow
1. `npm run build` passes
2. Deploy to Vercel with env vars set
3. Smoke test: upload, toggle, copy link on mobile and desktop
4. Tag `v0.1.0`
