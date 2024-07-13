<template>
  <header class="header_section">
    <div class="container">
      <nav class="navbar navbar-expand-lg custom_nav-container">
        <RouterLink class="navbar-brand" v-bind:to="{ name: 'home' }">
          <span>BookStore</span>
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <RouterLink class="nav-link pl-lg-0" v-bind:to="{ name: 'home' }"
                >Home</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" v-bind:to="{ name: 'books' }"
                >Books</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" v-bind:to="{ name: 'contact' }"
                >Contact Us</RouterLink
              >
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <RouterLink class="nav-link" v-bind:to="{ name: 'dashboard' }"
                >Dashboard</RouterLink
              >
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <button class="nav-link" @click="logoutUser">Logout</button>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <RouterLink class="nav-link" v-bind:to="{ name: 'login' }"
                >Login</RouterLink
              >
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <RouterLink class="nav-link" v-bind:to="{ name: 'register' }"
                >Register</RouterLink
              >
            </li>
          </ul>
          <form class="search_form">
            <input
              type="text"
              class="form-control"
              placeholder="Search here..."
            />
            <button class="" type="submit">
              <font-awesome-icon :icon="['fas', 'search']" aria-hidden="true" />
            </button>
          </form>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);

const logoutUser = () => {
  authStore.logout();
};
</script>

<style scoped>
.header_section {
  background-color: #063547;
  padding: 10px 0;
}

.custom_nav-container {
  background-color: #013b52;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px 40px;
  width: 100%;
  border-radius: 35px;
}

.search_form {
  display: flex;
  margin: 0;
  position: relative;
}

.search_form .form-control {
  border-radius: 45px;
  height: 40px;
  min-width: unset;
  border: none;
}

.search_form button {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 35px;
  height: 35px;
  padding: 0;
  border: none;
  outline: none;
  color: #ffffff;
  background-color: var(--secondary-color);
  border-radius: 100%;
}

.navbar-brand {
  padding: 0;
  margin: 0;
  color: #000000;
  font-size: 24px;
  font-weight: bold;
}

.navbar-brand span {
  color: #ffffff;
}

.custom_nav-container span:hover {
  color: #44b89d;
}

.custom_nav-container .navbar-nav {
  margin-left: auto;
}

.custom_nav-container .navbar-nav .nav-item a:hover {
  color: #44b89d;
}

.active-link {
  color: #44b89d !important;
}

.custom_nav-container .navbar-nav .nav-item .nav-link {
  padding: 10px 25px;
  color: #ffffff;
  text-align: center;
}

.custom_nav-container .navbar-toggler {
  outline: none;
}

.custom_nav-container .navbar-toggler {
  padding: 0;
  width: 37px;
  height: 42px;
  transition: all 0.3s;
}

.custom_nav-container .navbar-toggler span {
  display: block;
  width: 35px;
  height: 4px;
  background-color: #ffffff;
  margin: 7px 0;
  transition: all 0.3s;
  position: relative;
  border-radius: 5px;
  transition: all 0.3s;
}

.custom_nav-container .navbar-toggler span::before,
.custom_nav-container .navbar-toggler span::after {
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  top: -10px;
  border-radius: 5px;
  transition: all 0.3s;
}

.custom_nav-container .navbar-toggler span::after {
  top: 10px;
}

.custom_nav-container .navbar-toggler[aria-expanded="true"] {
  transform: rotate(360deg);
}

.custom_nav-container .navbar-toggler[aria-expanded="true"] span {
  transform: rotate(45deg);
}

.custom_nav-container .navbar-toggler[aria-expanded="true"] span::before,
.custom_nav-container .navbar-toggler[aria-expanded="true"] span::after {
  transform: rotate(90deg);
  top: 0;
}
</style>
