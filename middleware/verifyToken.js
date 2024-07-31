const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send('You are not logged in');
    }

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET); // Use your secret key here
        req.email = decoded.email; // Assuming the token contains the email
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};

module.exports = verifyToken;
