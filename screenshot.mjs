import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url    = process.argv[2] || 'http://localhost:3000';
const preset = process.argv[3] || 'desktop';
// Optional 4th arg: 'sections' to capture per-viewport slices instead of full page
const mode   = process.argv[4] || 'full';

const VIEWPORTS = {
  mobile:  { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true,  hasTouch: true },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};

const viewport = VIEWPORTS[preset] ?? VIEWPORTS.desktop;

const dir = path.join(__dirname, 'temporary_screenshots');
fs.mkdirSync(dir, { recursive: true });

const existing = fs.readdirSync(dir).filter(f => /^screenshot-\d+/.test(f));
const n = existing.length + 1;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport(viewport);
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Scroll through the page to trigger IntersectionObserver-based reveal animations
// Kill all CSS transitions/animations before triggering reveals — ensures instant render
await page.addStyleTag({
  content: '*, *::before, *::after { transition-duration: 0ms !important; animation-duration: 0ms !important; transition-delay: 0ms !important; }',
});

await page.evaluate(async () => {
  // Scroll to trigger IntersectionObserver for all sections
  const totalHeight = document.body.scrollHeight;
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < totalHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 80));
  }
  window.scrollTo(0, 0);
  // Force-reveal anything the observer missed, with transitions already killed above
  document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('revealed');
  });
});

await new Promise(r => setTimeout(r, 400));

if (mode === 'sections') {
  // Capture per-viewport slices
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const vh = viewport.height;
  let slice = 0;
  for (let y = 0; y < pageHeight; y += vh) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 200));
    const outPath = path.join(dir, `screenshot-${n}-s${String(slice).padStart(2,'0')}.png`);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}  (scroll ${y}px)`);
    slice++;
  }
} else {
  const outPath = path.join(dir, `screenshot-${n}.png`);
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved: ${outPath}  (${viewport.width}×${viewport.height}, ${preset})`);
}

await browser.close();
