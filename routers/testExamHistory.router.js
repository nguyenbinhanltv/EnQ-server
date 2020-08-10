const express = require('express');
const controller = require('../controllers/testExamHistory.controller');

const router = express.Router();

router.get('/:testExamHistoryId', controller.addTestExamHistory);
router.post('/', controller.addTestExamHistory);


module.exports = router;