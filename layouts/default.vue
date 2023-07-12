<template :class="$colorMode.value">
  <div class="min-h-screen bg-white text-gray-950 transition duration-300 dark:bg-gray-950 dark:text-white">
    <ThemeSwitcher />
    <slot />
    <FooterComponent />
  </div>
</template>
