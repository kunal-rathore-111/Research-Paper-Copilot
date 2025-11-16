

function validateWithZod(schema, data) {
    return schema.safeParse(data);
}

function handleZod(res, result, next) {
    if (!result.success) {

        const error = result.error.issues[0].message;
        throw {
            type: "ValidationError",
            message: error,
            status: 400
        }
    }
    return next();
}

module.exports = { validateWithZod, handleZod }