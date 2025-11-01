//const puppeteer = require('puppeteer-core');


async function updateNaukri() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args:['--no-sandbox','--disable-setuid-sandbox'],
 // executablePath: process.env.PUPPETEER_Executable_PATH ||'/user/bin/chromium-browser',
  
  });
  const page = await browser.newPage();
      await page.goto('https://www.naukri.com/mnjuser/profile');

        await page.type('#usernameField', process.env.NAUKRI_USER);
          await page.type('#passwordField', process.env.NAUKRI_PASS);
            await page.click('#loginButton');
              await page.waitForNavigation();

                await page.goto('https://www.naukri.com/mnjuser/profile/edit');
                  await page.type('#resumeHeadline', 'Updated at ' + new Date().toISOString());
                    await page.click('#saveButton');

                      await browser.close();
                      }

                      updateNaukri();