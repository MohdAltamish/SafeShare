# Build prompts (run in order, test after each)

## P1: Scaffold
"Create a Vite + React + Tailwind app named SafeShare. Add `.env.example` with VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET. Create the folder structure from docs/ARCHITECTURE.md with empty components. Add a clean header and footer per docs/UI-UX.md. Do not add extra libraries."

## P2: Upload
"In src/lib/cloudinary.js, load the Cloudinary Upload Widget script (https://upload-widget.cloudinary.com/global/all.js) once and expose openUploadWidget(onSuccess). Use the env vars, sources ['local','camera'], multiple false, clientAllowedFormats ['jpg','png','webp']. In UploadCard.jsx add an Upload button and 3 demo-image chips that set a public_id in App state. Show an error banner on failure."

## P3: URL builder
"Implement buildProtectedUrl(cloud, publicId, {faces, text, strength}) in src/lib/cloudinary.js using the chained transformation format in docs/ARCHITECTURE.md section 5. Add a small unit-style example in comments. Do not change the signature."

## P4: Compare view and controls
"Build CompareView.jsx showing Original and Protected images side by side (stacked on mobile) with labels, skeleton loaders on image load, and a fallback when the protected image fails to load (retry with faces-only). Build Controls.jsx with two accessible switches (role=switch) and a strength slider. Follow the visual style in docs/UI-UX.md."

## P5: Alt text and share
"Build SharePanel.jsx: show an editable alt-text textarea (prefilled from the Cloudinary caption, else from the first 3 tags as 'Photo containing X, Y, Z'), a Copy link button (clipboard API plus 'Link copied' toast), and a Download button for the protected image."

## P6: Polish and a11y
"Audit the app against the Accessibility section in docs/UI-UX.md. Fix focus rings, aria-live status messages, and contrast. Add empty, processing, error, and no-detection states. List what you changed."

## P7: Docs
"Write README.md (problem, features, architecture diagram from docs/ARCHITECTURE.md, setup steps, env vars, known limitations, license). Then write a Notion Build Log entry summarizing the commits so far."

## Debug prompt template
"Here is the error: <paste>. Here is the relevant file: <paste>. Find the root cause, propose the smallest fix, and explain it in 2 sentences. Do not refactor unrelated code."
