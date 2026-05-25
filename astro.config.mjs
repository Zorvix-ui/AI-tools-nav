import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://aitoolnav.com",
  integrations: [tailwind(), sitemap()],
  output: "static",
  trailingSlash: "never",
  adapter: cloudflare()
});