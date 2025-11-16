

// utils
const { validateWithZod, handleZod } = require("../utils/validator");

// zodSchema 
const querySchema = require("../validators/chatValidation");

function zodQuery(req, res, next) {
    if (!req.body) throw { type: "Not Found", status: 404, message: "Query is empty" }
    const result = validateWithZod(querySchema, req.body);
    return handleZod(res, result, next);
}

module.exports = { zodQuery }