import { encodePNG } from './png.mjs';
import { drawText, drawSprite, SKULL } from './bitfont.mjs';

/**
 * Procedural serpent sigils.
 *
 * Every entry gets a unique open-graph image, generated per-pixel from a hash
 * of its slug. No fonts, no rasteriser, no external assets: a coiled spiral
 * body with a scale lattice, an eye, a graduated ring, grain and a vignette.
 *
 * The point is that the sigil is *derived* from the entry rather than chosen
 * for it — the same way an animal's markings are derived from its genome
 * rather than from an art department.
 */

export const SIGIL_VERSION = 6;

/** FNV-1a, because we need determinism, not cryptography. */
function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const mix = (a, b, t) => a + (b - a) * t;

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** HSL → RGB, components in 0..1. */
function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [r + m, g + m, b + m];
}

/**
 * A 256-entry ramp through the body's two hues at varying lightness, so the
 * inner loop can look colour up instead of running hsl() three times per
 * pixel. Same output, roughly a fifth of the time.
 */
function buildRamp(hueA, hueB, sat) {
  const HUES = 32;
  const LIGHTS = 64;
  const ramp = new Float32Array(HUES * LIGHTS * 3);
  for (let h = 0; h < HUES; h++) {
    const hue = mix(hueA, hueB, h / (HUES - 1));
    for (let l = 0; l < LIGHTS; l++) {
      const [r, g, b] = hsl(hue, sat, (l / (LIGHTS - 1)) * 0.9);
      const i = (h * LIGHTS + l) * 3;
      ramp[i] = r;
      ramp[i + 1] = g;
      ramp[i + 2] = b;
    }
  }
  return { ramp, HUES, LIGHTS };
}

/**
 * @param {object} opts
 * @param {string} opts.seed        stable identity, normally the entry slug
 * @param {number} opts.hue         0–360, the entry's colourway
 * @param {number} [opts.width]
 * @param {number} [opts.height]
 * @param {number} [opts.weight]    0–100, how dominant the animal is in frame
 * @returns {Uint8Array} RGB bytes
 */
