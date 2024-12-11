const express = require('express');
const { body } = require ('express-validator')
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', [
    body('username').isString().notEmpty(),
    body('password').isLength({ min: 6}),
], register);

router.post('/login',  [
    body('username').isString().notEmpty(),
    body('password').isLength({ min: 6}),
], login); 

module.exports = router;