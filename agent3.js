const { chromium } = require('playwright-extra');
const stealth = require('playwright-extra-plugin-stealth')();
chromium.use(stealth);

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    locale: 'en-US',
  });

  const page = await context.newPage();

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/',
    'Upgrade-Insecure-Requests': '1',
  });

  page.on('response', response => {
    console.log(`[${response.status()}] ${response.url()}`);
  });

  try {
    await page.goto('https://www.Linkedin.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.mouse.move(100, 100);
    await page.waitForTimeout(Math.floor(Math.random() * 1000 + 500));
    await page.screenshot({ path: '01.png' });
    console.log('✅ Page loaded and screenshot saved.');
  } catch (error) {
    console.error('❌ Access blocked:', error.message);
  } finally {
    await browser.close();
  }
})();