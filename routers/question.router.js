const express = require('express');
const controller = require('../controllers/question.controller');

const router = express.Router();

router.get('/:questionId', controller.getQuestion);
router.post('/', controller.addQuestion);

module.exports = router;