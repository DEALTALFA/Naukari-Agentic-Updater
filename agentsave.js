const { chromium } = require('playwright');


const fs = require('fs');

async function updateNaukri() {

    const browser = await chromium.launch({
  headless: false,
  slowMo: 100
});

  
  const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});


 
 await page.screenshot({path: "01.png"});
     await page.goto('https://www.naukri.com/');
  
 
 await page.screenshot({path: "02.png"});

   await page.waitForTimeout(6000);
await page.click('text=Login');
  await page.mouse.move(200, 300);
await page.waitForTimeout(1500);
  await page.screenshot({path: "03.png"});

   await page.waitForSelector("//*[@placeholder='Enter your active Email ID / Username']", { timeout: 60000 });
  await page.fill("//*[@placeholder='Enter your active Email ID / Username']", process.env.NAUKRI_USER);
 console.log(process.env.NAUKRI_USER);
  await page.screenshot({path:"04.png"});
  console.log("This message will appear in the browser's developer console.");
  await page.waitForSelector('input[placeholder="Enter your password"]', { timeout: 60000 });
  await page.fill('input[placeholder="Enter your password"]', process.env.NAUKRI_PASS);
  await page.waitForTimeout(6000);
   await page.click("//*[text()='Show']");
await page.waitForTimeout(6000);
 console.log(process.env.NAUKRI_PASS);
  await page.screenshot({path:"05.png"});
   slowMo: 100
 await page.click("//button[@type='submit']");
  await page.mouse.move(200, 300);
await page.waitForTimeout(1500);

await saveCookies(context);

const { exec } = require('child_process');

exec('[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("C:\\Users\\ADITYA\\OneDrive\\Desktop\\Naukari-Agentic-Updater\\cookies.json"))|Out-File -FilePath "C:\\Users\\ADITYA\\OneDrive\\Desktop\\Naukari-Agentic-Updater\\encode.json"', {'shell':'powershell.exe'}, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
 await page.waitForTimeout(6000);
 await page.screenshot({path:"06.png"});
 

async function saveCookies(context) {
  const cookies = await context.cookies();
  console.log(cookies);
  fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
  
}

// Example usage:
await saveCookies(context);
// await page.click('div.view-profile-wrapper > a');
 await page.screenshot({path:"07.png"});

  await browser.close();
}

updateNaukri();
