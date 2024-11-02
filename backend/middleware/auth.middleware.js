import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // Get the token from the headers

    const token = req.header('Authorization')?.split(' ')[1];  // Expected format: 'Bearer token'

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'secret');

        // Attach the decoded userId and role to the request object
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        // console.log('post auth');


        next();  // Pass control to the next middleware or route handler
    } catch (err) {
        console.error('Invalid Token:', err);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
