var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');
var commentcontroller = require('../controller/commentcontroller');
const validate=require('../middl/validate');


router.get('/show', commentcontroller.show);
router.post('/add',validate.validatecomment,commentcontroller.add);
router.put('/update/:id', commentcontroller.update);
router.delete('/delete/:id', commentcontroller.dlete);

router.get('/commentid/:id', commentcontroller.findid);
router.get('/commentone/:name', commentcontroller.findname);
router.get('/commentuser/:iduser', commentcontroller.findCommentsByUser);
router.get('/commentpost/:idpost', commentcontroller.findCommentsByPost);



module.exports = router;