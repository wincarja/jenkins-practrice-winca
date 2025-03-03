import { test } from '@playwright/test';

test('Bypass authenication by embeding credentials in url', async ({ page }) => {
  
  //write me a code to navigate to url https://practice.cydeo.com/basic_auth

   await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");
   await page.waitForTimeout(3000);

});

test('Bypass authenication by encoding credentials base64 format', async ({ page }) => {
  
  //write me a code to navigate to url https://practice.cydeo.com/basic_auth

  let encodedCredential = Buffer.from("admin:admin").toString("base64");

  page.setExtraHTTPHeaders({'Authorization': `Basic ${encodedCredential}`}); //${} is a placeholder

  await page.goto('https://practice.cydeo.com/basic_auth');
  await page.waitForTimeout(1000);
});