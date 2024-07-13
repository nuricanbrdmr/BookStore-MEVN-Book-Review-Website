<template>
  <div class="card border-0 shadow position-relative">
    <img src="@/assets/images/b1.jpg" alt="book image" class="card-img-top" />
    <div class="card-body">
      <div class="auth-box">
        <span>
          {{ book.author }}
        </span>
      </div>
      <h5 class="card-title fw-semibold">
        {{ book.title }}
      </h5>
      <p class="card-text">
        {{ truncatedText }}
      </p>
      <div class="d-flex justify-content-between aling-items-center">
        <a href="#" class="card-link text-decoration-none">Read More</a>
        <p
          style="background-color: #063547"
          class="py-1 px-2 text-white badge mb-0"
        >
          {{
            new Date(book.createdAt).toLocaleString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </p>
      </div>
    </div>
    <span
      :class="ratingBadgeClass"
      class="custom-center position-absolute top-0 start-100 translate-middle p-2 text-light rounded-circle border border-2 border-light"
    >
      {{ averageRating }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  book: {
    type: Object,
    default: () => ({}),
  },
});

const averageRating = computed(() => {
  if (props.book.ratings.length > 0) {
    const totalRating = props.book.ratings.reduce(
      (sum, rating) => sum + rating.rate,
      0
    );
    return (totalRating / props.book.ratings.length).toFixed(1);
  } else {
    return "-";
  }
});

const ratingBadgeClass = computed(() => {
  if (averageRating.value > 7 || averageRating.value === "-") {
    return "bg-success";
  } else if (averageRating.value > 5) {
    return "bg-warning";
  } else {
    return "bg-danger";
  }
});

const truncatedText = computed(() => {
  if (props.book.description.length > 80) {
    return props.book.description.slice(0, 80) + "...";
  }
  return props.book.description;
});
</script>

<style scoped>
.card-text {
  min-height: 70px;
}
.custom-center {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
