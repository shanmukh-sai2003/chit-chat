const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('',);

router.post('', userController.createUser);

router.post('/login',);

router.delete('/logout',);

router.put('',);

module.exports = router;