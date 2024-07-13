import mongoose from "mongoose";


const isValidObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Object Id is not valid" });
    }
}

const findDocumentById = async (model, id, res) => {
    try {
        const document = await model.findById(id);
        if (!document) {
            return res.status(400).json({ error: `The ${model.modelName} is not exist!` })
        }
        return document;
    } catch (error) {
        return res.status(500).json({ error: `Error at ${model.modelName}` });
    }
}

export {
    isValidObjectId,
    findDocumentById
}