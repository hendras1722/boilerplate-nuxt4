<script setup lang="ts">
const loadingPage = useLoadingPage();
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

definePageMeta({
  activeSidebar: 'dashboard'
})

const get = await useFetch('https://jsonplaceholder.typicode.com/posts')
await sleep(1000)
</script>

<template>
  <div>
    {{ get }}
    <h1>Welcome to the Admin Dashboard</h1>
    {{ loadingPage }}
  </div>
</template>
