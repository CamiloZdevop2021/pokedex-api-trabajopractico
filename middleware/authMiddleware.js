const jwt = require('jsonwebtoken');
const Trainer = require('../models/Trainer');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Trainer.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error });
    }
};

module.exports = authMiddleware;
