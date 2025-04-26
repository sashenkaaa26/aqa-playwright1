
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

const uniqEmail = `user+${Date.now()}@example.com`;
const password = 'Abc12345';

test.describe('Registration Form - Validation', () => {
  let registrationPage;
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto('https://qauto.forstudy.space/');
    await page.click('button.btn.btn-outline-white.header_signin');
    await page.click('app-signin-modal >> text=Registration');
    await registrationPage.isFormVisible();
  });

  test('Should validate empty required fields on blur', async ({ page }) => {
    await page.focus('#signupName');
    await page.click('body');
    await expect(page.locator('text=Name required')).toBeVisible();

    await page.focus('#signupLastName');
    await page.click('body');
    await expect(page.locator('text=Last name required')).toBeVisible();

    await page.focus('#signupEmail');
    await page.click('body');
    await expect(page.locator('text=Email required')).toBeVisible();

    await page.focus('#signupPassword');
    await page.click('body');
    await expect(page.locator('text=Password required')).toBeVisible();

    await page.focus('#signupRepeatPassword');
    await page.click('body');
    await expect(page.locator('text=Re-enter password required')).toBeVisible();
  });

  test('Should validate incorrect email and name length', async ({ page }) => {
    await page.fill('#signupName', 'A');
    await page.click('body');
    await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();

    await page.fill('#signupLastName', 'A'.repeat(25));
    await page.click('body');
    await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();

    await page.fill('#signupEmail', 'notanemail');
    await page.click('body');
    await expect(page.locator('text=Email is incorrect')).toBeVisible();
  });

  test('Should disable "Register" button for invalid form', async ({ page }) => {
    const registerButton = page.locator('text=Register');
    await expect(registerButton).toBeDisabled();
  });
});

test.describe('Successful Registration and Login', () => {
  let registrationPage;
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto('https://qauto.forstudy.space/');
    await page.click('button.btn.btn-outline-white.header_signin');
    await page.click('app-signin-modal >> text=Registration');
    await expect(page.locator('#signupName')).toBeVisible();
  });
test('Should register new user and login', async ({ page }) => {
  await registrationPage.fillRegistrationForm('TestUser', 'Playwright', uniqEmail, password);
  await registrationPage.submitRegistrationForm();

  await dashboardPage.isUserNavDropdownVisible();

  await dashboardPage.logout();

  await page.waitForSelector('button.btn.btn-outline-white.header_signin', { timeout: 60000 });

  await page.click('button.btn.btn-outline-white.header_signin');
  await page.waitForSelector('#signinEmail', { timeout: 60000 });

  await loginPage.fillLoginForm(uniqEmail, password);
  await loginPage.submitLoginForm();

  await dashboardPage.isUserNavDropdownVisible();
});

});
