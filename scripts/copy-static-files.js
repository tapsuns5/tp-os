import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');

const filesToCopy = ['.htaccess', 'blog/index.html'];

function ensureDistExists() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist directory not found. Run "npm run build" first.');
  }
}

function copyFile(fileName) {
  const sourcePath = path.join(publicDir, fileName);
  const destinationPath = path.join(distDir, fileName);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  ${fileName} was not found in public/. Skipping.`);
    return;
  }

  const destinationDir = path.dirname(destinationPath);
  fs.mkdirSync(destinationDir, { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`✅ Copied ${fileName} → dist/${fileName}`);
}

function main() {
  ensureDistExists();
  filesToCopy.forEach(copyFile);
}

try {
  main();
} catch (error) {
  console.error('Error copying static files:', error);
  process.exit(1);
}
