import jwt from "jsonwebtoken";
import User from "../models/User.js";


const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing!" });
    }

    const token = authHeader;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decodedToken.userId);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired!" });
        } else {
            return res.status(500).json({ message: "authenticateUser is Failed!" });
        }
    }
};

export { authenticateUser };