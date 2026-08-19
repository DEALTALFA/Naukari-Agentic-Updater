const { chromium } = require('playwright');
const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

async function updateNaukri() {
    const browser = await chromium.launch({
  headless: false,
  slowMo: 100,
    args: ['--disable-http2']

});

  
  const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});
const page = await context.newPage();
 // await page.screenshot({path: "01.png"});
  await page.goto('https://www.google.com/', {
  waitUntil: 'networkidle'
});

function loadCookies() {
  const key = crypto.scryptSync(process.env.COOKIE_PASSWORD, 'salt', 32);
  const [ivHex, encrypted] = fs.readFileSync('cookies.enc', 'utf8').split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
  return JSON.parse(decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'));
}

await context.addCookies(loadCookies());

 
 await page.screenshot({path: "01.png"});

console.log("Navigating to Naukri...");
 for (let i = 0; i < 3; i++) {
  try {
    await page.goto("https://www.naukri.com/", { waitUntil: "domcontentloaded" });
    break;
  } catch (err) {
    console.log(`Retry ${i+1} failed`);
  }
}
await page.reload();
await page.screenshot({path: "02.png"});
await page.waitForTimeout(10000);
await page.screenshot({path: "03.png"});
await page.waitForSelector('(//span[text()="Jobs"])[1]', {state: 'visible', timeout: 30000 });
console.log("Clicking on Jobs...");
await page.click('(//span[text()="Jobs"])[1]');
await page.waitForTimeout(3000);
await page.screenshot({path: "04.png"});

if (await page.locator('//span[contains(.,"₹")]').isVisible()) {
  console.log("Salary filter is visible, clicking on it...");
  await page.click('(//em[@class="naukicon naukicon-ot-pencil"])[3]',{state: 'visible', timeout: 30000});
  await page.click('//input[@class="currency-input "]',{state: 'visible', timeout: 30000});
  await page.locator('//input[@class="currency-input "]').clear();
  await page.click('//button[@type="submit"]',{state: 'visible', timeout: 30000});
}

await page.click('//img[@href="https://www.naukri.com"]');

await page.click('//a[@href="/mnjuser/profile"]');
 //*[text()='View']
await page.waitForTimeout(6000);
await page.screenshot({path:"05.png"});
console.log("Clicking on Resume Headline to update...");
await page.click('//*[@id="lazyResumeHead"]/div/div/div[1]/span[2]');
await page.waitForTimeout(6000);
await page.screenshot({path:"06.png"});
console.log("Clicking on Save...");
await page.click("//button[text()='Save']");
await page.waitForTimeout(6000);
await page.screenshot({path:"07.png"});

await page.click('//div[@class="lightbox profileEditDrawer profileUpdatedProLayer model_open flipOpen"]//span[text()="CrossLayer"]',{state: 'visible', timeout: 30000});
// await page.waitForTimeout(30000000);
await page.waitForSelector('(//span[text()="Jobs"])[1]', {state: 'visible', timeout: 30000 });
console.log("Clicking on Jobs at the end...");
await page.click('(//span[text()="Jobs"])[1]');
await page.waitForTimeout(3000);
await page.screenshot({path: "08.png"});
if (await page.locator('//span[contains(.,"₹")]').isVisible()) {
  console.log("Salary filter is visible at the end, editing on it...");
  await page.click('(//em[@class="naukicon naukicon-ot-pencil"])[3]',{state: 'visible', timeout: 30000});
  await page.click('//input[@class="currency-input "]',{state: 'visible', timeout: 30000});
  await page.locator('//input[@class="currency-input "]').clear();
  await page.click('//button[@type="submit"]',{state: 'visible', timeout: 30000});
  console.log("Expected Salary is removed and updated successfully.");
  await page.screenshot({path: "09.png"});
}

  await browser.close();
}

updateNaukri();
