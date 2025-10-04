// test.js
import puppeteer from "puppeteer-core";

async function main() {
  const browser = await puppeteer.connect({
    browserWSEndpoint: "wss://chromeserver-foyi.onrender.com" // coloque seu endpoint aqui
  });

  const page = await browser.newPage();

  // Vai para o Google
  await page.goto("https://www.google.com", { waitUntil: "domcontentloaded" });

  // Digita no campo de busca
  await page.type("textarea", "Mata sede", { delay: 100 });

  await Promise.all([
    page.keyboard.press("Enter"),
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
  ]);

  // Pega os links dos resultados
  const topLinks = await page.evaluate(() => {
    const results = [...document.querySelectorAll("#search a")];
    return results.map(el => ({
      text: el.innerText,
      href: el.getAttribute("href"),
    }));
  });

  // Mostra no console
  console.log("Resultados encontrados:");
  console.log(topLinks);

  await browser.close();
}

main().catch(err => {
  console.error("Erro:", err);
});
