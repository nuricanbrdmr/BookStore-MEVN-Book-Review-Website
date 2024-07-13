<template>
  <div class="row">
    <div
      class="col-sm-6 col-md-4 col-xl-3 my-3"
      v-for="book in books"
      :key="book._id"
    >
      <RouterLink :to="'/books/' + book._id">
        <BookItem :book="book" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import BookItem from "@/components/BookItem.vue";
const props = defineProps({
  books: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>
