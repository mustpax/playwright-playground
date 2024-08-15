import playwright from "playwright-core";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const token = process.env.BROWSERLESS_TOKEN;
  if (!token) {
    throw new Error(
      "BROWSERLESS_TOKEN is not set in the environment variables."
    );
  }
  const pwEndpoint = `wss://production-sfo.browserless.io/firefox/playwright?token=${token}`;
  const browser = await playwright.firefox.connect(pwEndpoint);
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.nexcess.net/web-tools/browser-information/");
  await sleep(50000);
  await page.screenshot({
    path: `firefox.png`,
  });

  await browser.close();
}

main().catch((e) => console.error(e));
