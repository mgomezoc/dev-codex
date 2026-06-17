const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Navigate to the application
  await page.goto('http://localhost:8000/index.html');
  
  // Wait for content to load
  await page.waitForTimeout(1000);
  
  // Get initial slide number
  const initialSlide = await page.evaluate(() => {
    return document.querySelector('[data-slide-number]')?.getAttribute('data-slide-number') || 'unknown';
  });
  console.log('Initial slide:', initialSlide);
  
  // Check if buttons exist
  const nextBtnExists = await page.$('#next-btn') !== null;
  const prevBtnExists = await page.$('#prev-btn') !== null;
  console.log('Next button exists:', nextBtnExists);
  console.log('Prev button exists:', prevBtnExists);
  
  // Click next button
  if (nextBtnExists) {
    await page.click('#next-btn');
    await page.waitForTimeout(500);
    
    const slideAfterNext = await page.evaluate(() => {
      return document.querySelector('[data-slide-number]')?.getAttribute('data-slide-number') || 'unknown';
    });
    console.log('Slide after clicking next:', slideAfterNext);
  }
  
  // Click prev button
  if (prevBtnExists) {
    await page.click('#prev-btn');
    await page.waitForTimeout(500);
    
    const slideAfterPrev = await page.evaluate(() => {
      return document.querySelector('[data-slide-number]')?.getAttribute('data-slide-number') || 'unknown';
    });
    console.log('Slide after clicking prev:', slideAfterPrev);
  }
  
  // Get console messages
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('error', err => console.log('PAGE ERROR:', err));
  
  await page.waitForTimeout(1000);
  await browser.close();
  console.log('Test completed');
})().catch(console.error);
