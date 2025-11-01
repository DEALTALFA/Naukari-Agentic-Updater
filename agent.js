const { chromium } = require('playwright');

async function updateNaukri() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  //await page.goto('https://www.naukri.com/mnjuser/profile');

 await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'domcontentloaded' });
 await page.waitForTimeout(3000);
 
 await page.waitForSelector('input[placeholder="Enter your active Email ID / Username"]', { timeout: 60000 });
 await page.fill('input[placeholder="Enter your active Email ID / Username"]', process.env.NAUKRI_USER);
 
 await page.waitForSelector('input[placeholder="Enter your password"]', { timeout: 60000 });
 await page.fill('input[placeholder="Enter your password"]', process.env.NAUKRI_PASS);
 
 await page.click('button[type="submit"]');
 await page.waitForTimeout(5000); await page.waitForSelector('#resumeHeadline');
  await page.click('#resumeHeadline');

  await page.waitForSelector('#resumeHeadlineTxt');
  await page.fill('#resumeHeadlineTxt', 'passionForField');

  await page.click('#saveHeadline');

  await browser.close();
}

updateNaukri();