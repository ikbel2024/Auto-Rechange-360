var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var postcontroller = require('../controller/postcontroller');


router.get('/show', postcontroller.show);
router.post('/add', postcontroller.add);
router.put('/update/:id', postcontroller.update);
router.delete('/delete/:id', postcontroller.dlete);

module.exports = router;