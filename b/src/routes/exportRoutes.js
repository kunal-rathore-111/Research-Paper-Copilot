//libraries
const express = require('express');

// middlewares
const { tokenValidation } = require('../middlewares/authMiddleware');
const { checkConverstationExists } = require('../middlewares/exportMiddleware');

// controllers
const exportController = require('../controllers/exportController');
const asyncWrapper = require('../utils/catchAsync');

const chat = express.Router();

chat.post('/:queryId', tokenValidation, checkConverstationExists, asyncWrapper(exportController.exp));

module.exports = chat;
