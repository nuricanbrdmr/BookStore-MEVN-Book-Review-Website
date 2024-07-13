<template>
  <section class="full-section-height">
    <div class="container">
      <form @submit.prevent="submitForm">
        <div>
          <h1 class="display-3 text-center">Login</h1>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && showEmailWarningMessage) ||
                  existingEmail === formData.email,
              }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
              id="email"
              name="email"
              v-model.trim="formData.email"
              required
            />
            <span
              v-if="showEmailWarningMessage && !isEmailValid"
              class="text-danger small"
              >* Pleas provide a valid email!</span
            >
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid':
                  (!isPasswordValid && showPasswordWarningMessage) ||
                  existingPassword === formData.password,
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
              id="password"
              name="password"
              v-model.trim="formData.password"
              required
            />
            <span
              v-if="showPasswordWarningMessage && !isPasswordValid"
              class="text-danger small"
              >* Password must be between 4 and 16 characters!</span
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <span
            v-if="existingEmail === formData.email"
            class="text-danger text-center mb-3 small"
            >Email or Password is Incorrect!</span
          >
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Login</button>
            <span v-if="!isFormValid" class="text-danger small"
              >* Please complate all of the required fields!</span
            >
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const formData = reactive({
  email: "",
  password: "",
});

const showEmailWarningMessage = ref(false);
const showPasswordWarningMessage = ref(false);
const existingEmail = ref(null);
const existingPassword = ref(true);

const authStore = useAuthStore();
const router = useRouter();

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

const submitForm = async () => {
  try {
    await authStore.login(formData);

    showToast("Success Login.", {
      type: "success",
      timeout: 1500,
    });

    showEmailWarningMessage.value = true;
    showPasswordWarningMessage.value = true;
    existingEmail.value = "";
    existingPassword.value = "";

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  } catch (data) {
    const { message } = data;
    if (message === "Email or Password is Incorrect!") {
      existingEmail.value = formData.email;
      existingPassword.value = formData.password;
    }
  }
};

const isFormValid = computed(() => {
  return isEmailValid && isPasswordValid;
});

const isEmailValid = computed(() => {
  return /^\S+@\S+\.\S+$/.test(formData.email);
});

const isPasswordValid = computed(() => {
  return formData.password.length >= 4 && formData.password.length <= 16;
});
</script>

<style lang="css" scoped></style>
