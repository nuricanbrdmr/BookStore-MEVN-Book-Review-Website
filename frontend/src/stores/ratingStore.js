import axios from "axios";
import { defineStore } from "pinia";
import { useBookStore } from "./bookStore.js";

export const useRateStore = defineStore('ratingStore', {
    state: () => ({
        ratings: [],
        ratingsForBook: [],
    }),

    actions: {
        async addNewRate(newRate) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/rating', newRate);
                this.ratings.push(response.data.rating);
            } catch (error) {
                console.error('Error at addNewRate ', error);
                throw error.response.data;
            }
        },

        async updateRate(userRating) {
            try {
                const response = await axios.put(`http://localhost:3000/api/v1/rating/${userRating.id}`,
                    userRating
                );

                const updatedRatingData = response.data.rating;

                const RatingIndex = this.ratingsForBook.findIndex(rating => rating._id === userRating._id);
                this.ratingsForBook.splice(RatingIndex, 1, updatedRatingData);


            } catch (error) {
                console.error('Error at updateRate ', error)
                throw error.response.data;
            }
        },


        async fetchRateForBook(bookId) {
            const bookStore = useBookStore();
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/rating/book/${bookId}`);

                this.ratingsForBook = response.data.ratings;

                const bookIndex = bookStore.books.findIndex(
                    (book) => book._id === bookId
                );

                if (bookIndex !== -1) {
                    bookStore.books[bookIndex].ratings = response.data.ratings;
                } else {
                    console.warn(`Book with id: ${bookId} not found.`)
                }

            } catch (error) {
                console.error('Error at fetchRateForBook ', error);
                throw error.response.data;
            }
        },

    }
})