# SafeShare: UI/UX Spec

## Design principles
1. One screen, one job: upload, see result, share.
2. Show the before/after contrast immediately. It is the demo's wow moment.
3. Trust cues: shield icon, plain language, "nothing is stored by us".

## Layout (single page)
1. **Header:** logo "SafeShare" with shield icon, tagline "Share photos, not privacy."
2. **Hero and upload card:** drag-and-drop zone with an "Upload photo" button (opens Cloudinary widget). Below it, "Try a demo image" chips: Group photo, ID card, Notice board.
3. **Result section (after upload):**
   - Left: Original (labeled "Original, private")
   - Right: Protected (labeled "Protected, safe to share")
   - Optional draggable before/after slider on mobile
4. **Controls row:** toggles [Blur faces] [Hide text], strength slider (Low/Med/High).
5. **Share panel:** Alt text (editable textarea), [Copy link], [Download].
6. **Footer:** "Powered by Cloudinary", GitHub link, license.

## Wireframe
```
+--------------------------------------------+
| [shield] SafeShare      Share photos, not privacy |
+--------------------------------------------+
|        [ Drop a photo or Upload ]          |
|   Try: (Group) (ID card) (Notice board)    |
+--------------------------------------------+
|  Original (private) |  Protected (safe)    |
|  [ image ]          |  [ image ]           |
+--------------------------------------------+
| [x] Blur faces  [x] Hide text  Strength: ==o==
| Alt text: [ A group of students smiling... ]
| [Copy link] [Download]                     |
+--------------------------------------------+
```

## Visual style
- Font: Inter. Rounded-xl cards, soft shadows.
- Colors: Primary `#4F46E5` (indigo), Success `#16A34A`, Danger `#DC2626`, Background `#F8FAFC`, Text `#0F172A`.
- Protected image gets a green outline and badge. Original gets a gray outline.

## States
| State | Behavior |
|-------|----------|
| Empty | Upload card plus demo chips, no result section |
| Uploading | Progress bar in widget, then skeleton loaders |
| Processing | Skeleton plus "Applying privacy shield..." |
| Success | Both images, controls enabled, toast "Link copied" on copy |
| Error | Inline red banner, "Upload failed. Try a smaller JPG or PNG." with a retry button |
| No faces or text found | Info note: "Nothing sensitive detected, image is unchanged." |

## Accessibility
- All buttons are keyboard focusable with visible focus rings
- Toggles use `role="switch"` and `aria-checked`
- Images have `alt` (the protected image uses the generated alt text)
- Contrast of 4.5:1 or better. Don't rely on color alone for state.
- `aria-live="polite"` on status messages

## Microcopy
- CTA: "Protect my photo"
- Success: "Done. Faces and text are protected."
- Privacy note: "Original stays private to you. Share only the protected link."
