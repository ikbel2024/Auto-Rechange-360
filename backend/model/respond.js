var mongo = require('mongoose');
//var responce = require('./respond');


 const Schema = mongo.Schema;
 const Respond= new Schema({
        idpost : String,
        idcomment : String,
        idrespond : String,
        iduser : String,
        respond : String,
        likes : Number,
        dislikes : Number,
    });

    module.exports=mongo.model("respond",Respond);