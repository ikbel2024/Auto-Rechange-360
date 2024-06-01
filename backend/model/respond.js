var mongo = require('mongoose');
//var responce = require('./respond');


 const Schema = mongo.Schema;
 const Respond= new Schema({
        idpost : Number,
        idcomment : Number,
        idrespond : Number,
        iduser : Number,
        respond : String,
        likes : Number,
        dislikes : Number,
    });

    module.exports=mongo.model("respond",Respond);