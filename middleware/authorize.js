const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

        const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden

            const userRoles = decoded.UserInfo?.roles; // Extract roles from the decoded token
            if (!userRoles) return res.sendStatus(403); // No roles found, access denied

            // Check if user has at least one allowed role
            const hasPermission = allowedRoles.includes(userRoles);
            if (!hasPermission) return res.sendStatus(403); // Forbidden

            req.user = decoded.UserInfo; // Attach user info to the request for further use
            next(); // Grant access
        });
    };
};

module.exports = authorize;
