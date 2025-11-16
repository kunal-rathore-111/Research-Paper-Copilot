const chromium = require("@sparticuz/chromium");

async function getBrowser() {
    try {
        const puppeteerCore = require("puppeteer-core");
        const executablePath = await chromium.executablePath();
        return await puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: chromium.headless,
        });
    } catch (e) {
        const puppeteer = require("puppeteer");
        return await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
    }
}

async function generatePdf(html) {
    const browser = await getBrowser();
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
        });
        return pdf;
    } finally {
        await browser.close();
    }
}

module.exports = generatePdf;