import Rating from "../models/Rating.js";
import { isValidObjectId, findDocumentById } from '../utils/index.js';


const createARate = async (req, res) => {
    try {
        const { bookId, rate, userId } = req.body;

        const newRate = await Rating.create({
            rate: rate,
            book: bookId,
            ratedBy: userId
        });

        return res.status(200).json({ message: "Rating created succesfully", rating: newRate })

    } catch (error) {
        console.error('Error at createARate: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTheRating = async (req, res) => {
    const { id } = req.params;
    const { newRating } = req.body;

    if (isValidObjectId(id, res)) return;

    try {
        const rating = await findDocumentById(Rating, id, res);
        if (!rating) return;

        rating.rate = newRating || rating.rate;

        await rating.save();

        res.status(200).json({ message: "The Rating updated succesfully", rating })
    } catch (error) {
        console.error('Error at createARate: ', error);
        return res.status(500).json({ error: "Error at updateTheRating" });
    }

}

const getRatingForBook = async (req, res) => {
    try {
        const { id } = req.params;
        const ratings = await Rating.find({ book: id }).populate('ratedBy');

        return res.status(200).json({ message: "Ratings for book fetched.", ratings })
    } catch (error) {
        console.error('Error at getRatingForBook: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export { createARate, getRatingForBook, updateTheRating }