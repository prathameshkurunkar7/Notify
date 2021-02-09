class HttpError extends Error{
    constructor(message,errorCode){
        super(message);
        this.code = errorCode;
        this.isOperational = true;
    }
}

module.exports = HttpError;