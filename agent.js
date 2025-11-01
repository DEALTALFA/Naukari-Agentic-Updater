const { chromium } = require('playwright');

async function updateNaukri() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.naukri.com/mnjuser/profile');
  await page.waitForSelector('#usernameField');
   await page.fill('#usernameField', process.env.NAUKRI_USER);
          await page.fill('#passwordField', process.env.NAUKRI_PASS);
            await page.click('#loginButton');

 await page.click('#loginButton');
  page.waitForSelector;

                await page.goto('https://www.naukri.com/mnjuser/profile/edit');
                  await page.fill('#resumeHeadline', 'Updated at ' + new Date().toISOString());
                    await page.click('#saveButton');

  await browser.close();
}

updateNaukri();