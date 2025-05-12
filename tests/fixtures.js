import { test as base, expect as baseExpect } from '@playwright/test';

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'storageState.json',
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });

    const page = await context.newPage();
    await page.goto('https://qauto.forstudy.space/panel/garage');
    await use(page);
    await context.close();
  },
});

export const expect = baseExpect;

