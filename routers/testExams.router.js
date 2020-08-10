const express = require('express');
const controller = require('../controllers/testExams.controller');

const router = express.Router();

router.get('/:testExamId', controller.getTestExam);

module.exports = router;