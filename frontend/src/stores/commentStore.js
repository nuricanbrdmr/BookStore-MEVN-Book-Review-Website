import axios from "axios";
import { defineStore } from "pinia";

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [],
        commentsForBook: [],
        CommentsByUser: [],
        allComments: [],
    }),

    actions: {
        async addNewComment(newComment) {
            try {
                await axios.post('http://localhost:3000/api/v1/comments', newComment);
                await this.fetchComments();
            } catch (error) {
                console.error('Error at addNewComment ', error);
                throw error.response.data;
            }
        },

        async deleteTheComment(commentId) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/comments/${commentId}`);
                this.CommentsByUser = this.CommentsByUser.filter(comment => comment._id !== commentId);
            } catch (error) {
                console.error('Error at deleteTheComment ', error)
                throw error.response.data;
            }
        },

        async editTheComment(commentId, content) {
            try {
                const response = await axios.put(`http://localhost:3000/api/v1/comments/${commentId}`,
                    content
                );

                const updatedCommentData = response.data.comment;

                const CommentIndex = this.CommentsByUser.findIndex(comment => comment._id === commentId);
                this.CommentsByUser.splice(CommentIndex, 1, updatedCommentData);


            } catch (error) {
                console.error('Error at editTheComment ', error)
                throw error.response.data;
            }
        },

        async upvoteComment(commentId) {
            try {
                const response = await axios.post(`http://localhost:3000/api/v1/comments/${commentId}/upvote`);

                const upvotedComment = response.data.comment;
                const commentIndex = this.comments.findIndex(
                    (comment) => comment._id === upvotedComment._id
                )

                if (commentIndex !== -1) {
                    this.comments[commentIndex] = upvotedComment;
                }

            } catch (error) {
                console.error('Error at upvoteComment ', error);
                throw error.response.data;
            }
        },

        async downvoteComment(commentId) {
            try {
                const response = await axios.post(`http://localhost:3000/api/v1/comments/${commentId}/downvote`);

                const upvotedComment = response.data.comment;
                const commentIndex = this.comments.findIndex(
                    (comment) => comment._id === upvotedComment._id
                )

                if (commentIndex !== -1) {
                    this.comments[commentIndex] = upvotedComment;
                }

            } catch (error) {
                console.error('Error at upvoteComment ', error);
                throw error.response.data;
            }
        },

        async fetchCommentsForBook(bookId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/comments/book/${bookId}`);

                this.commentsForBook = response.data.comments;

            } catch (error) {
                console.error('Error at fetchCommentsForBook ', error);
                throw error.response.data;
            }
        },

        async fetchCommentsByUser(userId) {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/comments/user/${userId}`);

                this.CommentsByUser = response.data.comments;

            } catch (error) {
                console.error('Error at fetchCommentsForBook ', error);
                throw error.response.data;
            }
        },

        async fetchComments() {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:3000/api/v1/comments');
                this.comments = response.data.comments;
            } catch (error) {
                console.error('Error at fetching comment ', error)
            } finally {
                this.isLoading = false;
            }
        },
    }
})