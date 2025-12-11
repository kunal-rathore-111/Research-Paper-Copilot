
const { z } = require("zod");


const querySchema = z.object({
    query: z.string('Query is empty')
        .min(5, "Query must have atleast 5 characters")
        .max(200, "Query is too large")
});

module.exports = querySchema