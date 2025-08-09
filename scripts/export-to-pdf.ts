import { exec } from "node:child_process";
import { chromium } from "playwright";

console.log("Starting dev server...");
const devServer = exec("yarn run dev");
const hostRegex = /(http:\/\/localhost:\d+)/;
let host: string | undefined;
if (!devServer.stdout) {
  devServer.kill();
  throw Error("Dev server cannot started");
}

const stripAnsiCodes = (str: string): string =>
  str.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: for strip ansi codes
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );
for await (const line of devServer.stdout) {
  console.log(line);
  const result = stripAnsiCodes(line.toString()).match(hostRegex);
  if (result) {
    host = result[1];
    break;
  }
}
if (!host) {
  devServer.kill();
  throw Error("Cannot get host from stdout");
}

console.log("exporting to pdf...");
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
page.on("console", (message) => console.log(message));
await page.goto(host);

await page.pdf({ path: "resume.pdf", format: "A4" });

console.log("killing dev server...");
devServer.kill();
console.log("closing context...");
await context.close();
console.log("closed browser...");
await browser.close();

process.exit(0);
