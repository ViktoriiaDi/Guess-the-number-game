const { test, expect } = require('@playwright/test');

test.describe('Гра Вгадай число', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Додавання спроби > додає нове число в історію', async ({ page }) => {
    const input = page.locator('input[type="number"]');
    const checkBtn = page.locator('button:has-text("Check")');

    await input.fill('42');
    await checkBtn.click();

    await expect(page.locator('text=History: 42')).toBeVisible();
    // Перевіряємо, чи лічильник спроб став 1
    await expect(page.locator('text=Attempts: 1')).toBeVisible();
  });

  test('Скидання гри > кнопка Again очищує всі дані', async ({ page }) => {
    const input = page.locator('input[type="number"]');
    const checkBtn = page.locator('button:has-text("Check")');
    const againBtn = page.locator('button:has-text("Again")');

    await input.fill('10');
    await checkBtn.click();
    await againBtn.click();

    await expect(input).toHaveValue('');
    await expect(page.locator('text=Attempts: 0')).toBeVisible();
    await expect(page.locator('text=History: ')).toHaveText('History: ');
  });
});