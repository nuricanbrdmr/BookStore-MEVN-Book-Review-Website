import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BooksView from "@/views/BooksView.vue";
import BooksDetailView from "@/views/BooksDetailView.vue";
import ContactView from "@/views/ContactView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/books',
            name: 'books',
            component: BooksView,
        },
        {
            path: '/books/:id',
            name: 'booksDetail',
            component: BooksDetailView,
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
    ],
    linkActiveClass: 'active-link',
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(url => url.meta.requiresAuth);
    const isLoggedIn = localStorage.getItem('user');

    if (requiresAuth && !isLoggedIn) {
        next({ name: 'login' });
    } else {
        next();
    }
})

export default router;