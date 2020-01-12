const errorHandler = (res, error) => {
    res.status(400);
    return res.json(error);
}

module.exports = errorHandler;