const express = require('express');
const controller = require('../controllers/testExamHistorys.controller');

const router = express.Router();

router.get('/:testExamHistoryId', controller.getTestExamHistory);
router.get('/', controller.getTestExamHistorys);
router.post('/', controller.addTestExamHistory);
router.delete('/:testExamHistoryId', controller.deleteTestExamHistory);
router.patch('/:testExamHistoryId', controller.updateTestExamHistory);


module.exports = router;