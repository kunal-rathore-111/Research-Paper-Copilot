// db functions
const conversationsModel = require("../services/conversationService");
const papersModel = require("../services/paperService");

// agentCoordinator
const agentCoordinator = require("../agents/coordinatorAgent");


const query = async (req, res) => {

    const userId = req.userId;
    const query = req.body.query;

    const agentAnswer = await agentCoordinator.runPipeline(query);

    const { answer, papers, summary, validation } = agentAnswer;

    //store in conversation
    console.log("0");
    const respondFromStoringinConversationModel = await conversationsModel.storeQueryAndAnswer(userId, query, answer);

    console.log("3");
    const queryId = respondFromStoringinConversationModel._id;

    // storing papers and validation
    await papersModel.storeInPaperModel(queryId, papers, summary, validation);


    return res.json({
        message: answer,
        urlToExport: `${process.env.BACKEND_BASE_Url}/export/${queryId}`
    });
}


const fetch = async (req, res) => {
    const result = await conversationsModel.getQueries(req.userId);
    if (result.length == 0) {
        throw {
            type: 'Not found',
            status: 404,
            message: "No previous queries found"
        }
    }
    res.json({ result });
}



module.exports = { query, fetch }