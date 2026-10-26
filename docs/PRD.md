# SafeShare: Product Requirements Document

## 1. Summary
SafeShare is a web app that turns any photo into a privacy-safe, accessible version in seconds. It auto-blurs faces, auto-redacts visible text (phone numbers, IDs, emails), and generates alt text. It then returns a shareable link. Cloudinary AI is the core engine.

## 2. Problem
Students share event photos, lost-and-found pictures, and notice-board shots in public groups. These expose faces without consent and leak personal data (phone numbers, ID cards). Images also ship without alt text, which excludes visually impaired users.

## 3. Target users
- Student clubs and event organizers posting recaps
- Students posting lost-and-found items
- Anyone sharing documents or notice boards in group chats

## 4. Goals and non-goals
Goals (MVP, 2 hours):
- G1: Upload an image and get a protected version in under 5 seconds
- G2: Show original vs protected side by side
- G3: Provide a copyable share link and alt text
- G4: Use at least 2 advanced Cloudinary features (face detection, OCR, captioning)

Non-goals: auth, database, user accounts, video, mobile app, batch upload, payments.

## 5. User stories
- US1: As an organizer, I upload a group photo and get faces blurred so I can post without consent issues.
- US2: As a student, I upload a photo with a phone number and the number is redacted automatically.
- US3: As a user, I toggle face blur and text redaction independently.
- US4: As a user, I copy a link to the protected image.
- US5: As a screen-reader user, I get meaningful alt text.

## 6. Functional requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Upload via Cloudinary Upload Widget (unsigned preset) | P0 |
| F2 | Face blur or pixelate via Cloudinary transformation | P0 |
| F3 | Text redaction via OCR region (`g_ocr_text`) | P0 |
| F4 | Before/after comparison view | P0 |
| F5 | Toggles: faces, text, blur strength | P1 |
| F6 | Alt text from Cloudinary captioning, with tag fallback | P1 |
| F7 | Copy link and download protected image | P0 |
| F8 | 3 built-in demo images | P1 |
| F9 | Error and empty states | P1 |

## 7. Non-functional requirements
- Time to protected preview under 5s on a normal connection
- Responsive from 360px up
- Accessible: keyboard navigable, WCAG AA contrast, alt text on all images
- No secrets in the client (only cloud name and unsigned preset)

## 8. Success metrics (demo day)
- Live demo works end to end in under 60s
- 2 or more Cloudinary AI features visibly used
- Notion log has 6 or more entries with screenshots

## 9. Risks
| Risk | Mitigation |
|------|-----------|
| OCR or captioning add-on not activated | Fall back to face blur and tags. Pre-process demo images. |
| Wi-Fi fails at the finale | Pre-recorded 60s video and pre-uploaded demo assets |
| Original image remains publicly reachable | Documented limitation. See ARCHITECTURE.md section 6. |

## 10. Future scope
Chrome extension, WhatsApp bot, per-person consent tagging, signed and expiring links, EXIF stripping.
