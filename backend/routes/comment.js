var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');
var commentcontroller = require('../controller/commentcontroller');
const validate=require('../middl/validate');


router.get('/show', commentcontroller.show);
router.post('/add',commentcontroller.add);
router.put('/update/:id', commentcontroller.update);
router.delete('/delete/:id', commentcontroller.dlete);

router.get('/commentid/:id', commentcontroller.findid);
router.get('/commentone/:name', commentcontroller.findname);

module.exports = router;