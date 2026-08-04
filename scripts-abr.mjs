// Minimal Photoshop .abr v6 reader: pulls the brush tip bitmaps out of the
// `samp` section. Each tip is an 8-bit mask, optionally PackBits-compressed
// per row.
import fs from "node:fs";
import sharp from "sharp";

const file = process.argv[2];
const outDir = process.argv[3];
fs.mkdirSync(outDir, { recursive: true });

const b = fs.readFileSync(file);
const version = b.readUInt16BE(0);
const sub = b.readUInt16BE(2);
if (b.toString("latin1", 4, 8) !== "8BIM" || b.toString("latin1", 8, 12) !== "samp") {
  throw new Error("not an abr samp section");
}
const sectionLen = b.readUInt32BE(12);
const end = Math.min(16 + sectionLen, b.length);
console.log(`abr v${version}.${sub}  section ${sectionLen} bytes`);

let off = 16;
let n = 0;
const results = [];

while (off + 4 < end) {
  const brushSize = b.readUInt32BE(off);
  off += 4;
  if (brushSize <= 0 || off + brushSize > b.length) break;
  const next = off + brushSize + ((4 - (brushSize % 4)) % 4);

  // GIMP's reader: v6.1 skips 47 bytes of descriptor, v6.2 skips 301
  let p = off + (sub === 1 ? 47 : 301);
  const top = b.readInt32BE(p);
  const left = b.readInt32BE(p + 4);
  const bottom = b.readInt32BE(p + 8);
  const right = b.readInt32BE(p + 12);
  const depth = b.readUInt16BE(p + 16);
  const compress = b.readUInt8(p + 18);
  p += 19;

  const w = right - left;
  const h = bottom - top;
  if (w <= 0 || h <= 0 || w > 8000 || h > 8000 || depth !== 8) {
    console.log(`  #${n} skipped (w=${w} h=${h} depth=${depth})`);
    off = next;
    n++;
    continue;
  }

  const mask = Buffer.alloc(w * h);
  if (compress === 0) {
    b.copy(mask, 0, p, p + w * h);
  } else {
    // PackBits: uint16 byte-count per row, then the rows back to back
    const rowLens = [];
    for (let y = 0; y < h; y++) rowLens.push(b.readUInt16BE(p + y * 2));
    let q = p + h * 2;
    for (let y = 0; y < h; y++) {
      const rowEnd = q + rowLens[y];
      let x = 0;
      while (q < rowEnd && x < w) {
        const len = b.readInt8(q++);
        if (len >= 0) {
          for (let i = 0; i <= len && x < w; i++) mask[y * w + x++] = b[q++];
        } else if (len > -128) {
          const v = b[q++];
          for (let i = 0; i < 1 - len && x < w; i++) mask[y * w + x++] = v;
        }
      }
      q = rowEnd;
    }
  }

  results.push({ i: n, w, h, mask });
  console.log(`  #${n} ${w}x${h} compress=${compress}`);
  off = next;
  n++;
}

// The tip stores paint as dark-on-white, so coverage is the inverse.
for (const { i, w, h, mask } of results) {
  const alpha = Buffer.alloc(w * h);
  for (let k = 0; k < mask.length; k++) alpha[k] = 255 - mask[k];
  await sharp(alpha, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toFile(`${outDir}/brush-${String(i).padStart(2, "0")}.png`);
}
console.log(`extracted ${results.length} tips -> ${outDir}`);
