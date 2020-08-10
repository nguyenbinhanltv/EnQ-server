const express = require('express');
const controller = require('../controllers/answers.controller');

const router = express.Router();

router.get('/:answerId', controller.getAnswer);

module.exports = router;