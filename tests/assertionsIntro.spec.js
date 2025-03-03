import { test, expect } from '@playwright/test';

test.describe('Test Group', () => {
  //create beforeEach that navigates to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');

    await expect(page).toHaveTitle("Practice");
    //----------------or--------------------- 
    expect( await page.title() ).toContain("Practice");
  });

  //create afterEach that waits for 3 seconds after each test
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
  });


  test("Verify checkboxes are checked", async ({ page }) => {
    await page.locator("//a[@href='/checkboxes']").click();
    let checkbox1 = page.locator("//input[@id='box1']");
    let checkbox2 = page.locator("//input[@id='box2']");

    checkbox1.check();
    checkbox2.check();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
    //-------------------or--------------------- 
    expect ( await checkbox1.isChecked() ).toBeTruthy();
    expect ( await checkbox2.isChecked() ).toBeTruthy();
  });


  test("Verify checkboxes are unchecked", async ({ page }) => {
        await page.locator("//a[@href='/checkboxes']").click();
        let checkbox1 = page.locator("//input[@id='box1']");
        let checkbox2 = page.locator("//input[@id='box2']");

        await checkbox1.uncheck();
        await checkbox2.uncheck();

        await expect(checkbox1).not.toBeChecked();
        await expect(checkbox2).not.toBeChecked();
        //-------------------or---------------------
        expect(await checkbox1.isChecked()).toBeFalsy();
        expect(await checkbox2.isChecked()).toBeFalsy();
  });


  test("Verify text of the element", async ({ page }) => {
    
      let pageHeaderElement = page.locator("//h1/span[@class='h1y']");
      let pageHeaderText = await pageHeaderElement.innerText();

      expect(pageHeaderText).toBe("Test Automation Practice");
      //-------------------or---------------------
      await expect(pageHeaderElement).toHaveText("Test Automation Practice");
  });
  
});
