<template>
  <div class="container">
    <SectionHeader :title="book.title" :text="book.author" />
    <div class="d-flex">
      <font-awesome-icon
        icon="arrow-left"
        size="xl"
        class="mb-2"
        style="cursor: pointer; color: var(--secondary-color)"
        @click="goToBack"
      />
    </div>
    <div></div>
    <div class="row">
      <div class="col-md-6">
        <div class="image-box">
          <img class="img-fluid" src="../assets/images/b_detail.jpg" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex flex-column justify-content-between">
          <div class="mb-3" style="min-height: 200px">
            <p style="text-align: justify">
              {{ book.description }}
            </p>
          </div>
          <div class="d-flex flex-column">
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Page</strong></div>
              <div class="col-lg-6">{{ book.pageNumber }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Rating</strong></div>
              <div class="col-lg-6">
                {{ averageRating }} - ({{ ratingCount }} rates)
              </div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Upload Date</strong></div>
              <div class="col-lg-6">{{ book.updatedAt }}</div>
            </div>
            <div class="box mt-5" v-if="isLoggedIn">
              <div v-if="!isUserAlreadyRated || editMode">
                <h3 style="color: var(--primary-color)">
                  {{ editMode ? "Update Book Rating" : "Rating The Book" }}
                </h3>
                <form @submit.prevent="editMode ? editRate() : addRate()">
                  <!-- Rating Input -->
                  <div class="mb-3">
                    <input
                      type="number"
                      id="rating"
                      class="form-control w-50"
                      min="1"
                      max="10"
                      placeholder="Rate (1-10)"
                      required
                      v-model="userRate"
                    />
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="btn btn-primary">
                    {{ editMode ? "Update" : "Rate" }}
                  </button>

                  <button
                    type="button"
                    @click="cancelEditMode"
                    v-if="editMode"
                    class="btn btn-primary mx-3"
                  >
                    Cancel
                  </button>
                </form>
              </div>
              <div v-else>
                <p>Your Rate: {{ userRating }}</p>
                <button
                  type="button"
                  @click="toggleEditMode"
                  class="btn btn-primary"
                >
                  Update Rating
                </button>
              </div>
            </div>
            <div class="message-box mt-5" v-else>
              <p>Log in to rate.</p>
              <a href="/login" class="login-link">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr v-if="isLoggedIn" />
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="box" v-if="isLoggedIn">
          <h3 style="color: var(--primary-color)">Comment The Book</h3>
          <form @submit.prevent="addComment">
            <!-- Comment Text Area -->
            <div class="mb-3">
              <textarea
                id="comment"
                class="form-control"
                rows="4"
                placeholder="Enter your comment"
                required
                v-model="commentContent"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>

        <div class="message-box" v-else>
          <p>Log in to comment.</p>
          <a href="/login" class="login-link">Sign In</a>
        </div>
      </div>
    </div>
    <hr />
    <div></div>
    <div class="row my-3">
      <div class="col-md-12">
        <div class="box">
          <h3 style="color: var(--primary-color)">Comments</h3>
          <div>
            <div
              class="card mb-4"
              v-for="comment in commentStore.commentsForBook"
              :key="comment._id"
            >
              <div class="card-body">
                <p>
                  {{ comment.content }}
                </p>
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <p class="small mb-0 ms-2">
                      {{ comment.postedBy.username }}
                    </p>
                  </div>
                  <div
                    class="d-flex flex-row align-items-center"
                    style="gap: 10px"
                    v-if="!user"
                  >
                    <router-link
                      to="/login"
                      class="login-route text-muted mb-0"
                    >
                      Login for Upvote?
                    </router-link>
                    <font-awesome-icon
                      :icon="['fas', 'thumbs-up']"
                      style="color: var(--secondary-color)"
                    />
                    <p class="small text-muted mb-0">
                      {{ comment.upvotes.length }}
                    </p>
                  </div>
                  <div
                    class="d-flex flex-row align-items-center"
                    style="gap: 10px; cursor: pointer"
                    v-else-if="
                      !comment.upvotes.includes(user._id) &&
                      comment.postedBy._id !== user._id
                    "
                    @click="upvote(comment._id)"
                  >
                    <p class="small text-muted mb-0">Upvote?</p>
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="small text-muted mb-0">
                      {{ comment.upvotes.length }}
                    </p>
                  </div>
                  <div
                    class="d-flex flex-row align-items-center"
                    style="gap: 10px; cursor: pointer"
                    v-else-if="
                      comment.upvotes.includes(user._id) &&
                      comment.postedBy._id !== user._id
                    "
                    @click="downvote(comment._id)"
                  >
                    <p class="small text-muted mb-0">Downvote?</p>
                    <font-awesome-icon
                      :icon="['fas', 'thumbs-up']"
                      style="color: var(--secondary-color)"
                    />
                    <p class="small text-muted mb-0">
                      {{ comment.upvotes.length }}
                    </p>
                  </div>
                  <div
                    class="d-flex flex-row align-items-center"
                    style="gap: 10px"
                    v-else
                  >
                    <p class="small mb-0">
                      You can't like your own interpretation!
                    </p>
                    <font-awesome-icon
                      :icon="['fas', 'thumbs-up']"
                      style="color: var(--secondary-color)"
                    />
                    <p class="small text-muted mb-0">
                      {{ comment.upvotes.length }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionHeader from "@/components/SectionHeader.vue";
import { useBookStore } from "@/stores/bookStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import { useCommentStore } from "@/stores/commentStore.js";
import { useToast } from "vue-toastification";
import { useRateStore } from "@/stores/ratingStore.js";
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const commentStore = useCommentStore();
const rateStore = useRateStore();
const authStore = useAuthStore();
const bookStore = useBookStore();

const book = ref({});
const loading = ref(true);
const commentContent = ref("");
const userRate = ref(null);
const editMode = ref(false);
const updateUserRating = reactive({
  id: "",
  newRating: null,
});

const user = computed(() => authStore.user);
const isLoggedIn = computed(() => authStore.user);

commentStore.fetchCommentsForBook(route.params.id);
rateStore.fetchRateForBook(route.params.id);

const showToast = (message, options) => {
  const toast = useToast();
  toast(message, {
    position: "top-right",
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
    ...options,
  });
};

const addComment = async () => {
  try {
    const bookId = route.params.id;
    const content = commentContent.value;
    const userId = authStore.user._id;

    await commentStore.addNewComment({
      bookId,
      content,
      userId,
    });

    await commentStore.fetchCommentsForBook(bookId);

    commentContent.value = "";

    showToast("Your Comment Successfully Recorded.", {
      type: "success",
      timeout: 1500,
    });
  } catch (error) {}
};

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const cancelEditMode = () => {
  editMode.value = false;
};

const addRate = async () => {
  try {
    const bookId = route.params.id;
    const rate = userRate.value;
    const userId = authStore.user._id;

    await rateStore.addNewRate({
      bookId,
      rate,
      userId,
    });

    await rateStore.fetchRateForBook(bookId);

    userRate.value = null;

    showToast("Your Rate Successfully Recorded.", {
      type: "success",
      timeout: 1500,
    });
  } catch (error) {}
};

const editRate = async () => {
  try {
    const userRatingObj = rateStore.ratingsForBook.find(
      (rating) => rating.ratedBy._id === authStore.user._id
    );

    updateUserRating.id = userRatingObj._id;
    updateUserRating.newRating = userRate.value; // use `userRate.value` directly

    await rateStore.updateRate(updateUserRating);

    await rateStore.fetchRateForBook(route.params.id);

    editMode.value = false;

    showToast("User Raing Update Success.", {
      type: "success",
      timeout: 1500,
    });
  } catch (error) {
    console.log("Error editRate", error);
  }
};

const upvote = async (commentId) => {
  try {
    await commentStore.upvoteComment(commentId);

    await commentStore.fetchCommentsForBook(route.params.id);
  } catch (error) {
    console.log("Error upvote", error);
  }
};

const downvote = async (commentId) => {
  try {
    await commentStore.downvoteComment(commentId);

    await commentStore.fetchCommentsForBook(route.params.id);
  } catch (error) {
    console.log("Error downvote", error);
  }
};

const goToBack = () => {
  router.push({ name: "books" });
};

const selectBook = () => {
  const bookId = route.params.id;
  book.value = bookStore.selectedBook(bookId);
  loading.value = false;
};

selectBook();

const averageRating = computed(() => {
  if (rateStore.ratingsForBook.length > 0) {
    const totalRating = rateStore.ratingsForBook.reduce(
      (sum, rating) => sum + rating.rate,
      0
    );
    return (totalRating / rateStore.ratingsForBook.length).toFixed(1);
  } else {
    return 0;
  }
});

const ratingCount = computed(() => {
  return rateStore.ratingsForBook ? rateStore.ratingsForBook.length : 0;
});

const isUserAlreadyRated = computed(() => {
  if (!authStore.user) {
    return false;
  }

  return rateStore.ratingsForBook.some(
    (rating) => rating.ratedBy._id === authStore.user._id
  );
});

const userRating = computed(() => {
  const userRatingObj = rateStore.ratingsForBook.find(
    (rating) => rating.ratedBy._id === authStore.user._id
  );

  return userRatingObj ? userRatingObj.rate : null;
});
</script>

<style scoped>
.image-box {
  height: 600px;
  overflow: hidden;
}
.image-box img {
  width: 100% !important;
}

.btn-primary {
  height: 36px;
  min-width: 120px;
  border-radius: 16px;
}
.box {
  border: 1px solid #e2e3e5;
  border-radius: 10px;
  padding: 20px;
}

.message-box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.message-box p {
  margin-bottom: 16px;
  font-size: 18px;
}

.login-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.3s;
}

.login-link:hover {
  background-color: #fff;
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}

.login-route:hover {
  color: var(--secondary-color) !important;
  text-decoration-line: underline !important;
  text-decoration-color: var(--secondary-color) !important;
  text-decoration-thickness: 1px !important;
}
</style>
