// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  routeRules: {
    "/api/**": { proxy: `${process.env.API}/api/**` },
    "/:id/dashboard": { ssr: false },
  },

  runtimeConfig: {
    apiUrl: process.env.API,
    public: {
      cookieConfig: {
        domain: (process.env.DOMAIN as string) ?? "localhost",
        secure: true,
        maxAge: 30 * 24 * 60 * 60,
      },
    },
  },
});

console.log("API URL at build time:", process.env.API);
