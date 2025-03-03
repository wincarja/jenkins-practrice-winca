import { test } from '@playwright/test';

test('@env-test', async ({ page }) => {
  
  //call the environment variables

  console.log(`Username is ${process.env.PRACTICE_USERNAME}`);
  console.log(`Password is ${process.env.PRACTICE_PASSWORD}`);
});


test('Bypass authenication by encoding credentials base64 format', async ({page,}) => {
  //write me a code to navigate to url https://practice.cydeo.com/basic_auth
 
  let encodedCredential = Buffer.from(`${process.env.PRACTICE_USERNAME}:${process.env.PRACTICE_PASSWORD}`).toString('base64');

  page.setExtraHTTPHeaders({ Authorization: `Basic ${encodedCredential}` }); //${} is a placeholder

  await page.goto('https://practice.cydeo.com/basic_auth');
  await page.waitForTimeout(2000);
});



