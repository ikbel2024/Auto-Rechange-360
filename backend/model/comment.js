var mongo = require('mongoose');
 const Schema = mongo.Schema;
 const Comment= new Schema({
        name : String,
        description : String,
        date : Number,
        likes : Number,
    });

    module.exports=mongo.model("comment",Comment);