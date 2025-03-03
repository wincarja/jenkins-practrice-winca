import { test } from '@playwright/test';

test('Go to Google', async ({ page }) => {
  //navigate to google
  await page.goto('https://www.google.com');
  
  //pause for 2 seconds
  await page.waitForTimeout(1000);

  let searchBox = page.locator("//textarea[@id='APjFqb']");

  //type into search box
  await searchBox.fill('Cydeo World');

  await page.waitForTimeout(2000);

  await searchBox.press("Enter");

  await page.waitForTimeout(2000);
});

/*
 <textarea class="gLFyf" aria-controls="Alh6id" aria-owns="Alh6id" autofocus="" title="Search" 
 value="" aria-label="Search" placeholder="" aria-autocomplete="both" aria-expanded="false"
 aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" id="APjFqb" 
 maxlength="2048" name="q" role="combobox" rows="1" spellcheck="false" jsaction="paste:puy29d" 
 data-ved="0ahUKEwiSq-2Kiq6LAxUIETQIHUcPOewQ39UDCAY"></textarea>

*/