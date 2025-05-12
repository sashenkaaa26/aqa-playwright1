
import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  });

  const page = await context.newPage();
  
  await page.goto('https://qauto.forstudy.space/signin');
  await page.locator('button:has-text("Sign In")').click();
  await page.fill('#signinEmail', 'qatest@gmail.com');
  await page.fill('#signinPassword', 'Test1est!');
  await page.click('button:has-text("Login")');


  await page.waitForURL('**/panel/garage');

  await context.storageState({ path: 'storageState.json' });

  console.log('>>> Running global setup...');

  await browser.close();

}
