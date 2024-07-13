<template>
  <section class="full-section-height">
    <div class="container">
      <SectionHeader title="Books" text="Burası books sayfası" />
      <div v-if="isLoading" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <BookList v-else :books="paginationBooks" />
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @newPage="updateCurrent"
      />
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "@/components/SectionHeader.vue";
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";
import { useBookStore } from "@/stores/bookStore.js";
import { ref, computed } from "vue";

const bookStore = useBookStore();

const isLoading = computed(() => bookStore.isLoading);

const currentPage = ref(1);
const itemsPerPage = ref(8);

const totalPages = computed(() => {
  return Math.ceil(bookStore.books.length / itemsPerPage.value);
});

const paginationBooks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return bookStore.books.slice(startIndex, endIndex);
});

const updateCurrent = (page) => {
  currentPage.value = page;
};
</script>

<style lang="css">
.auth-box {
  margin-top: -30px;
  margin-bottom: 15px;
}

.auth-box span {
  background-color: #063547;
  color: white;
  padding: 5px;
  border-radius: 20px;
}
</style>
