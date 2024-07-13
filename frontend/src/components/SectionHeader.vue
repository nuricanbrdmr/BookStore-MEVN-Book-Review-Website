<template>
  <div class="text-center mt-3">
    <h1 class="display-4 font-weight-bolder">{{ title }}</h1>
    <p class="lead">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps(["title", "text"]);
</script>

<style lang="css" scoped></style>
