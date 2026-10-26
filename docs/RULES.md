# Project Rules and Instructions

## Scope rules
1. P0 features first. No new feature until all P0 items work.
2. If behind schedule, follow the cut line in PWD.md.
3. No backend, auth, or database in the MVP.

## Code rules
- Functional React components with hooks only
- Small components, one responsibility each
- All Cloudinary URL logic lives in `src/lib/cloudinary.js`
- No hard-coded cloud names or presets. Use `import.meta.env`.
- Handle every async call with try/catch and a user-visible error
- No `console.log` in the final commit

## Security rules
- Never commit `.env`, API keys, or the API secret
- Only the cloud name and unsigned preset may exist client-side
- Restrict the upload preset: allowed formats and max size
- State the original-image exposure limitation in the README

## UX and accessibility rules
- Every image has alt text
- All controls work with the keyboard
- Show loading, empty, error, and success states
- Text contrast of 4.5:1 or better

## Git rules
- Conventional commits, small and frequent (at least every 20 minutes)
- `main` must always build
- Include a LICENSE (MIT) and README before the final push

## Documentation rules (hackathon requirement)
- Notion is the source of truth for the journey: Problem, Users, Architecture, Build Log, Pitch
- Add a Build Log entry after each milestone, including what broke and how you fixed it
- Screenshots in every major entry

## Demo rules
- Pre-upload and pre-warm the 3 demo images (open the transformed URLs once)
- Keep a 60s backup video
- Never demo with untested images
- Be upfront about limitations and the roadmap. Judges respect honesty.
