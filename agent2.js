// agent.js
const { chromium } = require('playwright-extra');
const stealth = require('playwright-extra-plugin-stealth')();
chromium.use(stealth);

async function updateNaukri() {
  const browser = await chromium.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    // Optional proxy setup (uncomment and fill if needed)
    // proxy: {
    //   server: 'http://your-proxy:port',
    //   username: 'yourUser',
    //   password: 'yourPass'
    // }
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
    await page.goto('https://www.naukri.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Simulate human-like behavior
    await page.mouse.move(100, 100);
    await page.waitForTimeout(Math.floor(Math.random() * 1000 + 500));

    // Screenshot for validation
    await page.screenshot({ path: '01.png' });

    console.log('✅ Naukri page loaded and screenshot captured.');
  } catch (error) {
    console.error('❌ Error loading Naukri:', error.message);
  } finally {
    await browser.close();
  }
}

updateNaukri();