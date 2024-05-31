const errorMiddleware = (err, req, res, next) => {
    // If the status code is 200, set it to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Set the status code to the error status code
    res.status(statusCode);
    // Return the error message
        res.send({
            error: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
}
 
export default errorMiddleware;