# SafeShare: Project Work Document (2-hour plan)

## Team roles (adapt to 2 to 4 people)
- Dev A: Frontend (upload, UI, comparison slider)
- Dev B: Cloudinary config, URL builder, alt text
- Dev C: Docs, Notion, demo assets, deploy
- Dev D (optional): Pitch, QA, backup video

## Timeline
| Time | Task | Owner | Done |
|------|------|-------|------|
| 0:00-0:15 | Cloudinary account, unsigned preset, enable add-ons, scaffold Vite + React + Tailwind, create Notion pages | A, B, C | [ ] |
| 0:15-0:45 | Upload widget integration, store `public_id` in state | A | [ ] |
| 0:15-0:45 | `buildProtectedUrl()` util with faces and text options | B | [ ] |
| 0:45-1:20 | Comparison view, toggles, alt text display, copy link | A, B | [ ] |
| 0:45-1:20 | Demo images, README, LICENSE, Notion log | C | [ ] |
| 1:20-1:45 | Polish, loading and error states, a11y pass | All | [ ] |
| 1:45-2:00 | Deploy to Vercel, record backup video, rehearse pitch | All | [ ] |

## Definition of Done
- [ ] Upload works with a real photo
- [ ] Faces are blurred and text is redacted on the demo images
- [ ] Alt text is visible
- [ ] Link copies and opens the protected image
- [ ] Deployed URL works on mobile
- [ ] README, LICENSE, and Notion architecture page are complete
- [ ] 60s backup video recorded

## Cut line (drop in this order if behind schedule)
1. Blur strength slider
2. Download button
3. Text redaction (keep face blur)
4. Alt text (keep tags)
Never cut: upload, face blur, before/after view, deploy.

## Pitch (3 min)
Problem 30s, live demo 90s, architecture 30s, impact and next steps 30s.
