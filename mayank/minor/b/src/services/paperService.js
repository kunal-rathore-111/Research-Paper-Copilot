
const PapersModel = require("../models/PaperModel");


async function storeInPaperModel(queryId, papers, summary, validation) {

    const respond = await PapersModel.create({
        queryId: queryId,
        papers: papers,
        validation: validation,
        summary: summary
    });

}


module.exports = { storeInPaperModel };