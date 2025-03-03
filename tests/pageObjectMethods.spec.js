import { test } from '@playwright/test';

test('getting the title of a page', async ({ page }) => {
  await page.goto('https://practice.cydeo.com/');

  let actualTitle = await page.title();
  console.log(actualTitle);
});


test('Getting the current url of the page', async ({ page }) => {
  await page.goto('https://practice.cydeo.com/');
  let actualUrl = await page.url();
  console.log(actualUrl);
});


test('Set the window size', async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');
    await page.waitForTimeout(2000);
    //await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(2000);
});

 








