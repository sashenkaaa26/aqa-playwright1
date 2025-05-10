
import { expect } from '@playwright/test';

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.userNavDropdown = page.locator('#userNavDropdown');
    this.logoutButton = page.locator('button', { hasText: 'Logout' });
  }


  async isUserNavDropdownVisible() {
    await expect(this.userNavDropdown).toBeVisible();
  }


  async logout() {
    await this.userNavDropdown.click();
    await this.logoutButton.click();
  }
}

export { DashboardPage};
