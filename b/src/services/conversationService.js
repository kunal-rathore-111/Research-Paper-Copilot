const mongoose = require('mongoose');

// model
const conversationsModel = require("../models/ConversationModel");

// storeQuery

async function storeQueryAndAnswer(userId, query, answer) {
    console.log("1");
    const result = await conversationsModel.create({
        userId: new mongoose.Types.ObjectId(userId),
        query: query,
        answer: answer,
    });
    console.log("2");
    return result;
}

// fetchQuery history
async function getQueries(userId) {
    return await conversationsModel.find({
        userId: userId
    });

}

// checkQueryExists

async function findConversation(userId, queryId) {


    if (!mongoose.Types.ObjectId.isValid(queryId)) {
        throw {
            type: "Invalid",
            status: 400,
            message: "Invalid query"
        }
    }

    const result = await conversationsModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(queryId),
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'papersmodels',
                localField: '_id',
                foreignField: 'queryId',
                as: 'papers'
            }
        }
    ]);
    if (!result.length) {
        throw {
            type: 'Not found',
            status: 404,
            message: "Conversation not found"
        }
    }
    return result[0];
}



module.exports = { storeQueryAndAnswer, getQueries, findConversation }