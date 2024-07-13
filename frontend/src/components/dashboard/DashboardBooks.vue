<template>
  <!-- Button -->
  <div class="row mb-3">
    <div class="col text-end">
      <button type="button" @click="addOpenModal()" class="btn btn-primary">
        Add Book
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Page</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="book in paginationBooks" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td style="max-width: 250px; text-align: justify">
                {{ book.description }}
              </td>
              <td>{{ book.pageNumber }}</td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
                  @click="editOpenModal(book)"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                  @click="deleteBook(book._id, book.title)"
                />
              </td>
            </tr>
          </TransitionGroup>
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

  <!-- Modal -->
  <div class="modal fade" ref="BooksModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">{{ modalTitle }}</h5>
          <button
            type="button"
            @click="modal.hide()"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body mx-5">
          <div class="col mb-3">
            <label for="title" class="form-label"
              >Title
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              required
              v-model="bookData.title"
            />
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Author
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="author"
              name="author"
              required
              v-model="bookData.author"
            />
          </div>
          <div class="col mb-3">
            <label for="description" class="form-label"
              >Description
              <span class="text-danger">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              class="form-control"
              cols="30"
              rows="4"
              v-model="bookData.description"
            ></textarea>
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Number of Pages
              <span class="text-danger">*</span>
            </label>
            <input
              type="number"
              class="form-control"
              id="numOfPages"
              name="numOfPages"
              required
              v-model="bookData.pageNumber"
            />
          </div>
          <div class="text-end mb-3">
            <button
              type="button"
              @click="modal.hide()"
              class="btn btn-outline-secondary"
            >
              Close
            </button>
            <button type="button" @click="saveBook()" class="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import { Modal } from "bootstrap";
import { useBookStore } from "@/stores/bookStore.js";
import { ref, computed, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";

const bookStore = useBookStore();

let modal = ref(null);
const BooksModal = ref();
const modalTitle = ref("Add Book");
const modalButton = ref("Save");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const bookData = reactive({
  title: "",
  author: "",
  description: "",
  pageNumber: null,
  editBookById: null,
});

bookStore.fetchBooksByUploader();

const userBooks = computed(() => {
  return bookStore.userUploadedBooks
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const totalPages = computed(() => {
  return Math.ceil(userBooks.value.length / itemsPerPage.value);
});

const paginationBooks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return userBooks.value.slice(startIndex, endIndex);
});

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

const addBook = async () => {
  try {
    await bookStore.addNewBook(bookData);

    currentPage.value = 1;
    modal.hide();

    // `bookData`yı doğrudan atamayın, bunun yerine özelliklerini güncelleyin
    bookData.title = "";
    bookData.author = "";
    bookData.description = "";
    bookData.pageNumber = null;
    bookData.editBookById = null;

    await bookStore.fetchBooksByUploader();

    showToast("New Book Successfully Recorded.", {
      type: "success",
      timeout: 1500,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (bookId, bookTitle) => {
  try {
    await bookStore.deleteTheBook(bookId);

    await bookStore.fetchBooksByUploader();

    showToast(`${bookTitle} deleted succesfully!`, {
      type: "warning",
      timeout: 1500,
    });
  } catch (error) {
    console.error(error);
  }
};

const addOpenModal = () => {
  modalTitle.value = "Add Book";
  modalButton.value = "Save";

  // `bookData`yı doğrudan atamayın, bunun yerine özelliklerini güncelleyin
  bookData.title = "";
  bookData.author = "";
  bookData.description = "";
  bookData.pageNumber = null;
  bookData.editBookById = null;

  modal.show();
};

const editOpenModal = (updateBook) => {
  modalTitle.value = "Edit Book";
  modalButton.value = "Edit";

  // `bookData`yı doğrudan atamayın, bunun yerine özelliklerini güncelleyin
  bookData.title = updateBook.title;
  bookData.author = updateBook.author;
  bookData.description = updateBook.description;
  bookData.pageNumber = updateBook.pageNumber;
  bookData.editBookById = updateBook._id;

  modal.show();
};

const editBook = async () => {
  try {
    await bookStore.editTheBook(bookData.editBookById, bookData);

    await bookStore.fetchBooksByUploader();

    modal.hide();

    showToast(`The Book Edited Succesfully!`, {
      type: "success",
      timeout: 1500,
    });
  } catch (error) {
    console.error(error);
  }
};

const saveBook = () => {
  if (modalTitle.value === "Add Book") {
    addBook();
  } else if (modalTitle.value === "Edit Book") {
    editBook();
  }
};

onMounted(() => {
  modal = new Modal(BooksModal.value);
});
</script>

<style scoped>
.btn-outline-secondary {
  border-radius: 25px;
  height: 48px;
  margin-right: 20px;
  min-width: 120px;
}

.list-enter-active,
.list-leave-active {
  transition: all 2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>
