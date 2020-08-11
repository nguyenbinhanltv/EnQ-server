const express = require('express');
const controller = require('../controllers/testExams.controller');

const router = express.Router();

router.get('/:testExamId', controller.getTestExam);
router.post('/', controller.addTestExam);
router.patch('/:testExamId', controller.updateTestExam);
router.delete('/:testExamId', controller.deleteTestExam);

module.exports = router;