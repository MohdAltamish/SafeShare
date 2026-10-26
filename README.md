# SafeShare — Share photos, not privacy

[![MIT License](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-AI_Engine-3448C5.svg)](https://cloudinary.com/)

> Turn any photo into a privacy-safe, accessible version in seconds. Auto-blur faces, redact phone numbers and IDs, and generate AI alt text before sharing in public group chats.

---

## 1. The Problem
Students, clubs, and event organizers constantly share photos in public campus chats (WhatsApp, Discord, Slack):
- **Faces shared without consent**: Group photos expose attendees publicly.
- **Data leaks**: Lost-and-found posts and bulletin board shots inadvertently broadcast personal phone numbers, student ID badges, and room numbers.
- **Accessibility gap**: Photos ship without alt text, excluding visually impaired community members.

---

## 2. Solution & Features

SafeShare processes images client-side through **Cloudinary AI transformation pipelines**:

- **Auto-Face Protection**: Detects and blurs faces (`e_blur_faces:<strength>`) with variable strength (Low / Med / High).
- **Text & PII Redaction**: Blurs text and phone numbers using OCR region detection (`e_blur_region:<strength>,g_ocr_text`).
- **AI Alt Text**: Automatically extracts captions and tags for screen-reader users, with an editable textarea.
- **Side-by-Side Comparison**: Dual-card inspection (Original vs Protected) with live updates as toggles change.
- **One-Click Share & Export**: Copy CDN link with polite toast notification, or stream direct image download.
- **Preloaded Demo Assets**: 3 built-in demo scenarios (Group photo, ID/Notice, Notice board) for immediate zero-config testing.
- **Graceful Add-On Fallback**: If OCR is unavailable on an account tier, SafeShare automatically falls back to face protection with an inline explanation.

---

## 3. Architecture

```mermaid
flowchart LR
  User[User Browser] -->|Upload Photo| Widget[Cloudinary Upload Widget]
  Widget -->|Unsigned Upload Preset| Cloudinary[(Cloudinary Cloud)]
  Cloudinary -->|Face Detection, OCR, Captioning| AI[Cloudinary AI Engine]
  Cloudinary -->>|Return public_id, tags, caption| ReactApp[SafeShare React SPA]
  ReactApp -->|Request Chained Transformation URL| Cloudinary
  Cloudinary -->>|Stream Protected Delivery Asset| User
```

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ installed
- A free [Cloudinary](https://cloudinary.com) account

### Setup Steps
```bash
# 1. Clone repository
git clone https://github.com/your-username/safeshare.git
cd safeshare

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

### Environment Configuration (`.env`)
```env
# Cloudinary Cloud Name (from Cloudinary Console Dashboard)
VITE_CLOUDINARY_CLOUD_NAME=dgrzeojzd

# Unsigned Upload Preset (Settings > Upload > Upload Presets)
VITE_CLOUDINARY_UPLOAD_PRESET=ml_default
```

### Running Locally
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 5. Cloudinary Preset Setup Guide

To replicate this configuration in your own Cloudinary console:

1. Go to **Settings (gear icon)** > **Upload**.
2. Scroll to **Upload presets** and click **Add upload preset**.
3. Set **Preset name** to `safeshare` (or `ml_default`).
4. Set **Signing Mode** to **Unsigned** (*critical for client-side uploads*).
5. (Optional) Set **Folder** to `safeshare`.
6. Enable AI Add-ons under upload parameters if your account plan supports:
   - `Detection: captioning`
   - `OCR: adv_ocr`
7. Click **Save** (top right).

---

## 6. Known Limitations & Security Transparency

As an honest hackathon MVP:
- **Unsigned Upload Exposure**: Because uploads are unsigned, the original unshielded asset exists in Cloudinary under its `public_id`. A technical user who inspects network requests could theoretically reconstruct the original asset URL.
- **Production Hardening Roadmap**:
  1. **Authenticated Uploads**: Restrict uploads via `type=authenticated` through a lightweight serverless handler.
  2. **Signed Delivery URLs**: Sign transformed URLs with expiring tokens so raw assets are never publicly queryable.
  3. **Strict Transformations**: Enforce Cloudinary strict transformation rules so only pre-authorized blur pipelines execute.
  4. **EXIF/GPS Scrubbing**: Append `fl_strip_profile` to eradicate geolocation and camera metadata from uploads.

---

## 7. License

Licensed under the [MIT License](LICENSE).
