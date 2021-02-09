const HttpError = require('../utils/httpError');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        const error = new HttpError('Authentication failed,as no token was found',401);
        return next(error);
    }
    jwt.verify(token, appConfig.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            const error = new HttpError('Authentication failed!', 401);
            return next(error);
        } else {
            req.user = user;
            next();
        }
    })
}

module.exports = authenticate;
