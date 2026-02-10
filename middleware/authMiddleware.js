const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'No token, access denied' });

    try {
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found in the database.' });
        }

        next();
    } catch (err) {
        console.error('Error in authMiddleware:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { protect };