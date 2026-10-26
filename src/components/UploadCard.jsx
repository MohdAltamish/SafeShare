import React from 'react';

/**
 * UploadCard Component
 * Provides Cloudinary Upload Widget trigger, demo image quick-select chips,
 * and accessible error banner with retry.
 */
export default function UploadCard({
  onUpload,
  onSelectDemo,
  demoImages = [],
  error = null,
  onRetry = null,
  loading = false,
  activePublicId = null,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Error Banner with role="alert" */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-900 shadow-sm transition-all"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0 text-red-600 mt-0.5 sm:mt-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">Upload issue detected</p>
              <p className="text-xs sm:text-sm text-red-800 break-words">{error}</p>
            </div>
          </div>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 shrink-0 cursor-pointer"
            >
              Retry Upload
            </button>
          )}
        </div>
      )}

      {/* Main Upload Dropcard */}
      <div className="relative rounded-2xl border-2 border-dashed border-slate-300 bg-white p-5 sm:p-12 text-center shadow-sm hover:border-indigo-400 transition-colors">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
          {/* Cloud Upload Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
            <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>

          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-bold text-slate-900">
              Upload an image to protect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Supports JPG, PNG, WEBP up to 10MB.
            </p>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onUpload}
            disabled={loading}
            className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-indigo-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 text-sm sm:text-base cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Upload photo</span>
              </>
            )}
          </button>

          {/* Privacy reassurance microcopy */}
          <p className="text-xs text-slate-500">
            Original images stay private. Nothing sensitive is stored on our servers.
          </p>
        </div>

        {/* Demo Image Quick-Select Chips */}
        {demoImages.length > 0 && (
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex flex-col items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Or try a preloaded demo:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {demoImages.map((demo) => {
                const isActive = activePublicId === demo.publicId;
                return (
                  <button
                    key={demo.id}
                    type="button"
                    aria-label={`Load demo: ${demo.label}`}
                    onClick={() => onSelectDemo(demo)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300'
                    }`}
                  >
                    {demo.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
