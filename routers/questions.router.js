const express = require('express');
const controller = require('../controllers/questions.controller');

const router = express.Router();

router.get('/:questionId', controller.getQuestion);
router.patch('/:questionId', controller.updateQuestion);
router.post('/', controller.addQuestion);
router.delete('/questionId', controller.deleteQuestion);

module.exports = router;