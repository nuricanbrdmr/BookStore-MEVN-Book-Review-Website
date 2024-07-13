<template>
  <div class="row">
    <div class="col-lg-6">
      <h2 class="mb-4">User Information</h2>
      <div>
        {{ editMode }}
      </div>
      <form @submit.prevent="saveUserInfo">
        <div class="mb-3">
          <label for="username">Username</label>
          <input
            v-model="userInfo.username"
            :disabled="!editMode"
            :class="{
              'is-valid': isUsernameValid,
              'is-invalid':
                !isUsernameValid && showUsernameWarningMessage && editMode,
            }"
            @focus="showUsernameWarningMessage = true"
            @blur="showUsernameWarningMessage = false"
            type="text"
            id="username"
            class="form-control"
          />
          <span
            v-if="showUsernameWarningMessage && !isUsernameValid"
            class="text-danger small"
            >* Username must be between 5 and 20 characters!</span
          >
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            v-model="userInfo.email"
            :disabled="!editMode"
            :class="{
              'is-valid': isEmailValid,
              'is-invalid':
                (!isEmailValid && showEmailWarningMessage) ||
                (existingEmail === userInfo.email && editMode),
            }"
            @focus="showEmailWarningMessage = true"
            @blur="showEmailWarningMessage = false"
            type="email"
            id="email"
            class="form-control"
          />
          <span
            v-if="showEmailWarningMessage && !isEmailValid"
            class="text-danger small"
            >* Please provide a valid email!</span
          >
          <span
            v-if="existingEmail === userInfo.email"
            class="text-danger small"
            >* {{ existingEmail }} is already exist!</span
          >
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input
            v-model="userInfo.password"
            :disabled="!editMode"
            :class="{
              'is-valid': isPasswordValid,
              'is-invalid':
                !isPasswordValid && !showPasswordWarningMessage && editMode,
            }"
            @focus="showPasswordWarningMessage = true"
            @blur="showPasswordWarningMessage = false"
            placeholder="New Password"
            type="password"
            id="password"
            class="form-control"
          />
          <span
            v-if="showPasswordWarningMessage && !isPasswordValid"
            class="text-danger small"
            >* Password must be between 4 and 16 characters!</span
          >
        </div>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="editMode ? !isFormValid : false"
          @click="!editMode ? toggleEditMode() : saveUserInfo()"
        >
          {{ editMode ? "Save" : "Edit" }}
        </button>
        <button
          v-if="editMode"
          @click="cancelEditMode"
          type="button"
          class="btn btn-primary btn-cancel mx-2"
        >
          Cancel
        </button>
        <div>
          <span v-if="!isFormValid && editMode" class="text-danger small"
            >* Please complete all of the required fields!</span
          >
        </div>
      </form>
    </div>
    <div class="col-lg-6"></div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { useUserStore } from "@/stores/userStore.js";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const userStore = useUserStore();

const userInfo = reactive({
  username: "",
  email: "",
  password: "",
});

const editMode = ref(false);
const showUsernameWarningMessage = ref(false);
const showEmailWarningMessage = ref(false);
const showPasswordWarningMessage = ref(false);
const existingEmail = ref(null);

userInfo.username = authStore.user.username;
userInfo.email = authStore.user.email;

const isFormValid = computed(() => {
  return isUsernameValid && isEmailValid && isPasswordValid;
});

const isUsernameValid = computed(() => {
  return (
    userInfo.username.length >= 5 &&
    userInfo.username.length <= 20 &&
    editMode.value
  );
});

const isEmailValid = computed(() => {
  return /^\S+@\S+\.\S+$/.test(userInfo.email) && editMode.value;
});

const isPasswordValid = computed(() => {
  return (
    userInfo.password.length >= 4 &&
    userInfo.password.length <= 16 &&
    editMode.value
  );
});

const toggleEditMode = () => {
  editMode.value = !editMode.value;
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

const saveUserInfo = async () => {
  try {
    await userStore.updateUserDetails(userInfo);

    showToast("User Details Update Success.", {
      type: "success",
      timeout: 1500,
    });

    setTimeout(() => {
      authStore.logout();
    }, 2000);
  } catch (error) {
    const { message } = error;
    if (message === "The email is already exist!") {
      existingEmail.value = userInfo.email;
    }
  }
};

const cancelEditMode = () => {
  editMode.value = false;
  userInfo.username = authStore.user.username;
  userInfo.email = authStore.user.email;
  userInfo.password = "";
};
</script>

<style scoped>
.btn-cancel {
  background-color: red !important;
  border-color: red !important;
  color: white;
}
.btn-cancel:hover {
  background-color: white !important;
  color: red !important;
}
</style>
