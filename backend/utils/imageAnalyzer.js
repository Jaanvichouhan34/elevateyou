const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const COLOR_PALETTE = [
  // Yellows & Golds
  { name: 'Vibrant Yellow', hex: '#eab308', r: 234, g: 179, b: 8 },
  { name: 'Mustard Gold', hex: '#ca8a04', r: 202, g: 138, b: 4 },
  { name: 'Lemon Chiffon', hex: '#fef08a', r: 254, g: 240, b: 138 },
  { name: 'Amber Ochre', hex: '#d97706', r: 217, g: 119, b: 6 },

  // Reds & Pinks
  { name: 'Crimson Red', hex: '#dc2626', r: 220, g: 38, b: 38 },
  { name: 'Burgundy / Wine', hex: '#881337', r: 136, g: 19, b: 55 },
  { name: 'Blush Pink', hex: '#f472b6', r: 244, g: 114, b: 182 },
  { name: 'Rose Coral', hex: '#fb7185', r: 251, g: 113, b: 133 },
  { name: 'Hot Magenta', hex: '#e11d48', r: 225, g: 29, b: 72 },
  { name: 'Dusty Rose', hex: '#fda4af', r: 253, g: 164, b: 175 },

  // Blues & Teals
  { name: 'Navy Blue', hex: '#1e3a8a', r: 30, g: 58, b: 138 },
  { name: 'Royal Blue', hex: '#2563eb', r: 37, g: 99, b: 235 },
  { name: 'Sky Blue', hex: '#38bdf8', r: 56, g: 189, b: 248 },
  { name: 'Deep Teal', hex: '#0f766e', r: 15, g: 118, b: 110 },
  { name: 'Cobalt Blue', hex: '#1d4ed8', r: 29, g: 78, b: 216 },
  { name: 'Cyan Aqua', hex: '#06b6d4', r: 6, g: 182, b: 212 },
  { name: 'Midnight Blue', hex: '#172554', r: 23, g: 37, b: 84 },

  // Greens
  { name: 'Emerald Green', hex: '#059669', r: 5, g: 150, b: 105 },
  { name: 'Sage Green', hex: '#84cc16', r: 132, g: 204, b: 22 },
  { name: 'Olive Green', hex: '#4d7c0f', r: 77, g: 124, b: 15 },
  { name: 'Forest Green', hex: '#14532d', r: 20, g: 83, b: 45 },
  { name: 'Mint Green', hex: '#6ee7b7', r: 110, g: 231, b: 183 },

  // Purples & Violets
  { name: 'Deep Plum / Violet', hex: '#581c87', r: 88, g: 28, b: 135 },
  { name: 'Lavender Purple', hex: '#c084fc', r: 192, g: 132, b: 252 },
  { name: 'Soft Lilac', hex: '#e9d5ff', r: 233, g: 213, b: 255 },
  { name: 'Royal Purple', hex: '#7e22ce', r: 126, g: 34, b: 206 },

  // Neutrals, Browns & Tans
  { name: 'Jet Black', hex: '#0f172a', r: 15, g: 23, b: 42 },
  { name: 'Charcoal Grey', hex: '#334155', r: 51, g: 65, b: 85 },
  { name: 'Slate Grey', hex: '#64748b', r: 100, g: 116, b: 139 },
  { name: 'Cool Light Grey', hex: '#cbd5e1', r: 203, g: 213, b: 225 },
  { name: 'Crisp White', hex: '#f8fafc', r: 248, g: 250, b: 252 },
  { name: 'Warm Cream / Ivory', hex: '#fef3c7', r: 254, g: 243, b: 199 },
  { name: 'Camel Tan', hex: '#d97706', r: 217, g: 119, b: 6 },
  { name: 'Khaki Beige', hex: '#d6d3d1', r: 214, g: 211, b: 209 },
  { name: 'Rust Terracotta', hex: '#9a3412', r: 154, g: 52, b: 18 },
  { name: 'Earth Brown', hex: '#78350f', r: 120, g: 53, b: 15 },
  { name: 'Chocolate Espresso', hex: '#451a03', r: 69, g: 26, b: 3 }
];

function isSkinTone(r, g, b) {
  return (r > 120 && g > 70 && b > 45 && r > g && g > b && (r - b) > 20 && (r - g) < 75);
}

