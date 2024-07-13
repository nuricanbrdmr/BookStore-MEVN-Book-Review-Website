import axios from "axios";
import { defineStore } from "pinia";
import { useRateStore } from "./ratingStore";

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        books: [],
        isLoading: false,
        userUploadedBooks: []
    }),
    getters: {
        selectedBook: (state) => {
            return (id) => state.books.find((book) => book._id === id);
        },
        latestFourBooks: (state) => {
            return state.books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4);
        },
        bestFourBooks: (state) => {
            const sortedBooks = state.books
                .sort((a, b) => {
                    const averageRatingA = a.ratings.reduce((sum, rating) => sum + rating.rate, 0) / (a.ratings.length || 1);
                    const averageRatingB = b.ratings.reduce((sum, rating) => sum + rating.rate, 0) / (b.ratings.length || 1);
                    return averageRatingB - averageRatingA;
                });

            return sortedBooks.slice(0, 4);
        }
    },
    actions: {
        async fetchBooks() {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:3000/api/v1/books');
                this.books = response.data;
                await this.fetchRatingsForBooks();
            } catch (error) {
                console.error('Error at fetching books ', error)
            } finally {
                this.isLoading = false;
            }
        },

        async fetchRatingsForBooks() {
            const ratingsStore = useRateStore();
            await Promise.all(
                this.books.map(
                    async (book) => {
                        try {
                            await ratingsStore.fetchRateForBook(book._id);
                            book.ratings = ratingsStore.ratingsForBook;
                        } catch (error) {
                            console.error('Error at fetchRatingsForBooks', error);
                        }
                    }
                )
            )
        },

        async fetchBooksByUploader() {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/v1/books/uploader'
                );

                this.userUploadedBooks = response.data;
            } catch (error) {
                console.error('Error at user uploaded books', error);
            }
        },

        async addNewBook(newBook) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/books', newBook);
                this.books.push(response.data.book)
            } catch (error) {
                console.error('Error at fetching books ', error)
                throw error.response.data;
            }
        },

        async deleteTheBook(bookId) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
                this.books = this.books.filter(book => book._id !== bookId);
            } catch (error) {
                console.error('Error at deleteTheBook ', error)
                throw error.response.data;
            }
        },

        async editTheBook(bookId, bookData) {
            try {
                const response = await axios.put(`http://localhost:3000/api/v1/books/${bookId}`,
                    bookData
                );

                const updatedBookData = response.data.book;

                const bookIndex = this.books.findIndex(book => book._id === bookId);
                this.books.splice(bookIndex, 1, updatedBookData);


            } catch (error) {
                console.error('Error at editTheBook ', error)
                throw error.response.data;
            }
        }
    }
})