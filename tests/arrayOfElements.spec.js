import { test, expect } from '@playwright/test';

test.describe('Test Group', () => {

  let elements;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');
    await expect(page).toHaveTitle('Practice');
    elements = await page.locator("//ul[@class='list-group']//li/a").all();
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });


  test('Verify that there are exactly 50 links element within th <ul> tag.', async ({page}) => {
    expect(elements.length).toBe(50);
    console.log('list of Webelements: ', elements.length);
  });

  test('Verify that each of the 50 link element within <ul> tag are visible & clickable', async ({page}) => {
    for (let e of elements) {
      await expect(e).toBeVisible();
      await expect(e).toBeEnabled();
    }
  });

  test('Verify that each of the 50 link element within <ul> tag has an href attribute', async ({page}) => {
    for (let e of elements) {
      await expect(e).toHaveAttribute('href');
      console.log(await e.getAttribute('href'));
    }
  });
});
