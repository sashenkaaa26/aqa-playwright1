
import { expect } from '@playwright/test';
class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('text=Register');
  }


  async fillRegistrationForm(name, lastName, email, password) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
  }

 
  async submitRegistrationForm() {
    await this.registerButton.click();
  }

 
  async isFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.repeatPasswordInput).toBeVisible();
  }

  async isRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }
}

module.exports = { RegistrationPage };
