const puppeteer = require('puppeteer');
const getImage = async () => {
    try {
        setInterval(async () => {
            var browser = null;
            var page = null;

            try {
                console.log("ABRINDO NAVEGADOR...");
                browser = await puppeteer.launch();
                page = await browser.newPage();
                await page.goto("https://www.mir4draco.com/");
                await page.screenshot({ path: 'draco.jpg' });
            }
            catch (err) {
                console.log('deu erro na hora de buscar man');
            }
            finally {
                if (page)
                    await page.close();
                if (browser)
                    await browser.close();
            }
        }, 15000);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = getImage;

