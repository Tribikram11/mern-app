const errorHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "internal server error";

    // invalid odjectid in mongoose
    if(err.name === "CastError"){
        statusCode = 400;
        message = "invalid ID format";

    }

    // duplicate key
    if(err.code === 11000){
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;

    }

    if(err.name === "ValidationError"){
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');

    }

    res.status(statusCode).json({
        success: false,
        message
    })
}

module.exports = errorHandler;
