const express = require('express');
const download = require('../controllers/download');
const {authenticate} = require('../middlewares/auth')


const router = express.Router();

router.get('/' , authenticate, download );

module.exports = router ;