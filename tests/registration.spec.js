const { test, expect } = require('@playwright/test');

const uniqEmail = `user+${Date.now()}@example.com`;
const password = 'Abc12345';

test.describe('Registration Form - Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Открытие сайта с базовой авторизацией
    await page.goto('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      }
    });

    // Переход в модальное окно регистрации
    await page.click('button.btn.btn-outline-white.header_signin');
    await page.click('app-signin-modal >> text=Registration');

    // Проверка, что форма регистрации доступна
    await expect(page.locator('#signupName')).toBeVisible();
  });

  test('Should validate empty required fields on blur', async ({ page }) => {
    await page.focus('#signupName');
    await page.blur('#signupName');
    await expect(page.locator('text=Name required')).toBeVisible();

    await page.focus('#signupLastName');
    await page.blur('#signupLastName');
    await expect(page.locator('text=Last name required')).toBeVisible();

    await page.focus('#signupEmail');
    await page.blur('#signupEmail');
    await expect(page.locator('text=Email required')).toBeVisible();

    await page.focus('#signupPassword');
    await page.blur('#signupPassword');
    await expect(page.locator('text=Password required')).toBeVisible();

    await page.focus('#signupRepeatPassword');
    await page.blur('#signupRepeatPassword');
    await expect(page.locator('text=Re-enter password required')).toBeVisible();
  });

  test('Should validate incorrect email and name length', async ({ page }) => {
    await page.fill('#signupName', 'A');
    await page.blur('#signupName');
    await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();

    await page.fill('#signupLastName', 'A'.repeat(25));
    await page.blur('#signupLastName');
    await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();

    await page.fill('#signupEmail', 'notanemail');
    await page.blur('#signupEmail');
    await expect(page.locator('text=Email is incorrect')).toBeVisible();
  });

  test('Should disable "Register" button for invalid form', async ({ page }) => {
    const registerButton = page.locator('text=Register');
    await expect(registerButton).toBeDisabled();
  });
});

test.describe('Successful Registration and Login', () => {
  test.beforeEach(async ({ page }) => {
    // Открытие сайта с базовой авторизацией
    await page.goto('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      }
    });

    // Переход в модальное окно регистрации
    await page.click('button.btn.btn-outline-white.header_signin');
    await page.click('app-signin-modal >> text=Registration');

    // Проверка, что форма регистрации доступна
    await expect(page.locator('#signupName')).toBeVisible();
  });

  test('Should register new user and login', async ({ page }) => {
    // Заполнение формы регистрации
    await page.fill('#signupName', 'TestUser');
    await page.fill('#signupLastName', 'Cypress');
    await page.fill('#signupEmail', uniqEmail);
    await page.fill('#signupPassword', password);
    await page.fill('#signupRepeatPassword', password);

    // Клик по кнопке регистрации и проверка
    const registerButton = page.locator('text=Register');
    await expect(registerButton).toBeEnabled();
    await registerButton.click();

    // Проверка, что пользователь вошел в систему
    const userNavDropdown = page.locator('#userNavDropdown');
    await expect(userNavDropdown).toBeVisible();

    // Логинимся через UI и затем выходим
    await userNavDropdown.click();
    await page.click('button', { text: 'Logout' });

    // Повторный вход
    await page.fill('input[name="username"]', uniqEmail);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    // Проверка успешного входа
    await expect(userNavDropdown).toBeVisible();
  });
});
