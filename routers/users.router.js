const express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

router.get('/:userId', controller.getUser);
router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.patch('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

module.exports = router;