const express = require('express');
const controller = require('../controllers/testExamHistorys.controller');

const router = express.Router();

router.get('/:testExamHistoryId', controller.getTestExamHistory);
router.post('/', controller.addTestExamHistory);


module.exports = router;