function getNearestColorName(r, g, b) {
  let minDistance = Infinity;
  let closest = COLOR_PALETTE[0];

  for (const c of COLOR_PALETTE) {
    const distance = Math.sqrt(
      Math.pow(r - c.r, 2) + Math.pow(g - c.g, 2) + Math.pow(b - c.b, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closest = c;
    }
  }

  return closest;
}

function decodePixels(buffer) {
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    try {
      const png = PNG.sync.read(buffer);
      return { width: png.width, height: png.height, data: png.data };
    } catch (e) {
      console.error('PNG decode error:', e.message);
    }
  }

  try {
    const raw = jpeg.decode(buffer, { useTArray: true, formatAsRGBA: true });
    if (raw && raw.data) {
      return { width: raw.width, height: raw.height, data: raw.data };
    }
  } catch (e) {
    console.error('JPEG decode notice:', e.message);
  }

  return null;
}

function analyzeImageBuffer(imageBase64) {
  try {
    const base64Str = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const buffer = Buffer.from(base64Str, 'base64');

    if (buffer.length === 0) {
      throw new Error('Empty image buffer');
    }

    const decoded = decodePixels(buffer);
    const colorCounts = {};
    let totalLuminance = 0;
    let sampleCount = 0;
    let lowerSkinCount = 0;
    let lowerTotalCount = 0;

    if (decoded && decoded.data && decoded.data.length > 0) {
      const pixels = decoded.data;
      const width = decoded.width || 100;
      const height = decoded.height || 100;
      const totalPixels = width * height;
      const step = Math.max(4, Math.floor(pixels.length / 4000) * 4);

      for (let i = 0; i < pixels.length - 4; i += step) {
        const pixelIdx = Math.floor(i / 4);
        const y = Math.floor(pixelIdx / width);
        const relativeY = y / height;

        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        if (a !== undefined && a < 100) continue; // skip transparent

        const isSkin = isSkinTone(r, g, b);

        // Analyze lower 35% of image for bare legs / shorts detection
        if (relativeY > 0.65) {
          lowerTotalCount++;
          if (isSkin) lowerSkinCount++;
        }

        if (isSkin) continue; // skip skin pixels for clothing color count

        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        totalLuminance += lum;
        sampleCount++;

        const matched = getNearestColorName(r, g, b);
        colorCounts[matched.name] = (colorCounts[matched.name] || 0) + 1;
      }
    } else {
      const step = Math.max(1, Math.floor(buffer.length / 300));
      for (let i = 0; i < buffer.length - 3; i += step) {
        const r = buffer[i];
        const g = buffer[i + 1];
        const b = buffer[i + 2];
        if (r !== undefined && g !== undefined && b !== undefined) {
          if (isSkinTone(r, g, b)) continue;
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          totalLuminance += lum;
          sampleCount++;
          const matched = getNearestColorName(r, g, b);
          colorCounts[matched.name] = (colorCounts[matched.name] || 0) + 1;
        }
      }
    }

    if (sampleCount === 0) {
      return getFallbackPalette();
    }

    const avgLuminance = totalLuminance / sampleCount;
    const hasBareLegs = lowerTotalCount > 0 && (lowerSkinCount / lowerTotalCount) > 0.12;

    const sortedEntries = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    let topColorNames = sortedEntries.map(([name]) => name);

    if (topColorNames.length > 1 && topColorNames[0] === 'Crisp White') {
      topColorNames = topColorNames.slice(1);
    }

    topColorNames = topColorNames.slice(0, 3);

    const swatches = topColorNames.map(name => {
      const found = COLOR_PALETTE.find(c => c.name === name);
      return found ? { name: found.name, hex: found.hex } : { name: 'Crisp White', hex: '#f8fafc' };
    });

    const brightnessCategory = avgLuminance > 180 ? 'Light / Bright' : (avgLuminance < 80 ? 'Dark / Deep' : 'Balanced Medium');
    const contrastScore = Math.min(10, Math.max(4, Math.round((avgLuminance / 25) + 3)));

    const garmentType = hasBareLegs 
      ? 'Casual T-Shirt / Top with Shorts (Bare Legs Exposed)'
      : 'Standard Full-Length Garment / Suit';

    return {
      brightness: brightnessCategory,
      avgLuminance: Math.round(avgLuminance),
      contrastScore,
      hasBareLegs,
      garmentType,
      swatches: swatches.length > 0 ? swatches : [
        { name: 'Slate Grey', hex: '#64748b' },
        { name: 'Navy Blue', hex: '#1e3a8a' }
      ]
    };

  } catch (err) {
    console.error('Image buffer analysis error:', err);
    return getFallbackPalette();
  }
}

function getFallbackPalette() {
  return {
    brightness: 'Balanced Medium',
    avgLuminance: 120,
    contrastScore: 8,
    hasBareLegs: false,
    garmentType: 'Standard Garment',
    swatches: [
      { name: 'Slate Grey', hex: '#64748b' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ]
  };
}

module.exports = { analyzeImageBuffer };
