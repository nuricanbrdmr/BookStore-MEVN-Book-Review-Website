<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          @click="goToPage(currentPage - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page">
        <a
          class="page-link"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
          href="#"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click="goToPage(currentPage + 1)"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["newPage"]);

const goToPage = (newPage) => {
  emits("newPage", newPage);
};
</script>

<style lang="scss" scoped></style>
