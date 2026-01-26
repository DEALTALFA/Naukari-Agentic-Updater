const { chromium } = require('playwright');


const fs = require('fs');

async function updateNaukri() {
 // const browser = await chromium.launch({ headless: true });
  //const page = await browser.newPage();

  
  
 
 // await page.goto('https://www.Linkedin.com/');
//await page.waitForTimeout(2000);

//  await page.goto('https://www.naukri.com/nlogin/login', { waitUntil: 'domcontentloaded' });
// await page.waitForTimeout(3000);
// await page.screenshot({path: "01.png"});
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

async function injectCookies(context) {
  // Read cookies from the file
  const cookies = JSON.parse(fs.readFileSync('cookies.json'));

  // Add them into the browser context
  await context.addCookies(cookies);
}

// Example usage before visiting Naukri:
await injectCookies(context);

 
 await page.screenshot({path: "01.png"});
//      await page.goto('https://www.naukri.com/',
  
//   {
//   //waitUntil: 'networkidle'
// });
 for (let i = 0; i < 3; i++) {
  try {
    await page.goto("https://www.naukri.com/", { waitUntil: "domcontentloaded" });
    break;
  } catch (err) {
    console.log(`Retry ${i+1} failed`);
  }
}
 await page.screenshot({path: "02.png"});
    await page.waitForTimeout(10000);
await page.screenshot({path: "03.png"});

//  await page.click('div.view-profile-wrapper > a');
   await page.click('//*[text()='View']');

 //*[text()='View']
 await page.waitForTimeout(6000);
  await page.screenshot({path:"04.png"});
 await page.click('//*[@id="lazyResumeHead"]/div/div/div[1]/span[2]');
 await page.waitForTimeout(6000);
  await page.screenshot({path:"05.png"});
 await page.click("//button[text()='Save']");
  await page.waitForTimeout(6000);
  await page.screenshot({path:"06.png"});
 
// await page.click('text=Login');
//   await page.mouse.move(200, 300);
// await page.waitForTimeout(1500);
//   await page.screenshot({path: "03.png"});
// //await page.keyboard.type('anrai0410@gmail.com', { delay: 120 });
//  //  await page.screenshot({path: "03.png"});
//    await page.waitForSelector("//*[@placeholder='Enter your active Email ID / Username']", { timeout: 60000 });
// // await page.fill("//*[@placeholder='Enter your active Email ID / Username']", process.env.NAUKRI_USER);
//   await page.fill("//*[@placeholder='Enter your active Email ID / Username']", "anrai0410@gmail.com");

//  await page.click("//button[@type='submit']");
//  console.log(process.env.NAUKRI_USER);
//   await page.screenshot({path:"04.png"});
//   console.log("This message will appear in the browser's developer console.");
//  await page.fill("//*[@placeholder='Enter your active Email ID / Username']", "anrai0410@gmail.com");
//   await page.waitForSelector('input[placeholder="Enter your password"]', { timeout: 60000 });
//  // await page.fill('input[placeholder="Enter your password"]', process.env.NAUKRI_PASS);
//    await page.fill('input[placeholder="Enter your password"]', "Aditya2026");
//   await page.waitForTimeout(6000);
//    await page.click("//*[text()='Show']");
// await page.waitForTimeout(6000);
//  console.log(process.env.NAUKRI_PASS);
//   await page.screenshot({path:"05.png"});
//    slowMo: 100
// //  await page.click('button[type="submit"]');
//  await page.click("//button[@type='submit']");
//   await page.mouse.move(200, 300);
// await page.waitForTimeout(1500);

// await saveCookies(context);
//  await page.waitForTimeout(6000);
//  await page.screenshot({path:"06.png"});
 

// async function saveCookies(context) {
//   const cookies = await context.cookies();
//   console.log(cookies);
//   fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
  
// }

// // Example usage:
// await saveCookies(context);
// // await page.click('div.view-profile-wrapper > a');
//  await page.screenshot({path:"07.png"});

  await browser.close();
}

updateNaukri();
