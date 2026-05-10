import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize CMS-supplied SVG markup before rendering with dangerouslySetInnerHTML.
 * Strips script tags, event handlers (onclick, onload, etc), javascript: URLs,
 * and foreignObject (which can host arbitrary HTML).
 */
export function sanitizeSvg(input: string | null | undefined): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: ['script', 'foreignObject'],
    FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
  });
}
