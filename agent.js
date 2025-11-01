const { chromium } = require('playwright');

async function updateNaukri() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36'
      
});
await page.goto('https://www.naukri.com/login', { waitUntil: 'networkidle' });
  //await page.goto('https://www.naukri.com/mnjuser/profile');
await page.waitForTimeout(2000);
await page.goto('https://www.naukri.com/login');
//  await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'domcontentloaded' });
 await page.waitForTimeout(3000);
 await page.screenshot({path: "01.png"});
//  await page.waitForSelector("//*[@id='usernameField']", { timeout: 60000 });
//  await page.fill("//*[@id='usernameField']", process.env.NAUKRI_USER);
//  await page.screenshot({path:"02.png"});
//  console.log("This message will appear in the browser's developer console.");
 
//  await page.waitForSelector('input[placeholder="Enter your password"]', { timeout: 60000 });
//  await page.fill('input[placeholder="Enter your password"]', process.env.NAUKRI_PASS);
//  await page.screenshot({path:"03.png"});
//  await page.click('button[type="submit"]');
//  await page.waitForTimeout(5000); await page.waitForSelector('#resumeHeadline');
//   await page.click('#resumeHeadline');

//   await page.waitForSelector('#resumeHeadlineTxt');
//   await page.fill('#resumeHeadlineTxt', 'passionForField');

//   await page.click('#saveHeadline');

  await browser.close();
}

updateNaukri();