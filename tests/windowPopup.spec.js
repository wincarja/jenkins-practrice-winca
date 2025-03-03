import { test, expect } from '@playwright/test';

// create a beforeEach hook that navigates to https://practice.cydeo.com/windows
// test.beforeEach(async ({ page }) => {
//   await page.goto('https://practice.cydeo.com/windows');
// });


test('pop-up and window handle', async ({ page }) => {
  //create EventLister for monitor window popups
  let newPageEventPromise = page.waitForEvent("popup");

  await page.goto("https://practice.cydeo.com/windows");
  let clickHereButton = page.locator("//a[@href='/windows/new']");
  await clickHereButton.click();          //triggers the pop-up event

  let newPage = await newPageEventPromise; //await for the promise to be resolved

  await expect(newPage).toHaveTitle("New Window");
  await expect(page).toHaveTitle("Windows");

      // let newPageHeaderElement = newPage.locator("//h3");
      // let newPageHeaderText = await newPageHeaderElement.innerText();
      // expect(newPageHeaderText).toBe('New Window');

      // let pageHeaderElement = page.locator("//h3");
      // let pageHeaderText = await pageHeaderElement.innerText();
      // expect(pageHeaderText).toBe('Opening a new window');

  await page.bringToFront(); //bring the new window to the front

  let firstWindowElement = page.getByText('Opening a new window');
  await expect(firstWindowElement).toBeVisible();

  await newPage.bringToFront(); //bring the new window to the
  
  let newWindowElement = newPage.getByText('New Window');
  await expect(newWindowElement).toBeVisible();
});
