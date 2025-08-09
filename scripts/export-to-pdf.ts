import { exec } from "node:child_process";
import { chromium } from "playwright-chromium";

const devServer = exec("yarn dev --port 9000");
if (devServer.stdout) {
  for await (const line of devServer.stdout) {
    if (line.toString().includes("Local:   http://localhost:9000")) {
      break;
    }
  }
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:9000");

await page.pdf({ path: "resume.pdf", format: "A4" });

await page.close();
await browser.close();
devServer.kill();
