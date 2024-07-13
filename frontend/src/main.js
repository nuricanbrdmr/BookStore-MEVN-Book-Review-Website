import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/styles.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faThumbsUp, faArrowLeft, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farfaThumbsUp, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import { createPinia } from "pinia";
import { useBookStore } from './stores/bookStore.js';
import { useCommentStore } from './stores/commentStore';
import { useAuthStore } from './stores/authStore.js';
import Toast, { useToast } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import axios from 'axios';

library.add(faArrowLeft, faThumbsUp, faTrash, faPenToSquare, farfaThumbsUp, faFacebook,
    faTwitter, faInstagram, faLinkedin, faSearch
);

const toast = useToast();

const pinia = createPinia();

const authStore = useAuthStore(pinia);
const commentStore = useCommentStore(pinia);
const bookStore = useBookStore(pinia);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            //Display Toast Message
            toast.error("Your token has expired, forward login page!", {
                position: "top-right",
                timeout: 3000,
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
            });
            setTimeout(() => {
                authStore.logout();
                router.push('/login');
            }, 3000);
        }
        // Hata durumunda yanıtı geri döndür
        return Promise.reject(error);
    }
);

const storedUser = localStorage.getItem('user');
if (storedUser) {
    const userData = JSON.parse(storedUser);
    useAuthStore(pinia).user = userData.user;

    const token = userData.token;
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
}

const init = async () => {
    try {
        await Promise.all([bookStore.fetchBooks(), commentStore.fetchComments()]);
        createApp(App)
            .use(pinia)
            .use(router)
            .component('font-awesome-icon', FontAwesomeIcon)
            .use(Toast)
            .mount('#app')
    } catch (error) {
        console.error(error);
    }
}

init();
