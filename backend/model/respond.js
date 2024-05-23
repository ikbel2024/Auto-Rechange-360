var mongo = require('mongoose');
//var responce = require('./respond');


 const Schema = mongo.Schema;
 const Respond= new Schema({
        idpost : Number,
        idcomment : Number,
        idrespond : Number,
        commentaire : { type: Schema.Types.ObjectId, ref: 'respond' },
        date : Number,
        likes : Number,
    });

    module.exports=mongo.model("respond",Respond);