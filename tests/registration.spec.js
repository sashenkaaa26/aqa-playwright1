const { test, expect } = require('@playwright/test');

test.use({
  httpCredentials: {
    username: 'guest',
    password: 'welcome2qauto',
  }
});

test.describe('Registration Form - Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qauto.forstudy.space/');

    await page.click('button.btn.btn-outline-white.header_signin');
    await page.click('app-signin-modal >> text=Registration');

    await expect(page.locator('#signupName')).toBeVisible();
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


const uniqEmail = `user+${Date.now()}@example.com`;
const password = 'Abc12345';

test.describe('Successful Registration and Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      }
    });

    await page.click('button.btn.btn-outline-white.header_signin');
    await page.click('app-signin-modal >> text=Registration');


    await expect(page.locator('#signupName')).toBeVisible();
  });

  test('Should register new user and login', async ({ page }) => {
    await page.fill('#signupName', 'TestUser');
    await page.fill('#signupLastName', 'Cypress');
    await page.fill('#signupEmail', uniqEmail);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);


    const registerButton = page.locator('text=Register');
    await expect(registerButton).toBeEnabled();
    await registerButton.click();

 
    const userNavDropdown = page.locator('#userNavDropdown');
    await expect(userNavDropdown).toBeVisible();

 
    await userNavDropdown.click();
    const logoutButton = page.locator('button', { hasText: 'Logout' });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

  
    await page.waitForSelector('button.btn.btn-outline-white.header_signin', { timeout: 60000 });

    
    await login(page, uniqEmail, password); 

    await expect(userNavDropdown).toBeVisible();
  });
});


async function login(page, email, password) {

  await page.waitForSelector('button.btn.btn-outline-white.header_signin', { timeout: 60000 });

  
  await page.click('button.btn.btn-outline-white.header_signin');

  
  await page.fill('#signinEmail', email);
  await page.fill('#signinPassword', password);

  
  const loginButton = page.locator('button', { hasText: 'Login' });
  await expect(loginButton).toBeEnabled();
  await loginButton.click();

  
  const userNavDropdown = page.locator('#userNavDropdown');
  await expect(userNavDropdown).toBeVisible();
}
