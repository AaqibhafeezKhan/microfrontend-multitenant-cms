const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const run = (cmd) => execSync(cmd, { stdio: "inherit", shell: true });

const DIST = path.resolve(__dirname, "..", "dist");

const mfes = [
  { filter: "@cms/editorial", srcDir: "apps/editorial/dist", destName: "editorial" },
  { filter: "@cms/media",     srcDir: "apps/media/dist",     destName: "media"     },
  { filter: "@cms/auth",      srcDir: "apps/auth/dist",      destName: "auth"      },
  { filter: "@cms/collab",    srcDir: "apps/collab/dist",    destName: "collab"    },
  { filter: "@cms/settings",  srcDir: "apps/settings/dist",  destName: "settings"  },
];

console.log("==> Building shared packages");
run("npx turbo run build --filter=@cms/event-bus --filter=@cms/tenant-config --filter=@cms/shared-store --filter=@cms/ui-tokens");

console.log("==> Building microfrontends");
for (const mfe of mfes) {
  console.log(`    Building ${mfe.filter}`);
  run(`npx turbo run build --filter=${mfe.filter}`);
}

console.log("==> Building analytics");
run("npx turbo run build --filter=@cms/analytics");

console.log("==> Building shell");
run("npx turbo run build --filter=@cms/shell");

console.log("==> Assembling unified dist/");
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const copyDir = (src, dest) => {
  const srcAbs = path.resolve(__dirname, "..", src);
  if (!fs.existsSync(srcAbs)) {
    console.warn(`    WARNING: ${srcAbs} does not exist, skipping`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(srcAbs, dest, { recursive: true });
  console.log(`    Copied ${src} -> ${path.relative(path.resolve(__dirname, ".."), dest)}`);
};

copyDir("apps/shell/dist", DIST);

for (const mfe of mfes) {
  copyDir(mfe.srcDir, path.join(DIST, mfe.destName));
}

copyDir("apps/analytics/dist", path.join(DIST, "analytics"));

console.log("==> Build complete. Output: dist/");
console.log("    Structure:");
console.log("    dist/             <- shell (served at /)");
for (const mfe of mfes) {
  console.log(`    dist/${mfe.destName}/  <- ${mfe.filter} remote`);
}
console.log("    dist/analytics/   <- Next.js static export");
