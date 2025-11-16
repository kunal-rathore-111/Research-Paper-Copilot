// files
const generateHtml = require('../agents/htmlAgent');
const generatePdf = require("../utils/pdfGenerator");


const exp = async (req, res) => {

  const conversation = req.result; // have the full conversation

  // logic for creating pdf for the req.converstation and send the pdf link and store in db in the conversation model


  const html = await generateHtml(conversation);
  const pdfBuffer = await generatePdf(html);
  res.header("Content-type", 'application/pdf');
  res.header('Content-Disposition', 'attachment; filename=conversation.pdf');
  res.send(pdfBuffer);

};

module.exports = { exp };
