<template>
  <!-- contact section -->

  <section class="contact_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="heading_container">
            <h2 class>Contact Us</h2>
          </div>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <input
                type="text"
                v-model.trim="formData.name"
                @focus="showNameWarningMessage = true"
                @blur="showNameWarningMessage = false"
                placeholder="* Name"
              />
              <span v-if="showNameWarningMessage" class="text-danger small">{{
                NameWarningMessage
              }}</span>
            </div>
            <div class="mb-3">
              <input
                type="email"
                v-model.trim="formData.email"
                placeholder="* Email"
              />
              <span
                v-if="showEmailWarningMessage && !isEmailValid"
                @focus="showEmailWarningMessage = true"
                @blur="showEmailWarningMessage = false"
                class="text-danger small"
                >{{ EmailWarningMessage }}</span
              >
            </div>
            <div class="mb-3">
              <input
                type="text"
                v-model.trim="formData.message"
                @focus="showMessageWarningMessage = true"
                @blur="showMessageWarningMessage = false"
                class="message-box"
                placeholder="* Message"
              />
              <span
                v-if="showMessageWarningMessage"
                class="text-danger small"
                >{{ MessageWarningMessage }}</span
              >
            </div>
            <div class="btn-box">
              <button type="submit">SEND</button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <div class="img-box">
            <img src="../assets/images/contact-img.png" alt />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end contact section -->
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const authStore = useAuthStore();

const showNameWarningMessage = ref(false);
const showEmailWarningMessage = ref(false);
const showMessageWarningMessage = ref(false);
const NameWarningMessage = ref("");
const EmailWarningMessage = ref("");
const MessageWarningMessage = ref("");

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

const isEmailValid = computed(() => {
  return /^\S+@\S+\.\S+$/.test(formData.email);
});

const submitForm = async () => {
  try {
    await authStore.sendMail(formData);

    showToast("Success Login.", {
      type: "success",
      timeout: 1500,
    });

    formData.name = "";
    formData.email = "";
    formData.message = "";
    showEmailWarningMessage.value = false;
    showNameWarningMessage.value = false;
    showMessageWarningMessage.value = false;
  } catch (data) {
    data.errors.forEach((error) => {
      if (error.field === "email") {
        showEmailWarningMessage.value = true;
        EmailWarningMessage.value = error.message;
      }

      if (error.field === "name") {
        showNameWarningMessage.value = true;
        NameWarningMessage.value = error.message;
      }

      if (error.field === "message") {
        showMessageWarningMessage.value = true;
        MessageWarningMessage.value = error.message;
      }
    });
  }
};
</script>

<style lang="css" scoped>
.contact_section {
  margin: 130px;
  h2 {
    margin-bottom: 45px;
  }

  form {
    padding-right: 35px;
  }

  input {
    width: 100%;
    border: 0;
    height: 50px;
    border-radius: 25px;
    padding-left: 25px;
    outline: none;
    color: #101010;
    background: #f1f1f1;

    &::placeholder {
      color: #131313;
    }

    .input-div {
      margin-bottom: 25px;
    }

    &.message-box {
      height: 120px;
      border-radius: 15px;
    }
  }

  .btn-box {
    display: flex;
    margin-top: 10px;
  }

  button {
    width: 100%;
    text-align: center;
    background-color: var(--secondary-color);
    padding: 10px;
    border: 1px solid var(--secondary-color);
    border-radius: 25px;
    color: white;
    font-weight: bold;
    margin-top: 15px;
    transition: all 0.3s ease;
    &:hover {
      background-color: white;
      color: var(--secondary-color);
    }
  }

  .img-box {
    img {
      width: 100%;
    }
  }
}
</style>
