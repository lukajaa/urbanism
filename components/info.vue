<template>
  <component :is="term" />
</template>

<script setup lang="ts">
const props = defineProps<{
  term: string
}>()
</script>
