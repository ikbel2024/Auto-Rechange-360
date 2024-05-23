var mongo = require('mongoose');
//var comments = require('./comment');


 const Schema = mongo.Schema;
 const Post= new Schema({
        idpost : Number,
        name : String,
        post : String,
        commentaire : { type: Schema.Types.ObjectId, ref: 'comment' },
        date : Number,
        likes : Number,
    });

    module.exports=mongo.model("post",Post);