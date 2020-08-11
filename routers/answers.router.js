const express = require('express');
const controller = require('../controllers/answers.controller');

const router = express.Router();

router.get('/:answerId', controller.getAnswer);
router.post('/', controller.addAnswer);
router.patch('/:answerId', controller.updateAnswer);
router.delete('/:answerId', controller.deleteAnswer);

module.exports = router;