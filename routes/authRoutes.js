const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const { register, login, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: errors.array()[0].msg 
        });
    }
    next();
};

router.put('/profile', 
    protect, 
    [
        body('username').optional().isLength({ min: 3 }).withMessage('The name must be at least 3 characters long.'),
        body('email').optional().isEmail().withMessage('Please enter a valid email address.')
    ],
    validate, 
    updateProfile
);

router.post('/register', 
    [
        body('username').notEmpty().withMessage('The username is required.'),
        body('email').isEmail().withMessage('Please enter a valid email address.'),
        body('password').isLength({ min: 6 }).withMessage('The password must be at least 6 characters long.')
    ], 
    validate, 
    register
);

router.post('/login', 
    [
        body('email').isEmail().withMessage('Please enter a valid email address.'),
        body('password').notEmpty().withMessage('The password is required')
    ], 
    validate, 
    login
);

module.exports = router;