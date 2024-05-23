var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var postcontroller = require('../controller/respondcontroller');
const validate=require('../middl/validate');


router.get('/show', postcontroller.show);
router.post('/add', postcontroller.add);
router.put('/update/:id', postcontroller.update);
router.delete('/delete/:id', postcontroller.dlete);

router.get('/postid/:id', postcontroller.findid);
router.get('/postone/:name', postcontroller.findname);

module.exports = router;