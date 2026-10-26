/**
 * SafeShare Cloudinary Core Logic & URL Transformation Engine
 * Strictly client-side: uses cloud name and unsigned upload preset.
 */

let widgetScriptPromise = null;

/**
 * Injects the Cloudinary Upload Widget script once into document head.
 * @returns {Promise<void>}
 */
export function loadWidgetScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.cloudinary) return Promise.resolve();

  if (!widgetScriptPromise) {
    widgetScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src*="upload-widget.cloudinary.com"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', (e) => reject(new Error('Failed to load Cloudinary widget script.')));
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Cloudinary upload widget script. Check network connection.'));
      document.head.appendChild(script);
    });
  }

  return widgetScriptPromise;
}

/**
 * Opens the Cloudinary Upload Widget with unsigned preset configuration.
 * Safely handles missing caption, tags, or OCR fields.
 *
 * @param {Function} onSuccess - Callback with { publicId, tags, caption, width, height }
 * @param {Function} onError - Callback with Error instance
 */
export async function openUploadWidget(onSuccess, onError) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    const err = new Error(
      'Missing Cloudinary configuration. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.'
    );
    if (onError) onError(err);
    return;
  }

  try {
    await loadWidgetScript();

    if (!window.cloudinary || !window.cloudinary.createUploadWidget) {
      throw new Error('Cloudinary Upload Widget is not available.');
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'camera'],
        multiple: false,
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxFileSize: 10000000, // 10MB limit
      },
      (error, result) => {
        if (error) {
          if (onError) onError(new Error(error.message || 'Upload encountered an error.'));
          return;
        }

        if (result && result.event === 'success') {
          const info = result.info || {};
          
          // Safe caption resolution from AI add-ons
          let caption = null;
          if (info.detection && info.detection.captioning && info.detection.captioning.data) {
            caption = info.detection.captioning.data.caption || null;
          } else if (typeof info.caption === 'string') {
            caption = info.caption;
          }

          // Safe tags resolution
          const tags = Array.isArray(info.tags) ? info.tags : [];

          if (onSuccess) {
            onSuccess({
              publicId: info.public_id,
              tags,
              caption,
              width: info.width || 0,
              height: info.height || 0,
            });
          }
        }
      }
    );

    widget.open();
  } catch (err) {
    if (onError) onError(err instanceof Error ? err : new Error(String(err)));
  }
}

/**
 * Builds a transformed privacy-safe Cloudinary image delivery URL.
 * Chained transformations:
 * - Faces: e_blur_faces:<strength>
 * - Text: e_blur_region:<strength>,g_ocr_text (requires OCR add-on)
 * - Optimization: q_auto / f_auto / c_limit,w_1000
 *
 * Example:
 * buildProtectedUrl('demo', 'sample', { faces: true, text: true, strength: 1000 })
 * => 'https://res.cloudinary.com/demo/image/upload/e_blur_faces:1000/e_blur_region:1000,g_ocr_text/q_auto/f_auto/c_limit,w_1000/sample'
 *
 * @param {string} cloud - Cloud name
 * @param {string} publicId - Cloudinary asset public ID
 * @param {Object} options - { faces, text, strength }
 * @returns {string} Fully qualified CDN image URL
 */
export function buildProtectedUrl(cloud, publicId, { faces = true, text = true, strength = 1000 } = {}) {
  if (!cloud || !publicId) return '';
  const parts = [];

  if (faces) {
    parts.push(`e_blur_faces:${strength}`);
  }

  if (text) {
    parts.push(`e_blur_region:${strength},g_ocr_text`);
  }

  parts.push('q_auto', 'f_auto', 'c_limit,w_1000');

  return `https://res.cloudinary.com/${cloud}/image/upload/${parts.join('/')}/${publicId}`;
}

/**
 * Builds the original Cloudinary image URL with auto-format/quality optimization.
 *
 * @param {string} cloud - Cloud name
 * @param {string} publicId - Cloudinary asset public ID
 * @returns {string} Fully qualified CDN image URL
 */
export function buildOriginalUrl(cloud, publicId) {
  if (!cloud || !publicId) return '';
  return `https://res.cloudinary.com/${cloud}/image/upload/q_auto/f_auto/c_limit,w_1000/${publicId}`;
}

/**
 * Builds a direct download URL for the protected image with fl_attachment.
 *
 * @param {string} cloud - Cloud name
 * @param {string} publicId - Cloudinary asset public ID
 * @param {Object} options - Transformation options
 * @returns {string} Fully qualified download URL
 */
export function buildDownloadUrl(cloud, publicId, { faces = true, text = true, strength = 1000 } = {}) {
  if (!cloud || !publicId) return '';
  const parts = [];

  if (faces) {
    parts.push(`e_blur_faces:${strength}`);
  }

  if (text) {
    parts.push(`e_blur_region:${strength},g_ocr_text`);
  }

  parts.push('fl_attachment', 'q_auto', 'f_auto', 'c_limit,w_1000');

  return `https://res.cloudinary.com/${cloud}/image/upload/${parts.join('/')}/${publicId}`;
}

/**
 * Generates accessible alt text from AI captioning or image tags with graceful fallback.
 *
 * @param {string|null} caption - Cloudinary AI caption
 * @param {string[]} tags - Categorization tags
 * @returns {string} Screen-reader friendly alt text
 */
export function buildAltText(caption, tags) {
  if (typeof caption === 'string' && caption.trim().length > 0) {
    return caption.trim();
  }

  if (Array.isArray(tags) && tags.length > 0) {
    const validTags = tags
      .filter((t) => typeof t === 'string' && t.trim().length > 0)
      .slice(0, 3);
    if (validTags.length > 0) {
      return `Photo containing ${validTags.join(', ')}`;
    }
  }

  return 'Uploaded photo';
}

