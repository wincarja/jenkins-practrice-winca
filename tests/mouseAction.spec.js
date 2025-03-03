import { test } from '@playwright/test';

test.describe('Test Group', () => {
  //create beforeEach that navigates to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');
  });

  //create afterEach that waits for 3 seconds after each test
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
  });


  test('Left click', async ({ page }) => {
    await page.click("text='A/B Testing'");
    let ABTestPageHeader = page.locator("//div[@id='content']//h3");
    let ABTestPageHeaderText = await ABTestPageHeader.innerText();
    console.log(ABTestPageHeaderText);    
  });



  test('Right click', async ({ page }) => {
    page.click("text='A/B Testing'", {button: "right"});
  });



  test('Hover over', async ({ page }) => {
    page.getByText('Hovers').click();
    await page.waitForTimeout(1000);
    // await page.hover("//img[@alt='User Avatar']");

    let userImages = await page.locator("//img[@alt='User Avatar']").all();

    for(let image of userImages) {
      await page.waitForTimeout(1000);
      await image.hover();
    }
  });



  test('Mouse wheel scrolling', async ({ page }) => {
    await page.waitForTimeout(1000);
    await page.mouse.wheel( 0, 2500 );
  });



  test('Scroll to a specific delement', async ({ page }) => {
    let inputElement = page.getByText('Input');
    await page.waitForTimeout(1000);
    await inputElement.scrollIntoViewIfNeeded();
    inputElement.click();
  });



  test('Drag and drop', async ({ page }) => {
    await page.click("text='Drag and Drop'");
    await page.waitForTimeout(1000);
    // await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']");

    let squareA = page.locator("//div[@id='column-a']");
    let squareB = page.locator("//div[@id='column-b']");
    await squareA.dragTo(squareB);
  });
});
