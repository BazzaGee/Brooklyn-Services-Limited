import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = 'public/images';
const threshold = 3 * 1024 * 1024; // 3 MB

function walk(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk(imagesDir);
let converted = 0;
let skipped = 0;

for (const filePath of files) {
  const stat = fs.statSync(filePath);
  if (stat.size <= threshold) {
    skipped++;
    continue;
  }

  const ext = path.extname(filePath).toLowerCase();
  const baseName = filePath.replace(ext, '');
  const webpPath = baseName + '.webp';

  console.log(`Converting: ${filePath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

  if (ext === '.png') {
    await sharp(filePath)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);
  } else {
    await sharp(filePath)
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(webpPath);
  }

  const newStat = fs.statSync(webpPath);
  const savings = ((1 - newStat.size / stat.size) * 100).toFixed(1);
  console.log(`  → ${webpPath} (${(newStat.size / 1024 / 1024).toFixed(2)} MB, saved ${savings}%)`);
  converted++;
}

console.log(`\nDone! ${converted} images converted, ${skipped} skipped (under 3 MB)`);
