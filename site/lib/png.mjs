import zlib from 'node:zlib';

/**
 * A minimal, dependency-free PNG encoder.
 *
 * We generate one unique open-graph image per entry, procedurally. Pulling in
 * sharp or resvg for that would mean a native binary in the Cloudflare Pages
 * build for something Node's own zlib can do in eighty lines.
 *
 * Colour type 2 (truecolour, 8-bit) with adaptive per-scanline filtering,
 * which is what makes smooth procedural gradients compress to something
 * reasonable rather than to two megabytes.
 */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/**
 * Filter one scanline five ways and keep whichever has the smallest sum of
 * absolute differences — the standard heuristic from the PNG spec's own
 * recommendations. Costs a little build time, saves a lot of bytes.
 *
 * `scratch` holds five reusable buffers; allocating them per scanline was
 * measurably the slowest part of encoding a 1200x630 plate.
 */
function filterScanline(cur, prev, bpp, scratch) {
  const n = cur.length;
  const [none, sub, up, avg, pae] = scratch;

  cur.copy(none);
  for (let i = 0; i < n; i++) {
    const left = i >= bpp ? cur[i - bpp] : 0;
    const upLeft = i >= bpp ? prev[i - bpp] : 0;
    sub[i] = (cur[i] - left) & 0xff;
    up[i] = (cur[i] - prev[i]) & 0xff;
    avg[i] = (cur[i] - ((left + prev[i]) >> 1)) & 0xff;
    pae[i] = (cur[i] - paeth(left, prev[i], upLeft)) & 0xff;
  }

  let bestType = 0;
  let bestBuf = none;
  let bestScore = Infinity;
  for (let type = 0; type < 5; type++) {
    const buf = scratch[type];
    let score = 0;
    for (let i = 0; i < n; i++) {
      const v = buf[i];
      score += v < 128 ? v : 256 - v;
    }
    if (score < bestScore) {
      bestScore = score;
      bestType = type;
      bestBuf = buf;
    }
  }
  return [bestType, bestBuf];
}

/**
 * @param {number} width
 * @param {number} height
 * @param {Uint8Array} rgb - width * height * 3 bytes
 * @returns {Buffer} a complete PNG file
 */
export function encodePNG(width, height, rgb) {
  const bpp = 3;
  const stride = width * bpp;

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const scratch = Array.from({ length: 5 }, () => Buffer.allocUnsafe(stride));
  const raw = Buffer.allocUnsafe(height * (stride + 1));
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const cur = Buffer.from(rgb.buffer, rgb.byteOffset + y * stride, stride);
    const [type, buf] = filterScanline(cur, prev, bpp, scratch);
    raw[y * (stride + 1)] = type;
    buf.copy(raw, y * (stride + 1) + 1);
    prev = cur;
  }

  const idat = zlib.deflateSync(raw, { level: 9, memLevel: 9 });

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
