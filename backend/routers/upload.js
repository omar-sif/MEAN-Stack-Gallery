const express = require('express');
const {saveImage} = require('../controllers/upload');
const upload = require('../middlewares/upload');
const {authenticate} = require('../middlewares/auth');


const router = express.Router();

router.post('/' , authenticate , upload , saveImage )

module.exports = router ;

