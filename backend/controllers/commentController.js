import Comment from "../models/Comment.js";
import { isValidObjectId, findDocumentById } from '../utils/index.js';


const createAComment = async (req, res) => {
    try {
        const { bookId, content, userId } = req.body;

        const newComment = await Comment.create({
            content: content,
            book: bookId,
            postedBy: userId,
        });

        return res.status(200).json({ message: "Commnet created succesfully", commnet: newComment })

    } catch (error) {
        console.error('Error at createAComment: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteTheComment = async (req, res) => {
    const { id } = req.params;

    if (isValidObjectId(id, res)) return;

    try {
        const comment = await findDocumentById(Comment, id, res);
        if (!comment) return;

        await comment.deleteOne();

        res.status(200).json({ message: "The Comment deleted succesfully" })
    } catch (error) {
        return res.status(500).json({ error: "Error at deleteTheComment" });
    }

}

const updateTheComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (isValidObjectId(id, res)) return;

    try {
        const comment = await findDocumentById(Comment, id, res);
        if (!comment) return;

        comment.content = content || comment.content;

        await comment.save();

        res.status(200).json({ message: "The Comment updated succesfully", comment })
    } catch (error) {
        return res.status(500).json({ error: "Error at updateTheComment" });
    }

}

const getCommentsForBook = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.find({ book: id }).populate('postedBy');

        return res.status(200).json({ message: "Commnet for book fetched.", comments })
    } catch (error) {
        console.error('Error at getCommentsForBook: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCommentsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.find({ postedBy: id }).populate('book');

        return res.status(200).json({ message: "Commnet for book fetched.", comments })
    } catch (error) {
        console.error('Error at getCommentsForBook: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate({
            path: 'postedBy',
            select: 'username'
        });
        res.status(200).json({ message: "Comments fetched.", comments });
    } catch (error) {
        return res.status(500).json({ error: "Error at getAllComments" });
    }
};

const upvoteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        comment.upvotes.push(userId);

        await comment.save();

        res.status(201).json({ message: "Upvote Successfully.", comment });

    } catch (error) {
        return res.status(500).json({ error: "Error at upvoteComment" });
    }
};

const downvoteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        comment.upvotes.pop(userId);

        await comment.save();

        res.status(201).json({ message: "Downvote Successfully.", comment });

    } catch (error) {
        return res.status(500).json({ error: "Error at upvoteComment" });
    }
};

export {
    createAComment,
    getCommentsForBook,
    getCommentsByUser,
    deleteTheComment,
    updateTheComment,
    getAllComments,
    upvoteComment,
    downvoteComment
}