

const mongoose = require("mongoose");
const conversationsModel = require("./ConversationModel");

const paperArray = new mongoose.Schema({
    paperId: { type: String },
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    url: { type: String },

}, { _id: false });


const validation = new mongoose.Schema({
    isValid: { type: Boolean, required: true },
    score: { type: Number, required: true },
    feedback: { type: String },
    citations: [{ type: String, required: true }]
}, { _id: false });




const papers = new mongoose.Schema({
    queryId: { type: mongoose.Schema.Types.ObjectId, ref: conversationsModel, required: true },
    papers: [paperArray],
    validation: validation,
    summary: { type: String, required: true }
});

const PapersModel = mongoose.model("papersmodel", papers);


module.exports = PapersModel;