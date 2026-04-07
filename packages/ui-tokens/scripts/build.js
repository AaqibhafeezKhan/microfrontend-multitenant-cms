const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../src/tokens.css");
const distDir = path.resolve(__dirname, "../dist");
const dest = path.join(distDir, "tokens.css");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log("ui-tokens: tokens.css copied to dist/");
