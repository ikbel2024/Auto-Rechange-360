var mongo = require('mongoose');
//var responce = require('./respond');

 const Schema = mongo.Schema;
 const Comment= new Schema({
        idpost : String,
        iduser : String,
        comment : String,
        likes : Number,
        dislikes : Number,
    });

    module.exports=mongo.model("comment",Comment);