export function renderSigil({ seed, hue = 140, width = 1200, height = 630, weight = 70 }) {
  const h32 = hash32(`${seed}:${SIGIL_VERSION}`);
  const rnd = mulberry32(h32);

  // Every knob below is derived from the hash, so each entry is visibly its
  // own animal while the family resemblance holds.
  const coils = 3 + Math.floor(rnd() * 4);
  const phase = rnd() * Math.PI * 2;
  const taper = 0.45 + rnd() * 0.35;
  const scaleAlong = 26 + Math.floor(rnd() * 30);
  const scaleAcross = 2 + Math.floor(rnd() * 3);
  const hue2 = hue + (rnd() < 0.5 ? -1 : 1) * (24 + rnd() * 40);
  const tilt = (rnd() - 0.5) * 0.5;
  const cx = 0.5 + (rnd() - 0.5) * 0.10;
  const cy = 0.44 + (rnd() - 0.5) * 0.06;
  const ticks = 36 + Math.floor(rnd() * 36) * 2;

  // The arc the animal actually occupies. Starting away from the origin keeps
  // the innermost turn from collapsing into a whirlpool.
  const tStart = phase + 3.4;
  const tEnd = tStart + coils * Math.PI * 2;

  // Solve the spiral constant backwards from where we want the tail to land,
  // so the whole animal is in frame whatever the coil count came out as.
  const outerR = 0.34 + rnd() * 0.07;
  const tightness = (2 * outerR) / tEnd;
  const turnGap = tightness * Math.PI;
  const thickness = turnGap * (0.24 + rnd() * 0.1 + (weight / 100) * 0.06);

  const ringR = outerR + 0.10 + rnd() * 0.05;

  const out = new Uint8Array(width * height * 3);
  const aspect = width / height;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);

  // Background wash: two hue-shifted pools, so the plate never reads as flat black.
  const [bgR, bgG, bgB] = hsl(hue, 0.55, 0.055);
  const [glowR, glowG, glowB] = hsl(hue2, 0.7, 0.16);
  const [ringR2, ringG2, ringB2] = hsl(hue2, 0.35, 0.55);
  const [eR, eG, eB] = hsl(hue + 40, 0.9, 0.72);
  // Shared reaper furniture: every plate burns from the bottom edge, whatever
  // colour its animal is.
  const [fR, fG, fB] = hsl(18, 0.92, 0.5);
  const { ramp, HUES, LIGHTS } = buildRamp(hue, hue2, 0.66);

  // Head position, constant across the plate. The eye sits just off the
  // centreline, on the outside of the first turn.
  const headR = tightness * tStart * 0.5;
  const eyeR = thickness * 0.62;
  const ex = Math.cos(tStart - phase) * (headR + thickness * 0.45);
  const ey = Math.sin(tStart - phase) * (headR + thickness * 0.45);

  for (let py = 0; py < height; py++) {
    const v = py / height;
    for (let px = 0; px < width; px++) {
      const u = px / width;

      // Centre and correct for aspect so the coil stays circular.
      let x = (u - cx) * aspect;
      let y = v - cy;
      const rx = x * cosT - y * sinT;
      const ry = x * sinT + y * cosT;
      x = rx;
      y = ry;

      const r = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);

      // Distance to the nearest turn of an Archimedean spiral. Walking k
      // through the winding numbers gives us the whole coil for the price of
      // a short loop. Candidates outside the animal's arc are rejected so the
      // head and tail can end where they should rather than at the branch cut
      // of atan2.
      let bodyD = 1e9;
      let along = tStart;
      for (let k = 0; k <= coils + 2; k++) {
        const t = theta + phase + k * Math.PI * 2;
        if (t < tStart - 0.9 || t > tEnd + 0.9) continue;
        const rk = tightness * t * 0.5;
        const d = Math.abs(r - rk);
        if (d < bodyD) {
          bodyD = d;
          along = t;
        }
      }

      // Position along the animal, 0 at the head and 1 at the tip of the tail.
      const aNorm = (along - tStart) / (tEnd - tStart);

      // Thins towards the tail; swells slightly at the head.
      const headBulge = 1 + 0.55 * Math.exp(-aNorm * aNorm * 260);
      const halfWidth = thickness * (1 - taper * clamp01(aNorm)) * headBulge;
      const edge = halfWidth * 0.3 + 0.0012;
      let body = 1 - smoothstep(halfWidth - edge, halfWidth + edge, bodyD);

      // Round off both ends instead of cutting them at a winding number.
      body *= smoothstep(-0.035, 0.012, aNorm) * (1 - smoothstep(0.94, 1.0, aNorm));

      // Scale lattice: a brick-offset diamond field running along the body.
      const acrossSigned = clamp01((bodyD / halfWidth) * 0.5 + 0.5);
      const rowF = along * (scaleAlong / (Math.PI * 2));
      const row = Math.floor(acrossSigned * scaleAcross * 2);
      const cell = rowF + (row % 2 ? 0.5 : 0);
      const fr = cell - Math.floor(cell);
      const scaleEdge = Math.abs(fr - 0.5) * 2;
      const scaleShade = mix(0.62, 1.12, Math.pow(scaleEdge, 1.6));

      // Graduated ring — the instrument-dial idea, faint enough to be texture.
      const ringD = Math.abs(r - ringR);
      const tickPhase = ((theta + Math.PI) / (Math.PI * 2)) * ticks;
      const tickF = Math.abs(tickPhase - Math.floor(tickPhase) - 0.5) * 2;
      const ring =
        (1 - smoothstep(0.0, 0.006, ringD)) * 0.10 +
        (1 - smoothstep(0.0, 0.018, ringD)) * smoothstep(0.72, 0.98, tickF) * 0.30;

      // The eye sits at the head, on the innermost turn.
      const edx = x - ex;
      const edy = y - ey;
      const eyeD = Math.sqrt(edx * edx + edy * edy);
      const eye = eyeD > eyeR ? 0 : (1 - smoothstep(eyeR * 0.35, eyeR, eyeD)) * 0.95;

      // Radial background glow, then vignette.
      const glow = Math.pow(1 - clamp01(r / 0.85), 2.2);
      let R = mix(bgR, glowR, glow * 0.55);
      let G = mix(bgG, glowG, glow * 0.55);
      let B = mix(bgB, glowB, glow * 0.55);

      if (ring > 0.001) {
        R = mix(R, ringR2, ring);
        G = mix(G, ringG2, ring);
        B = mix(B, ringB2, ring);
      }

      if (body > 0.001) {
        // Light comes from upper left; the top of each coil catches it.
        const lightN = clamp01(0.5 - (y * 1.4 + x * 0.5));
        const fall = 1 - clamp01(bodyD / halfWidth);
        const spec = fall * fall * fall * 0.5;
        const bodyLight = clamp01((0.16 + lightN * 0.3 + spec * 0.55) * scaleShade);

        const hi = Math.min(HUES - 1, (clamp01(aNorm * 0.9 + acrossSigned * 0.05) * (HUES - 1)) | 0);
        const li = Math.min(LIGHTS - 1, ((bodyLight / 0.9) * (LIGHTS - 1)) | 0);
        const ci = (hi * LIGHTS + li) * 3;

        R = mix(R, ramp[ci], body);
        G = mix(G, ramp[ci + 1], body);
        B = mix(B, ramp[ci + 2], body);
      }

      if (eye > 0.001) {
        R = mix(R, eR, eye);
        G = mix(G, eG, eye);
        B = mix(B, eB, eye);
      }

      const fire = Math.pow(clamp01((v - 0.52) / 0.48), 2.4) * 0.42;
      if (fire > 0.002) {
        R = mix(R, fR, fire);
        G = mix(G, fG, fire);
        B = mix(B, fB, fire);
      }

      const vx = (u - 0.5) * 1.15;
      const vy = v - 0.5;
      const vig = 1 - 0.75 * Math.pow(clamp01(Math.sqrt(vx * vx + vy * vy) * 1.7), 2.4);
      R *= vig;
      G *= vig;
      B *= vig;

      const i = (py * width + px) * 3;
      out[i] = clamp01(R) * 255;
      out[i + 1] = clamp01(G) * 255;
      out[i + 2] = clamp01(B) * 255;
    }
  }

  return out;
}

