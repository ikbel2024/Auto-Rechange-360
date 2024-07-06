var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var postcontroller = require('../controller/postcontroller');
const validate=require('../middl/validate');
const checkGreetings = require('../middl/greetingCheck');


router.get('/show', postcontroller.show);
router.post('/add',validate.validatepost, checkGreetings, postcontroller.add);
router.put('/update/:id', postcontroller.update, checkGreetings);
router.delete('/delete/:id', postcontroller.dlete);

router.get('/postid/:id', postcontroller.findid);
router.get('/postone/:name', postcontroller.findname);

router.get('/showviews', postcontroller.showByViews);
router.get('/showiduser/:iduser', postcontroller.findByUserId);
router.get('/partagepost/:id/:iduser', postcontroller.copyPostWithNewUser);
router.get('/likepost/:id', postcontroller.incrementLikes);
router.get('/viewspost/:id', postcontroller.incrementViews);






module.exports = router;