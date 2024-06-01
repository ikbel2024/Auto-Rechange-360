var mongo = require('mongoose');
//var comments = require('./comment');


 const Schema = mongo.Schema;
 const Post= new Schema({
        iduser : Number,
        name : String,
        post : String,
        likes : Number,
        views : Number,
    });

    module.exports=mongo.model("post",Post);