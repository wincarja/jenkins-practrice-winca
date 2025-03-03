import { test } from '@playwright/test';

test.describe('Test Group', () => {

  //create beforeEach that navigates to https://practice.cydeo.com/
  test.beforeEach(async ({ page })=> {
    await page.goto('https://practice.cydeo.com/');
  });
  //create afterEach that waits for 3 seconds after each test
  test.afterEach(async ({ page })=> {
    await page.waitForTimeout(3000);
  });

  test("check(): checks radio buttons and checkboxes if they haven't been checked yet", async ({ page }) => {
   let checkboxesLink = page.getByText("Checkboxes");
   await checkboxesLink.click();

   let checkbox1 = page.locator("//input[@id='box1']")
   await checkbox1.check();
  });

  test("uncheck(): unchecks radio buttons and checkboxes if they haven't been unchecked yet", async ({ page }) => {
      let checkboxesLink = page.getByText('Checkboxes');
      await checkboxesLink.click();

         let checkbox2 = page.locator("//input[@id='box2']");
         await checkbox2.uncheck();
  });

  test("selectOption(): used for dropdowns with select tagname", async ({ page }) => {
    let dropdownLink = page.getByText('Dropdown');
    await dropdownLink.click();

    let simpletDropdown = page.locator("//select[@id='dropdown']");
    // await simpletDropdown.selectOption('Option 2'); //selecting by value
    // await simpletDropdown.selectOption({ label: "Option 1" }); //selecting by value
    await simpletDropdown.selectOption({ index: 1 }); //selecting by index
  });



});
