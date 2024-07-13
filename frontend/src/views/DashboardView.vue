<template>
  <section
    class="container"
    style="min-height: calc(100vh - 130px); overflow: hidden"
  >
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation" @click="activeTab = 'general'">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'general' }"
          id="general-tab"
          data-bs-toggle="tab"
          data-bs-target="#general"
          type="button"
          role="tab"
          aria-controls="general"
          aria-selected="true"
        >
          General
        </button>
      </li>
      <li class="nav-item" role="presentation" @click="activeTab = 'books'">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'books' }"
          id="books-tab"
          data-bs-toggle="tab"
          data-bs-target="#books"
          type="button"
          role="tab"
          aria-controls="books"
          aria-selected="false"
        >
          Books
        </button>
      </li>
      <li class="nav-item" role="presentation" @click="activeTab = 'comments'">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'comments' }"
          id="comments-tab"
          data-bs-toggle="tab"
          data-bs-target="#comments"
          type="button"
          role="tab"
          aria-controls="comments"
          aria-selected="false"
        >
          Comments
        </button>
      </li>
    </ul>
    <div class="tab-content py-3" id="myTabContent">
      <div
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'general' }"
        id="general"
        role="tabpanel"
        aria-labelledby="general-tab"
      >
        <DashboardGeneral />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'books' }"
        id="books"
        role="tabpanel"
        aria-labelledby="books-tab"
      >
        <DashboardBooks />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'show active': activeTab === 'comments' }"
        id="comments"
        role="tabpanel"
        aria-labelledby="comments-tab"
      >
        <DashboardComments />
      </div>
    </div>
  </section>
</template>

<script setup>
import DashboardGeneral from "@/components/dashboard/DashboardGeneral.vue";
import DashboardBooks from "@/components/dashboard/DashboardBooks.vue";
import DashboardComments from "@/components/dashboard/DashboardComments.vue";
import { ref } from "vue";

const activeTab = ref("general");
</script>

<style scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
}

.nav-tabs {
  border-color: var(--secondary-color);
}

.nav-link.active {
  color: var(--primary-color);
  background-color: var(--secondary-color);
}
</style>
