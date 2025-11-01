const { chromium } = require('playwright');

async function updateNaukri() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.naukri.com/mnjuser/profile');

  await page.waitForSelector('#resumeHeadline');
  await page.click('#resumeHeadline');

  await page.waitForSelector('#resumeHeadlineTxt');
  await page.fill('#resumeHeadlineTxt', 'passionForField');

  await page.click('#saveHeadline');

  await browser.close();
}

updateNaukri();