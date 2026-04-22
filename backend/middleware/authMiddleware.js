const AppError = require('../utils/AppError');
const { verifyAccessToken } = require('../utils/tokenUtils')

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('no token provided', 401)
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next()
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            return next(new AppError('Token expired', 401))
        }
        if (error.name == 'JsonWebTokenError') {
            return next(new AppError('invalid token', 401))
        }
        return next(error)
    }

}

// role based access
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('you do not have permission to perform this action', 403)
            )
        }
        next();
    }
}


module.exports = { protect, authorize };