import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    // Environment variables that are accessible on the client-side
    public: {
      appEnv: "",
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@vueuse/core",
        "class-variance-authority",
        "clsx",
        "reka-ui",
        "tailwind-merge",
      ],
    },
  },

  modules: ["nuxt-auth-utils", "@nuxtjs/color-mode", "shadcn-nuxt"],
});
