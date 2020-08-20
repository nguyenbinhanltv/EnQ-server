const express = require('express');
const controller = require('../controllers/leaders.controller');

const router = express.Router();

router.get('/:leadersId', controller.getLeaders);
router.get('/', controller.getAllLeaders);
router.post('/', controller.addLeaders);
router.patch('/:leadersId', controller.updateLeaders);
router.delete('/:leadersId', controller.deleleLeaders);

module.exports = router;