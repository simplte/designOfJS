<script setup lang="ts">
defineProps<{
  msg: String;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a>
      +
      <a target="_blank" href="https://v3.vuejs.org/">Vue 3</a>
      . What's next?
    </h3>
  </div>
</template>

<style scoped lang="scss">
.greetings {
  width: 100%;

  .green {
    font-size: 10px;
  }
}
</style>
