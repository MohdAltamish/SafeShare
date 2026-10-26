import React from 'react';

/**
 * Controls Component
 * Accessible privacy switches (Blur faces, Hide text) and strength selector (Low/Med/High).
 * All toggles use role="switch", aria-checked, and keyboard triggers for WCAG AA compliance.
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
    { label: 'Low', value: 500, description: 'Mild blur (500)' },
    { label: 'Med', value: 1000, description: 'Standard blur (1000)' },
    { label: 'High', value: 1500, description: 'Heavy redaction (1500)' },
  ];

  const handleKeyDownSwitch = (e, currentVal, toggleFn) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleFn(!currentVal);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        {/* Toggles Group */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          {/* Face Blur Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="switch-blur-faces"
              role="switch"
              aria-checked={faces}
              aria-label="Blur detected faces"
              onClick={() => onToggleFaces(!faces)}
              onKeyDown={(e) => handleKeyDownSwitch(e, faces, onToggleFaces)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                faces ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  faces ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <label
              htmlFor="switch-blur-faces"
              className="text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer select-none"
            >
              Blur faces
            </label>
          </div>

          {/* Text Redaction Toggle (hidden or disabled if text redaction is unavailable) */}
          {textAvailable && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="switch-hide-text"
                role="switch"
                aria-checked={text}
                aria-label="Redact visible text and numbers via OCR"
                onClick={() => onToggleText(!text)}
                onKeyDown={(e) => handleKeyDownSwitch(e, text, onToggleText)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                  text ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    text ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <label
                htmlFor="switch-hide-text"
                className="text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer select-none"
              >
                Hide text (OCR)
              </label>
            </div>
          )}
        </div>

        {/* Strength Selector Group (Low: 500 / Med: 1000 / High: 1500) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
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
                  aria-label={opt.description}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => onChangeStrength(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      onChangeStrength(opt.value);
                    }
                  }}
                  className={`px-3 sm:px-3.5 py-1 text-xs font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer ${
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
