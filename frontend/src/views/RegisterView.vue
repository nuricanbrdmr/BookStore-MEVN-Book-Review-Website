<template>
  <section class="full-section-height">
    <div class="container">
      <form @submit.prevent="submitForm">
        <div>
          <h1 class="display-3 text-center">Register</h1>
          <span
            v-if="showGenericWarningMessage"
            class="text-danger text-center small"
            >Something happened, please try again later!</span
          >
        </div>
        <div class="row mt-5 justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label"
              >Username <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              :class="{
                'is-valid': isUsernameValid,
                'is-invalid': !isUsernameValid && showUsernameWarningMessage,
              }"
              @focus="showUsernameWarningMessage = true"
              @blur="showUsernameWarningMessage = false"
              id="username"
              name="username"
              v-model.trim="formData.username"
              required
            />
            <span
              v-if="showUsernameWarningMessage && !isUsernameValid"
              class="text-danger small"
              >* Username must be between 5 and 20 characters!
            </span>
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label"
              >Email <span class="text-danger">*</span></label
            >
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
            <span
              v-if="existingEmail === formData.email"
              class="text-danger small"
              >* {{ existingEmail }} is already exist!</span
            >
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label"
              >Password <span class="text-danger">*</span>
            </label>
            <input
              type="password"
              class="form-control"
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid': !isPasswordValid && showEmailWarningMessage,
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

        <!-- Gender Field -->
        <!-- <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <h5>Gender</h5>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" v-model.trim="formData.gender" value='male' id="male">
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" v-model.trim="formData.gender" value='female' id="female">
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
            </div>
          </div> -->

        <!-- Age Field -->
        <!-- <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <label for="age" class="form-label">Age:</label>
              <input type="number" class="form-control" v-model="formData.age" id="age" required>
            </div>
          </div> -->

        <!-- Programming Field -->
        <!-- <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <h5>Which Programming Language(s) you know?</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="java" id="java" v-model="formData.languages">
                <label class="form-check-label" for="java">
                  Java
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="c++" id="c++" v-model="formData.languages">
                <label class="form-check-label" for="c++">
                  C++
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="python" id="python" v-model="formData.languages">
                <label class="form-check-label" for="python">
                  Python
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="rust" id="rust" v-model="formData.languages">
                <label class="form-check-label" for="rust">
                  Rust
                </label>
              </div>
            </div>
          </div> -->

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button
              :disabled="!isFormValid"
              type="submit"
              class="btn btn-primary w-100"
            >
              Register
            </button>
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
  username: "",
  email: "",
  password: "",
  gender: "",
  age: null,
});

const showUsernameWarningMessage = ref(false);
const showEmailWarningMessage = ref(false);
const showPasswordWarningMessage = ref(false);
const existingEmail = ref(null);
const showGenericWarningMessage = ref(false);

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
    await authStore.register(formData);

    showToast("You will be redirected to the Login Page.", {
      type: "success",
      timeout: 1500,
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (data) {
    const { message } = data;
    if (message === "The email is already exist!") {
      existingEmail.value = formData.email;
    } else {
      showGenericWarningMessage.value = true;
      formData.username = "";
      formData.email = "";
      formData.password = "";
      formData.gender = "";
      formData.age = "";
    }
  }
};

const isFormValid = computed(() => {
  return isUsernameValid && isEmailValid && isPasswordValid;
});

const isUsernameValid = computed(() => {
  return formData.username.length >= 5 && formData.username.length <= 20;
});

const isEmailValid = computed(() => {
  return /^\S+@\S+\.\S+$/.test(formData.email);
});

const isPasswordValid = computed(() => {
  return formData.password.length >= 4 && formData.password.length <= 16;
});
</script>

<style scoped></style>
