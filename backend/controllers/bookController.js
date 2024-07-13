import Book from './../models/Book.js';
import { isValidObjectId, findDocumentById } from '../utils/index.js';

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: "Error at getAllBooks" });
    }
};

const getABook = async (req, res) => {
    const { id } = req.params;

    if (isValidObjectId(id, res)) return;

    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;
        res.status(200).json({ book })
    } catch (error) {
        return res.status(500).json({ error: "Error at getABook" });
    }

}

const getBooksByUploader = async (req, res) => {
    try {
        const uploaderId = req.user._id;

        const books = await Book.find({ uploader: uploaderId });
        res.status(200).json(books);
    } catch (error) {
        console.error('Error at getBooksByUploader', error);
        return res.status(500).json({ error: 'Internal Server error' });
    }
};

const createABook = async (req, res) => {
    try {
        const { title, author, description, pageNumber } = req.body;

        const uploader = req.user._id;

        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ message: "A Book with same title and author already exist!" });
        }

        const newBook = await Book.create({
            title,
            author,
            description,
            pageNumber,
            uploader
        });
        return res.status(201).json({ message: "Success", book: newBook })
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = {}

            for (let field in error.errors) {
                validationError[field] = error.errors[field].message;
            }

            return res.status(500).json({ error: "Validation error", validationError });
        }
    }
}

const updateABook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, pageNumber } = req.body;

    if (isValidObjectId(id, res)) return;

    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;

        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.pageNumber = pageNumber || book.pageNumber;

        await book.save();

        res.status(200).json({ message: "The Book updated succesfully", book })
    } catch (error) {
        return res.status(500).json({ error: "Error at updateABook" });
    }

}

const deleteABook = async (req, res) => {
    const { id } = req.params;

    if (isValidObjectId(id, res)) return;

    try {
        const book = await findDocumentById(Book, id, res);
        if (!book) return;

        await book.deleteOne();

        res.status(200).json({ message: "The Book deleted succesfully" })
    } catch (error) {
        return res.status(500).json({ error: "Error at deleteABook" });
    }

}

export { getAllBooks, createABook, getABook, updateABook, deleteABook, getBooksByUploader }