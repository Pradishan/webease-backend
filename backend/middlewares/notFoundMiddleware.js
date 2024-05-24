const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // Pass the error to the next middleware
    next(error);
}

export default notFound;