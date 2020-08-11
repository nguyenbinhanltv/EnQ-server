const express = require('express');
const controller = require('../controllers/leaders.controller');

const router = express.Router();

router.get('/:leadersId', controller.getLeaders);

module.exports = router;