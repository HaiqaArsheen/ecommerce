const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return res.status(400).json({ message: 'You are already logged in', type: 'warning' });
        } catch (err) {
            return res.status(400).json({ message: 'Invalid token.', type: 'danger' });
        }
    }
    next();
};

module.exports = checkLogin;
