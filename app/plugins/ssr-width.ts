import { provideSSRWidth } from "@vueuse/core";

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp);
});

// To avoid shadcn hydration problems on mobile (Shadcn docs)