/** Darken a band at the foot of the plate so a caption can sit on it. */
function scrim(buf, width, height, from, strength) {
  for (let y = from; y < height; y++) {
    const t = (y - from) / (height - from);
    const k = 1 - strength * smoothstep(0, 1, t);
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      buf[i] *= k;
      buf[i + 1] *= k;
      buf[i + 2] *= k;
    }
  }
}

/** Deterministic embers climbing out of the fire wash at the foot of a plate. */
function embers(buf, width, height, seed, count = 130) {
  const rnd = mulberry32(hash32(`${seed}:embers:${SIGIL_VERSION}`));
  const [hotR, hotG, hotB] = hsl(32, 1, 0.68);
  const [dimR, dimG, dimB] = hsl(14, 0.95, 0.5);

  for (let n = 0; n < count; n++) {
    const x = rnd() * width;
    // Biased towards the bottom, where the fire is.
    const t = Math.pow(rnd(), 1.9);
    const y = height - t * height * 0.92;
    const radius = 0.9 + rnd() * 1.9;
    const heat = clamp01(1 - t * 0.95);
    const alpha = (0.25 + rnd() * 0.6) * heat;
    if (alpha < 0.02) continue;

    const cr = mix(dimR, hotR, heat);
    const cg = mix(dimG, hotG, heat);
    const cb = mix(dimB, hotB, heat);

    const r0 = Math.ceil(radius + 1);
    for (let dy = -r0; dy <= r0; dy++) {
      const py = Math.round(y) + dy;
      if (py < 0 || py >= height) continue;
      for (let dx = -r0; dx <= r0; dx++) {
        const px = Math.round(x) + dx;
        if (px < 0 || px >= width) continue;
        const d = Math.sqrt(dx * dx + dy * dy);
        const a = alpha * (1 - smoothstep(radius * 0.4, radius + 0.8, d));
        if (a <= 0.004) continue;
        const i = (py * width + px) * 3;
        buf[i] += (cr - buf[i]) * a;
        buf[i + 1] += (cg - buf[i + 1]) * a;
        buf[i + 2] += (cb - buf[i + 2]) * a;
      }
    }
  }
}

/**
 * A full open-graph plate: sigil, embers, scrim, hairline rule, a specimen
 * label and a pixel skull stamped in the corner like a hazard mark.
 * Truncation is by character count because the font is fixed-width.
 */
export function sigilPlate({ seed, hue = 140, weight = 70, title, kicker, footer }) {
  const width = 1200;
  const height = 630;
  const buf = renderSigil({ seed, hue, weight, width, height });

  // Scrim first, embers second: they are the brightest thing on the plate and
  // should sit over the darkened band rather than be swallowed by it.
  scrim(buf, width, height, 380, 0.72);
  embers(buf, width, height, seed);

  const M = 72;
  const [aR, aG, aB] = hsl(hue + 30, 0.65, 0.62).map((c) => c * 255);
  const white = [244, 246, 245];
  const dim = [150, 158, 154];

  // Hairline rule, then kicker, title, footer — a museum label, essentially.
  for (let x = M; x < width - M; x++) {
    const i = (498 * width + x) * 3;
    buf[i] = mix(buf[i], aR, 0.55);
    buf[i + 1] = mix(buf[i + 1], aG, 0.55);
    buf[i + 2] = mix(buf[i + 2], aB, 0.55);
  }

  if (kicker) drawText(buf, width, height, kicker.slice(0, 46), M, 444, 3, [aR, aG, aB], { tracking: 2 });

  const t = (title ?? '').slice(0, 30);
  const scale = t.length > 24 ? 5 : t.length > 18 ? 6 : 7;
  drawText(buf, width, height, t, M, 514, scale, white, { tracking: 1 });

  if (footer) drawText(buf, width, height, footer.slice(0, 60), M, height - 46, 3, dim, { tracking: 1 });

  // Hazard stamp, bottom right, opposite the label.
  const stampScale = 6;
  const stampW = SKULL[0].length * stampScale;
  const stampH = SKULL.length * stampScale;
  const ember = hsl(24, 1, 0.6).map((c) => c * 255);
  drawSprite(buf, width, height, SKULL, width - M - stampW, height - 62 - stampH, stampScale, ember, 0.9);

  return encodePNG(width, height, buf);
}

export function sigilPNG(opts) {
  const width = opts.width ?? 1200;
  const height = opts.height ?? 630;
  return encodePNG(width, height, renderSigil({ ...opts, width, height }));
}
