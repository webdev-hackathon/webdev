const express = require('express');
const api = express.Router();

const adminController = require('../controllers/admin');
const apiController = require('../controllers/api');
api.get('/exam/:eid',apiController.apiReadExam);
api.post('/create',apiController.apiCreateExam);
module.exports = api;