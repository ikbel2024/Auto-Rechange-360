var mongo = require('mongoose');
//var responce = require('./respond');

 const Schema = mongo.Schema;
 const Comment= new Schema({
        idpost : Number,
        idcomment : Number,
        description : String,
        repondre : { type: Schema.Types.ObjectId, ref: 'respond' },
        date : Number,
        likes : Number,
    });

    module.exports=mongo.model("comment",Comment);