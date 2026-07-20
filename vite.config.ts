// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GITHUB_PAGES is only set by the `build:pages` script (used by the GitHub Actions
// deploy workflow). It's kept out of the default build so Lovable's own Cloudflare
// build/dev flow is untouched.
const isGithubPages = process.env.GITHUB_PAGES === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGithubPages ? { router: { basepath: "/abdo-shehata" } } : {}),
  },
  ...(isGithubPages ? { vite: { base: "/abdo-shehata/" } } : {}),
  // The "static"/"github-pages" Nitro presets hit an upstream bug in this pinned
  // nitro beta (SSR build fails on the prerender crawler step), so we build with
  // the stable node-server preset instead and snapshot the rendered HTML ourselves
  // (see scripts/build-static-pages.mjs).
  ...(isGithubPages ? { nitro: { preset: "node-server" } } : {}),
});
