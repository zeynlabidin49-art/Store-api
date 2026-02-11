const {customApiError, createCustomError} = require("../errors/custom-error")

const errorHandler = (err, req, res, next) => {
    if (err instanceof customApiError) return res.status(err.statusCode).json({msg: err.message})
    // return res.status(500).json({msg: err.message})
    return res.status(500).json({stack: err.stack})
}

module.exports = errorHandler