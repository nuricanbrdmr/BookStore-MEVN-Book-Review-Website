import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    actions: {
        async updateUserDetails(updateUserData) {
            try {
                const response = await axios.put('http://localhost:3000/api/v1/user/updateUser', updateUserData);
                return response.data;
            } catch (error) {
                console.error('Error at updateUser ', error);
                throw error.response.data;
            }
        }
    }
})