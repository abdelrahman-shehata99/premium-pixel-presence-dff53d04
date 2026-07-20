// Turns the SSR (node-server preset) build in .output/server into a fully static
// site in .output/public, ready to upload as a GitHub Pages artifact.
//
// The nitro "static"/"github-pages" presets hit an upstream bug in the pinned nitro
// beta (SSR build fails during the prerender crawl step), so instead we boot the
// working node-server build, fetch the one real route ourselves, and write the
// resulting HTML alongside the already-built client assets.
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const PORT = 4173;
const BASEPATH = "/abdo-shehata";
const outDir = path.resolve(import.meta.dirname, "../.output/public");

const server = spawn(process.execPath, [path.resolve(import.meta.dirname, "../.output/server/index.mjs")], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: "inherit",
});

const stopServer = () => server.kill();

try {
  await waitForServer(`http://localhost:${PORT}${BASEPATH}/`);

  const res = await fetch(`http://localhost:${PORT}${BASEPATH}/`);
  if (!res.ok) {
    throw new Error(`Failed to prerender ${BASEPATH}/: HTTP ${res.status}`);
  }
  const html = await res.text();

  await writeFile(path.join(outDir, "index.html"), html);
  // GitHub Pages fallback for unknown paths (client-side router handles them from here).
  await writeFile(path.join(outDir, "404.html"), html);
  await writeFile(path.join(outDir, ".nojekyll"), "");

  console.log(`Static site written to ${outDir}`);
} finally {
  stopServer();
}

async function waitForServer(url, timeoutMs = 15_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  throw new Error(`Server did not become ready at ${url} within ${timeoutMs}ms`);
}
