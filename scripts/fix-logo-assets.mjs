import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function PaethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function decodePng(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  
  let pos = 8;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4;
  const stride = width * bpp;
  const pixels = Buffer.alloc(height * stride);
  let rawPos = 0;

  for (let y = 0; y < height; y++) {
    const filter = raw[rawPos++];
    const lineStart = y * stride;
    const prevStart = (y - 1) * stride;
    for (let x = 0; x < stride; x++) {
      const val = raw[rawPos++];
      const left = x >= bpp ? pixels[lineStart + x - bpp] : 0;
      const up = y > 0 ? pixels[prevStart + x] : 0;
      const upLeft = y > 0 && x >= bpp ? pixels[prevStart + x - bpp] : 0;
      let p = 0;
      if (filter === 0) p = val;
      else if (filter === 1) p = (val + left) & 0xff;
      else if (filter === 2) p = (val + up) & 0xff;
      else if (filter === 3) p = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) p = (val + PaethPredictor(left, up, upLeft)) & 0xff;
      pixels[lineStart + x] = p;
    }
  }

  return { width, height, pixels };
}

function encodePng(width, height, rgbaBuffer) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  
  const ihdrChunk = makeChunk('IHDR', ihdrData);
  
  const scanlineLen = 1 + width * 4;
  const rawScanlines = Buffer.alloc(height * scanlineLen);
  for (let y = 0; y < height; y++) {
    rawScanlines[y * scanlineLen] = 0; // Filter None
    rgbaBuffer.copy(rawScanlines, y * scanlineLen + 1, y * width * 4, (y + 1) * width * 4);
  }
  
  const idatData = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcBuf = buf.slice(4, 8 + len);
  const crc = zlib.crc32(crcBuf);
  buf.writeUInt32BE(crc >>> 0, 8 + len);
  return buf;
}

function cleanLogo(relPath, targetCutoffY = 636, fillBg = null) {
  const fullPath = path.join(rootDir, relPath);
  console.log(`Clearing stray bottom elements from: ${relPath}...`);
  const { width, height, pixels } = decodePng(fullPath);
  
  const newHeight = Math.min(height, targetCutoffY);
  const newPixels = Buffer.alloc(newHeight * width * 4);
  
  // Copy rows up to newHeight
  for (let y = 0; y < newHeight; y++) {
    const srcOffset = y * width * 4;
    const dstOffset = y * width * 4;
    pixels.copy(newPixels, dstOffset, srcOffset, srcOffset + width * 4);
  }
  
  // If fillBg is requested for clear rows:
  if (fillBg) {
    // any row past 632 fill with fillBg [R, G, B, A]
    for (let y = 633; y < newHeight; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        newPixels[idx] = fillBg[0];
        newPixels[idx + 1] = fillBg[1];
        newPixels[idx + 2] = fillBg[2];
        newPixels[idx + 3] = fillBg[3];
      }
    }
  }

  const pngBuffer = encodePng(width, newHeight, newPixels);
  fs.writeFileSync(fullPath, pngBuffer);
  console.log(`✅ Successfully updated ${relPath} (New dimensions: ${width} x ${newHeight})`);
}

// Clean transparent logo
cleanLogo('assets/logos/conexus-logo-transparent.png', 636, null);
// Clean dark logo (background #061426 => rgb(6, 20, 38, 255))
cleanLogo('assets/logos/conexus-logo-dark.png', 636, [6, 20, 38, 255]);
// Clean light logo (background #F5F8FC => rgb(245, 248, 252, 255))
cleanLogo('assets/logos/conexus-logo-light.png', 636, [245, 248, 252, 255]);
