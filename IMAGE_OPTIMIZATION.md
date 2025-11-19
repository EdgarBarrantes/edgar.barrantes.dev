# Image Optimization Guide

## Current State

**og-image.jpg**: 255KB (currently unoptimized)

## Recommended Optimizations

### 1. Optimize og-image.jpg

The Open Graph image should be optimized for web use while maintaining quality.

**Target**: ~80-100KB (60-70% size reduction)

**Using Command Line Tools:**

```bash
# Using ImageMagick
convert og-image.jpg -quality 85 -strip og-image-optimized.jpg

# Using jpegoptim
jpegoptim --max=85 --strip-all og-image.jpg

# Using cjpeg (mozjpeg)
cjpeg -quality 85 -optimize -progressive og-image.jpg > og-image-optimized.jpg
```

**Using Online Tools:**
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (Mac only)

**Recommended Settings:**
- Format: JPEG
- Quality: 85-90%
- Progressive: Yes
- Strip metadata: Yes
- Dimensions: 1200x630px (OG standard)

### 2. General Image Optimization Strategy

For all images on the site:

#### Profile Images / Photos
```bash
# Optimize JPEGs
convert input.jpg -quality 85 -strip -resize 800x800 output.jpg

# For WebP (better compression)
cwebp -q 85 input.jpg -o output.webp
```

#### Screenshots / UI Images
```bash
# PNG optimization
optipng -o7 input.png
# or
pngquant --quality=65-80 input.png --output output.png
```

#### Icon/Logo Images
```bash
# SVG minification
svgo input.svg -o output.svg
```

### 3. Lazy Loading

Already implemented for most images, but verify:

```tsx
<Image
  src="/path/to/image.jpg"
  alt="Description"
  loading="lazy"  // ← Ensure this is present
  width={800}
  height={600}
/>
```

### 4. Responsive Images

For article images, consider multiple sizes:

```tsx
<Image
  src="/images/article.jpg"
  alt="Description"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

### 5. WebP Format

Modern format with better compression:

```bash
# Generate WebP versions
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done
```

Then use with fallback:

```tsx
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Description" />
</picture>
```

## Automated Optimization

### Option 1: next-optimized-images (Deprecated)
Not recommended for Next.js 13+

### Option 2: Sharp (Recommended)
Already available via Next.js Image component.

### Option 3: Build-time Optimization Script

Create `scripts/optimize-images.ts`:

```typescript
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import path from 'path';

async function optimizeImages() {
  const publicDir = 'public';
  const images = readdirSync(publicDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  for (const image of images) {
    const inputPath = path.join(publicDir, image);
    const stat = statSync(inputPath);

    // Only optimize large images
    if (stat.size > 100 * 1024) { // > 100KB
      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(inputPath.replace('.jpg', '-optimized.jpg'));

      console.log(`Optimized: ${image}`);
    }
  }
}

optimizeImages();
```

## Checklist

- [ ] Optimize og-image.jpg (255KB → ~90KB)
- [ ] Add WebP versions of large images
- [ ] Ensure all `<Image>` components have `loading="lazy"`
- [ ] Add responsive image sizes where appropriate
- [ ] Consider automating optimization in build process
- [ ] Monitor image performance with Lighthouse

## Performance Impact

**Before:**
- og-image.jpg: 255KB

**After (Expected):**
- og-image.jpg: ~90KB
- Total savings: ~165KB (65% reduction)
- Faster page loads, especially on mobile
- Better Core Web Vitals scores

## Tools Installation

```bash
# macOS
brew install imagemagick jpegoptim mozjpeg webp

# Ubuntu/Debian
apt-get install imagemagick jpegoptim libjpeg-turbo-progs webp

# Using npm (cross-platform)
npm install -g sharp-cli
```

## Quick Command Reference

```bash
# Check image size
ls -lh public/*.jpg

# Optimize single image
convert og-image.jpg -quality 85 -strip og-image-opt.jpg

# Bulk optimize all JPEGs
for img in public/*.jpg; do
  convert "$img" -quality 85 -strip "${img%.jpg}-opt.jpg"
done

# Compare file sizes
du -sh public/*.jpg | sort -h
```

## Next Steps

1. Install optimization tools (see above)
2. Run optimization on og-image.jpg
3. Replace original with optimized version
4. Commit changes
5. Monitor performance improvement

---

For more information on Next.js Image Optimization:
https://nextjs.org/docs/basic-features/image-optimization
