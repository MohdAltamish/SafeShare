import React, { useState, useEffect } from 'react';

/**
 * CompareView Component
 * Side-by-side comparison (stacked on mobile) with original vs protected view.
 * Features skeleton loaders, protected badge, and automatic fallback if OCR region transformation fails.
 */
export default function CompareView({
  originalUrl,
  protectedUrl,
  altText = 'Privacy protected image',
  fallbackWarning = null,
  onProtectedError = null,
}) {
  const [originalLoaded, setOriginalLoaded] = useState(false);
  const [protectedLoaded, setProtectedLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset loading states when URLs change
  useEffect(() => {
    setProtectedLoaded(false);
    setHasError(false);
  }, [protectedUrl]);

  useEffect(() => {
    setOriginalLoaded(false);
  }, [originalUrl]);

  const handleProtectedError = () => {
    setHasError(true);
    setProtectedLoaded(true);
    if (onProtectedError) {
      onProtectedError();
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Warning banner when text redaction add-on is unavailable */}
      {fallbackWarning && (
        <div
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3 text-amber-900 shadow-sm"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm font-medium">{fallbackWarning}</p>
        </div>
      )}

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Original (Private) */}
        <div className="flex flex-col bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Original (private)
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Internal only
            </span>
          </div>

          <div className="relative min-h-[260px] sm:min-h-[320px] max-h-[480px] bg-slate-100 flex items-center justify-center overflow-hidden">
            {/* Skeleton Loader */}
            {!originalLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-200 animate-pulse">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-slate-500 font-medium">Loading original...</span>
              </div>
            )}
            <img
              src={originalUrl}
              alt="Original unshielded image"
              onLoad={() => setOriginalLoaded(true)}
              className={`w-full h-full object-contain max-h-[480px] transition-opacity duration-300 ${
                originalLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>

        {/* Right Card: Protected (Safe to share) */}
        <div className="flex flex-col bg-white rounded-2xl border-2 border-emerald-500 ring-2 ring-emerald-500/20 overflow-hidden shadow-md">
          <div className="px-4 py-3 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-emerald-950">
                Protected (safe to share)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Protected
            </span>
          </div>

          <div className="relative min-h-[260px] sm:min-h-[320px] max-h-[480px] bg-slate-100 flex items-center justify-center overflow-hidden">
            {/* Skeleton Loader */}
            {!protectedLoaded && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-200 animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin"></div>
                <span className="text-xs text-slate-600 font-medium">
                  Applying privacy shield...
                </span>
              </div>
            )}

            {/* Error fallback state */}
            {hasError ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  Transformation preview unavailable
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Could not load protected preview with current settings. Check add-on enablement in Cloudinary.
                </p>
              </div>
            ) : (
              <img
                src={protectedUrl}
                alt={altText}
                onLoad={() => setProtectedLoaded(true)}
                onError={handleProtectedError}
                className={`w-full h-full object-contain max-h-[480px] transition-opacity duration-300 ${
                  protectedLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
