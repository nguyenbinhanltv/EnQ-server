const express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

router.get('/:userId', controller.getUser);
router.post('/', controller.createUser);
router.patch('/:userId', controller.updateUser);

module.exports = router;