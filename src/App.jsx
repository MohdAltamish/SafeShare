import React, { useState, useMemo } from 'react';
import UploadCard from './components/UploadCard.jsx';
import CompareView from './components/CompareView.jsx';
import Controls from './components/Controls.jsx';
import SharePanel from './components/SharePanel.jsx';
import {
  openUploadWidget,
  buildAltText,
  buildOriginalUrl,
  buildProtectedUrl,
  buildDownloadUrl,
} from './lib/cloudinary.js';

// TODO: replace with my uploaded demo public_ids
export const DEMO_IMAGES = [
  {
    id: 'demo-group',
    label: 'Group Photo',
    publicId: 'cld-sample-4',
    caption: 'A group of friends laughing and celebrating together outdoors',
    tags: ['group', 'people', 'celebration'],
  },
  {
    id: 'demo-card',
    label: 'ID Card / Notice',
    publicId: 'cld-sample-2',
    caption: 'Document paper with personal contact details and phone number',
    tags: ['document', 'text', 'paper'],
  },
  {
    id: 'demo-board',
    label: 'Campus Notice Board',
    publicId: 'cld-sample-3',
    caption: 'University notice board with announcements and notices',
    tags: ['notice board', 'announcement', 'poster'],
  },
];

export default function App() {
  const [image, setImage] = useState(null);
  const [faces, setFaces] = useState(true);
  const [text, setText] = useState(true);
  const [textAvailable, setTextAvailable] = useState(true);
  const [fallbackWarning, setFallbackWarning] = useState(null);
  const [strength, setStrength] = useState(1000);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [showNoSensitiveNote, setShowNoSensitiveNote] = useState(true);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dgrzeojzd';

  const handleSelectDemo = (demo) => {
    setError(null);
    setFallbackWarning(null);
    setTextAvailable(true);
    setShowNoSensitiveNote(true);
    const resolvedAlt = buildAltText(demo.caption, demo.tags);
    setImage({
      publicId: demo.publicId,
      caption: demo.caption,
      tags: demo.tags,
      altText: resolvedAlt,
    });
    setStatusMessage(`Loaded demo image: ${demo.label}`);
  };

  const handleUpload = () => {
    setError(null);
    setLoading(true);
    setStatusMessage('Opening Cloudinary upload widget...');

    openUploadWidget(
      (result) => {
        setLoading(false);
        setFallbackWarning(null);
        setTextAvailable(true);
        setShowNoSensitiveNote(true);
        const resolvedAlt = buildAltText(result.caption, result.tags);
        setImage({
          publicId: result.publicId,
          caption: result.caption,
          tags: result.tags,
          altText: resolvedAlt,
        });
        setStatusMessage('Image uploaded and processed successfully.');
      },
      (err) => {
        setLoading(false);
        setError(err.message || 'Upload failed. Try a smaller JPG or PNG.');
        setStatusMessage('Upload failed.');
      }
    );
  };

  const handleProtectedError = () => {
    if (textAvailable && text) {
      setTextAvailable(false);
      setText(false);
      setFallbackWarning('Text redaction unavailable, showing face protection only.');
      setStatusMessage('Text redaction unavailable, switched to face protection only.');
    } else {
      setStatusMessage('Protected image preview failed to load.');
    }
  };

  const handleResetImage = () => {
    setImage(null);
    setError(null);
    setFallbackWarning(null);
    setTextAvailable(true);
    setStatusMessage('Cleared photo. Ready to upload a new one.');
  };

  const handleUpdateAltText = (newAlt) => {
    setImage((prev) => (prev ? { ...prev, altText: newAlt } : null));
  };

  // Compute live URLs
  const originalUrl = useMemo(() => {
    if (!image) return '';
    return buildOriginalUrl(cloudName, image.publicId);
  }, [cloudName, image]);

  const protectedUrl = useMemo(() => {
    if (!image) return '';
    return buildProtectedUrl(cloudName, image.publicId, {
      faces,
      text: textAvailable && text,
      strength,
    });
  }, [cloudName, image, faces, text, textAvailable, strength]);

  const downloadUrl = useMemo(() => {
    if (!image) return '';
    return buildDownloadUrl(cloudName, image.publicId, {
      faces,
      text: textAvailable && text,
      strength,
    });
  }, [cloudName, image, faces, text, textAvailable, strength]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-auto sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 py-2.5 sm:py-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">SafeShare</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              MVP
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-600 text-center sm:text-right">
            Share photos, not privacy.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
        <section className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Share photos, <span className="text-indigo-600">not privacy.</span>
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
            Auto-blur faces, redact phone numbers, emails &amp; IDs, and generate AI-powered alt text in seconds with Cloudinary AI.
          </p>
        </section>

        {/* Live region for accessibility screen-reader announcements */}
        <div aria-live="polite" className="sr-only">
          {statusMessage}
        </div>

        {/* Dynamic State Container */}
        <div id="safeshare-app-content" className="space-y-6">
          {!image ? (
            /* Empty State: UploadCard with demo chips */
            <UploadCard
              onUpload={handleUpload}
              onSelectDemo={handleSelectDemo}
              demoImages={DEMO_IMAGES}
              error={error}
              onRetry={handleUpload}
              loading={loading}
              activePublicId={null}
            />
          ) : (
            /* Active Image State: Controls + CompareView + SharePanel */
            <div className="space-y-5 sm:space-y-6">
              {/* Asset Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Asset ID:
                  </span>
                  <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 break-all">
                    {image.publicId}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={handleResetImage}
                  className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer text-center"
                >
                  Upload another photo
                </button>
              </div>

              {/* No Sensitive Content Note (dismissible) */}
              {showNoSensitiveNote && (
                <div
                  role="status"
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 sm:p-4 flex items-center justify-between gap-3 text-slate-700 shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <p className="text-xs sm:text-sm">
                      <span className="font-semibold text-slate-800">Privacy Shield Active:</span> If no faces or text are present in this image, it remains unaltered.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNoSensitiveNote(false)}
                    aria-label="Dismiss note"
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Interactive Privacy Controls */}
              <Controls
                faces={faces}
                onToggleFaces={setFaces}
                text={text}
                onToggleText={setText}
                textAvailable={textAvailable}
                strength={strength}
                onChangeStrength={setStrength}
              />

              {/* Side-by-side Compare View */}
              <CompareView
                originalUrl={originalUrl}
                protectedUrl={protectedUrl}
                altText={image.altText}
                fallbackWarning={fallbackWarning}
                onProtectedError={handleProtectedError}
              />

              {/* Share and Download Panel */}
              <SharePanel
                protectedUrl={protectedUrl}
                downloadUrl={downloadUrl}
                altText={image.altText}
                onUpdateAltText={handleUpdateAltText}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="font-semibold text-slate-800">Cloudinary AI</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
