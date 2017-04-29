const puppeteer = require('puppeteer')

module.exports = async function generatePdf (url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900
  });
  await page.goto(url);
  await page.pdf({ path: './src/pdf/LxxyxResume.pdf', format: 'A4' });
  console.log('PDF生成在 ./src/pdf 中了')
  browser.close()
}
