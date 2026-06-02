<script setup lang="ts">
import { Role } from "#shared/enums/Role";

definePageMeta({
  layout: "screen",
  middleware: ["require-auth"],
  allowedRoles: [Role.USER, Role.ADMIN],
});

const routes: Ref<string[]> = ref(["Admin"]);

const colorMode = useColorMode();

// The Auth data
const { user, clear: clearSession } = useUserSession();
console.log(user.value);

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};

const logout = async () => {
  await clearSession();
  await navigateTo("/login");
};
</script>

<template>
  <div class="flex-1 w-full flex flex-col items-center justify-center gap-3">
    <div class="w-full flex flex-col items-center justify-center gap-3">
      <!-- Gretting message -->
      <p>
        Hello <b>{{ user?.userName }}</b> Welcome to this template
      </p>
      <!-- Buttons -->
      <div class="flex flex-row items-center justify-center gap-3">
        <CustomLink
          v-for="route in routes"
          :text="route"
          :url="route"
          :key="route"
        />

        <ClientOnly>
          <button
            @click="toggleTheme"
            class="px-3 py-1 rounded bg-zinc-200 text-zinc-black hover:bg-zinc-200/70 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-900/70 transition-colors ease-in-out duration-200 cursor-pointer"
          >
            {{ colorMode?.value }}
          </button>

          <template #fallback>
            <button class="px-3 py-1 rounded">loading...</button>
          </template>
        </ClientOnly>

        <button
          @click="logout"
          class="px-3 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-500"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
