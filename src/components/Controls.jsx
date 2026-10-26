import React from 'react';

/**
 * Controls Component
 * Accessible privacy switches (Blur faces, Hide text) and strength selector (Low/Med/High).
 * All toggles use role="switch" and aria-checked for WCAG AA compliance.
 */
export default function Controls({
  faces,
  onToggleFaces,
  text,
  onToggleText,
  textAvailable = true,
  strength,
  onChangeStrength,
}) {
  const strengthOptions = [
    { label: 'Low', value: 500 },
    { label: 'Med', value: 1000 },
    { label: 'High', value: 1500 },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Toggles Group */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Face Blur Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={faces}
              onClick={() => onToggleFaces(!faces)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                faces ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span className="sr-only">Toggle face blur</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  faces ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm font-semibold text-slate-800 select-none">
              Blur faces
            </span>
          </div>

          {/* Text Redaction Toggle (hidden or disabled if text redaction is unavailable) */}
          {textAvailable && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={text}
                onClick={() => onToggleText(!text)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                  text ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span className="sr-only">Toggle text redaction</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    text ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm font-semibold text-slate-800 select-none">
                Hide text (OCR)
              </span>
            </div>
          )}
        </div>

        {/* Strength Selector Group (Low: 500 / Med: 1000 / High: 1500) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Strength:
          </span>
          <div
            role="radiogroup"
            aria-label="Blur strength selection"
            className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200"
          >
            {strengthOptions.map((opt) => {
              const isSelected = strength === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onChangeStrength(opt.value)}
                  className={`px-3.5 py-1 text-xs font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
