
const puppeteer = require("puppeteer");

async function generatePdf(html) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { left: "20px", right: "20px", top: "20px", bottom: "20px" }
    });

    await browser.close();
    return pdfBuffer;
}

module.exports = generatePdf;