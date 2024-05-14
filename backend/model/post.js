var mongo = require('mongoose');
 const Schema = mongo.Schema;
 const Post= new Schema({
        name : String,
        post : String,
        date : Number,
        likes : Number,
    });

    module.exports=mongo.model("post",Post);