import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        mailData: null,
    }),
    getters: {
        isLoggedIn: (state) => {
            return !!state.user;
        }
    },
    actions: {
        async register(newUserData) {
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/register', newUserData);
                return response.data;
            } catch (error) {
                console.error('Error at register ', error);
                throw error.response.data;
            } finally {
                this.isLoading = false;
            }
        },

        async login(UserData) {
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/login', UserData);
                const token = response.data.token;
                this.user = response.data.user;

                localStorage.setItem('user', JSON.stringify(response.data));
                axios.defaults.headers.common['Authorization'] = token;

            } catch (message) {
                console.error('Error at login ', message);
                throw message.response.data;
            } finally {
                this.isLoading = false;
            }
        },

        logout() {
            this.user = null;
            localStorage.removeItem('user');
            location.reload();
        },

        async sendMail(mailData) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/sendMail', mailData);
                return response.data;
            } catch (error) {
                console.error('Error at sendMail ', error);
                throw error.response.data;
            }
        }
    }
})