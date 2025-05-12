import { test, expect } from './fixtures.js';

test('User sees garage page', async ({ userGaragePage }) => {
  await expect(userGaragePage).toHaveURL(/.*garage/);
  await expect(userGaragePage.getByText('Add car')).toBeVisible();
});

