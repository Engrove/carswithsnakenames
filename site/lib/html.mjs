/** Tiny HTML helpers. No template engine; the corpus is the complicated part. */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** Escape for a JSON-LD or inline script body: closing tags must not break out. */
export function escJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** Drop markup and collapse whitespace — for meta descriptions and feeds. */
export function plain(value) {
  return String(value ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncate(value, max = 158) {
  const s = plain(value);
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`;
}

/**
 * Typographic polish on plain prose: curly quotes, en dashes in numeric
 * ranges, and non-breaking spaces where a line break would read badly.
 * Input is escaped first, so this only ever rewrites entities and plain text.
 */
export function typo(value) {
  return esc(value)
    .replace(/(\w)&#39;(\w)/g, '$1’$2')
    .replace(/&#39;/g, '’')
    .replace(/&quot;([^&]*?)&quot;/g, '“$1”')
    .replace(/(\d)\s?-\s?(\d)/g, '$1–$2')
    .replace(/\s--\s/g, ' — ')
    .replace(/\b(\d+)\s(mph|km\/h|hp|cu|mm|rpm)\b/g, '$1&nbsp;$2');
}

export const raw = (s) => s;

/** Join, dropping null/undefined/false so templates can use && inline. */
export function join(parts, sep = '\n') {
  return parts.filter(Boolean).join(sep);
}

export function attrs(map) {
  return Object.entries(map)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
