<template>
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th>Content</th>
            <th>Book</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <transition-group name="list">
            <tr v-for="comment in paginationComments" :key="comment._id">
              <td>{{ comment.content }}</td>
              <td>{{ comment.book.title }}</td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'edit']"
                  class="text-warning"
                  style="cursor: pointer"
                  @click="openEditModal(comment)"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                  @click="deleteComment(comment._id)"
                />
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
    </div>
  </div>

  <div class="row">
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @newPage="updateCurrent"
    />
  </div>

  <!-- Edit Comment Modal -->
  <div
    class="modal fade"
    ref="editCommentModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">Edit Comment</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeEditModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="editContent" class="form-label">Content</label>
            <textarea
              id="editContent"
              class="form-control"
              rows="4"
              v-model="editComment.content"
            ></textarea>
          </div>
          <div class="text-end">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeEditModal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary ms-2"
              @click="saveEditedComment"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useCommentStore } from "@/stores/commentStore";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "vue-toastification";
import { Modal } from "bootstrap";
import Pagination from "@/components/Pagination.vue";

const commentStore = useCommentStore();
const authStore = useAuthStore();

const editComment = reactive({
  id: "",
  content: "",
});

let modal = ref(null);
const editCommentModal = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);

commentStore.fetchCommentsByUser(authStore.user._id);

const updateCurrent = (page) => {
  currentPage.value = page;
};

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

const deleteComment = async (commentId) => {
  try {
    await commentStore.deleteTheComment(commentId);
    await commentStore.fetchCommentsByUser(authStore.user._id);
    showToast("Comment deleted successfully!", {
      type: "warning",
      timeout: 1500,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

const openEditModal = (comment) => {
  editComment.id = comment._id;
  editComment.content = comment.content;
  modal.show();
};

const saveEditedComment = async () => {
  try {
    await commentStore.editTheComment(editComment.id, {
      content: editComment.content,
    });
    showToast("Comment edited successfully!", {
      type: "success",
      timeout: 1500,
    });
    await commentStore.fetchCommentsByUser(authStore.user._id);
    modal.hide();
  } catch (error) {
    console.error("Error editing comment:", error);
  }
};

const closeEditModal = () => {
  modal.hide();
};

const userComments = computed(() => {
  return commentStore.CommentsByUser.slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
});

const totalPages = computed(() => {
  return Math.ceil(userComments.value.length / itemsPerPage.value);
});

const paginationComments = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return userComments.value.slice(startIndex, endIndex);
});

onMounted(() => {
  modal = new Modal(editCommentModal.value);
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
