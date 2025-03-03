import { expect, test } from '@playwright/test';

//create a beforeEach hook that navigates to https://practice.cydeo.com/web-tables
test.beforeEach(async ({ page }) => {
  await page.goto('https://practice.cydeo.com/web-tables');
});

//create an afterEach hook that waits for 3 seconds after each test
test.afterEach(async ({ page }) => {
  await page.waitForTimeout(1000);
});

test('Web Table practice @webtables', async ({ page }) => {
  let webtable = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

  //get the count of all the rows in the table
  let rows = await webtable.locator('//tr').all();
  expect(rows.length).toBe(9);
  console.log(`Rows count is:  ${rows.length}`);

  //get the count of all the columns in the table
  let columns = await webtable.locator('//th').all();
  expect(columns.length).toBe(13);
  console.log(`Columns count is:  ${columns.length}`);

  //get the count of all the cells in the table
  let cells = await webtable.locator('//td').all();
  expect(cells.length).toBe(104);
  console.log(`Cells count is:  ${cells.length}`);

  //get all the cell data from the table
  for (let cell of cells) {
    console.log(await cell.textContent());
  }
});



test('Cell data from each row', async ({ page }) => {
  let webtable = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

  let rows = await webtable.locator('//tr').all();

  //create a loop that can print each cells data of each row
  for (let row of rows) {
    let cells = await row.locator('//td').all();
    for (let i = 1; i < cells.length - 1; i++) {
      console.log(await cells[i].textContent());
    }
  }
});



test('Select checkbox', async ({ page }) => {

let webtable = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

let checkboxes = await webtable.locator("//input[@type='checkbox']").all();

for (const checkbox of checkboxes) {
  await checkbox.check();
  expect (checkbox.isChecked()).toBeTruthy();
}

});
