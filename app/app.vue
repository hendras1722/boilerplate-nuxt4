<script lang="ts" setup>
import Splashscreen from './components/Splashscreen.vue';
</script>

<template>
  <NuxtPwaManifest />
  <Splashscreen />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
