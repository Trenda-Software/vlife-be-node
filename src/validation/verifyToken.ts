// Format Token
// Autorization: 1 <access_token>

const jwt = require('jsonwebtoken');

module.exports = function (req: any, res: any, next: any) {

    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}