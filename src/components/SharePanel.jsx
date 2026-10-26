import React, { useState } from 'react';

/**
 * SharePanel Component
 * Provides editable alt text, copyable protected link with toast notification,
 * and direct image download.
 */
export default function SharePanel({
  protectedUrl,
  downloadUrl,
  altText = '',
  onUpdateAltText,
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyLink = async () => {
    if (!protectedUrl) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(protectedUrl);
      } else {
        // Fallback for older or insecure contexts
        const textArea = document.createElement('textarea');
        textArea.value = protectedUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // In case of error, select link for user manual copy
      window.prompt('Copy this protected link:', protectedUrl);
    }
  };

  const handleDownload = async () => {
    if (!protectedUrl) return;
    setDownloading(true);

    try {
      // Fetch as blob to trigger native file save with custom filename
      const response = await fetch(downloadUrl || protectedUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `safeshare-protected-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open attachment url directly in new tab
      window.open(downloadUrl || protectedUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Share &amp; Export Protected Asset
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Share the protected URL or download the privacy-safe image.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Ready to share
        </span>
      </div>

      {/* Editable Alt Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="safeshare-alt-text" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Generated Alt Text (Screen Reader Accessible)
          </label>
          <span className="text-[11px] text-slate-400">
            Editable
          </span>
        </div>
        <textarea
          id="safeshare-alt-text"
          rows={3}
          value={altText}
          onChange={(e) => onUpdateAltText && onUpdateAltText(e.target.value)}
          placeholder="Describe this image for visually impaired users..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:border-transparent transition-all resize-y"
        />
        <p className="text-xs text-slate-500">
          Generated automatically via Cloudinary AI captioning and categorization.
        </p>
      </div>

      {/* Action Row: Copy Link & Download */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        {/* Copy Link Button */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm shadow-indigo-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600 cursor-pointer text-sm"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                <span>Copy Shareable Link</span>
              </>
            )}
          </button>

          {/* Toast Notification for Screen-readers & Visual Confirmation */}
          {copied && (
            <div
              role="status"
              aria-live="polite"
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Link copied to clipboard</span>
            </div>
          )}
        </div>

        {/* Download Protected Image Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 cursor-pointer text-sm shrink-0 disabled:opacity-50"
        >
          {downloading ? (
            <>
              <svg className="animate-spin w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Preparing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download Image</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
