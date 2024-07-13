<template>
  <section>
    <Carousel :items="carouselItems" height="400px" />
  </section>
  <section class="my-5" style="margin-bottom: 120px !important">
    <div class="container">
      <SectionHeader title="Feature Books" text="" />
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'latest' }"
              @click="selectFilter('latest')"
            >
              Latest Books
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'best' }"
              @click="selectFilter('best')"
            >
              Best Ratings
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else class="accordion">
            <div
              class="accordion-item"
              v-for="(book, index) in FilteredBooks"
              :key="index"
            >
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  :class="{ collapsed: openAccordionIndex !== index }"
                  @click="toggleAccordion(index)"
                >
                  <strong>{{ book.title }} - {{ book.author }}</strong>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                :class="{ show: openAccordionIndex === index }"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img
                        src="@/assets/images/b1.jpg"
                        alt="accordion img"
                        class="img-fluid"
                      />
                    </div>
                    <div
                      class="col-md-8 d-flex flex-column justify-content-center"
                    >
                      <p>{{ book.description }}</p>
                      <div
                        class="badge align-self-start"
                        style="background-color: var(--secondary-color)"
                      >
                        {{
                          book.ratings.length > 0
                            ? (
                                book.ratings.reduce(
                                  (sum, rating) => sum + rating.rate,
                                  0
                                ) / book.ratings.length
                              ).toFixed(1)
                            : 0
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-5" style="background-color: #f5f6f9">
    <div class="container">
      <SectionHeader
        title="Latest Comments"
        text="We declare long prop names using camelCase because this avoids"
      />

      <div class="row d-flex justify-content-center">
        <div
          class="col-md-6"
          v-for="comment in preparedFourComments"
          :key="comment._id"
        >
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start align-items-center">
                <img
                  class="rounded-circle shadow-1-strong me-3"
                  src="../assets/images/c1.jpg"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <h6 class="fw-bold text-primary mb-1">
                    {{ comment.postedBy.username }}
                  </h6>
                  <p class="text-muted small mb-0">
                    {{ comment.bookTitle }} -
                    {{
                      new Date(comment.createdAt).toLocaleString("tr-TR", {
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

              <p class="mt-3 mb-4 pb-2">
                {{ comment.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "@/components/SectionHeader.vue";
import Carousel from "@/components/widgets/Carousel.vue";
import hero_1 from "@/assets/images/hero_1.jpg";
import hero_2 from "@/assets/images/hero_2.jpg";
import hero_3 from "@/assets/images/hero_3.jpg";
import { useBookStore } from "@/stores/bookStore.js";
import { useCommentStore } from "@/stores/commentStore";
import { ref, computed } from "vue";

const carouselItems = [
  {
    imageUrl: hero_1,
    subtitle: "Liberte",
    title: "Lorem Ipsum Dolor Sit Amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    imageUrl: hero_2,
    subtitle: "Egalite",
    title: "Excepteur Sint Occaecat Cupidatat",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    imageUrl: hero_3,
    subtitle: "Fraternite",
    title: "Neque Porro Quisquam Est",
    description:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  },
];

const bookStore = useBookStore();
const commentStore = useCommentStore();

const selectedFilter = ref("latest");
const openAccordionIndex = ref(0);

const selectFilter = (select) => {
  selectedFilter.value = select;
};

const toggleAccordion = (accordion) => {
  if (openAccordionIndex.value === accordion) {
    openAccordionIndex.value = -1;
  } else {
    openAccordionIndex.value = accordion;
  }
};

const preparedFourComments = computed(() => {
  const lasestFourComments = commentStore.comments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return lasestFourComments.map((comment) => {
    const correspondingBook = bookStore.books.find(
      (book) => book._id === comment.book
    );

    if (correspondingBook) {
      return {
        ...comment,
        bookTitle: correspondingBook.title,
      };
    }

    return comment;
  });
});

const FilteredBooks = computed(() => {
  if (selectedFilter.value === "latest") {
    return bookStore.latestFourBooks;
  } else if (this.selectedFilter === "best") {
    return bookStore.bestFourBooks;
  }
});

const isLoading = computed(() => bookStore.isLoading);
</script>

<style scoped>
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.accordion-button {
  color: var(--primary-color);
}

.accordion-button:not(.collapsed) {
  background-color: var(--secondary-color);
  color: white;
}

.accordion-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
