
import { expect } from '@playwright/test';  
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#signinEmail'); 
    this.passwordInput = page.locator('#signinPassword');
    this.loginButton = page.locator('button', { hasText: 'Login' });
  }


  async fillLoginForm(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }


  async submitLoginForm() {
    await this.loginButton.click();  
  }


  async isLoginButtonEnabled() {
    await expect(this.loginButton).toBeEnabled();  
  }
}

module.exports = { LoginPage };

