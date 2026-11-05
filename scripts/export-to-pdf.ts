import { spawn } from "node:child_process";
import { chromium } from "playwright";

const hostRegex = /(http:\/\/localhost:\d+)/;
const stripAnsiCodes = (str: string): string =>
  str.replace(
    // biome-ignore lint/suspicious/noControlCharactersInRegex: for strip ansi codes
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    "",
  );

console.log("Starting dev server...");
// pnpm -> vocs の子プロセスもまとめて停止できるよう、別プロセスグループで起動する
const devServer = spawn("pnpm", ["run", "dev"], {
  detached: true,
  stdio: ["ignore", "pipe", "inherit"],
});
const killDevServer = () => {
  if (devServer.pid === undefined || devServer.exitCode !== null) return;
  try {
    process.kill(-devServer.pid, "SIGTERM");
  } catch {
    // 既に終了している場合は何もしない
  }
};

try {
  // dev サーバーは URL の出力後もログを書き込むため、stdout は最後まで読み続ける
  // (途中で読み取りをやめてパイプを閉じると、書き込み時に dev サーバーが終了する)
  const host = await new Promise<string>((resolve, reject) => {
    devServer.stdout.on("data", (chunk: Buffer) => {
      process.stdout.write(chunk);
      const result = stripAnsiCodes(chunk.toString()).match(hostRegex);
      if (result) resolve(result[1]);
    });
    devServer.once("exit", () =>
      reject(Error("Dev server exited before printing host")),
    );
  });

  console.log("exporting to pdf...");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    page.on("console", (message) => console.log(message));
    await page.goto(host, { waitUntil: "networkidle" });
    await page.pdf({ path: "resume.pdf", format: "A4" });
  } finally {
    console.log("closing browser...");
    await browser.close();
  }
} finally {
  console.log("killing dev server...");
  killDevServer();
}
