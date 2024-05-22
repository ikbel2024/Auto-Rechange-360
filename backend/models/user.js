const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator'); 
const bcrypt= require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const { isEmail} = require('validator') 

// Schéma pour le modèle User
const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  adresse: { type: String, required: true },
  email: { type: String, 
    required: [true , 'please enter ur email'],
     unique: true , lowercase:true , 
    validate: [isEmail ,'Please enter a valid mail'] },
  num_tel: { type: Number, required: true, unique: true },
  mot_de_passe:  { type: String,
     required: [true,'Please enter an password'] ,
      minLenght:[8 , 'Minimum password length is 8 characters' ] },
   
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Référence vers le modèle Role
  matricule_fiscale: {
    type: String,
    required: function() {
      return this.roleId; // Matricule fiscale requis uniquement si un rôle est défini
    }
  }, 
  authTokens : [{
    authToken:{
      type: String , 
      required : true 
    }
  }]
});

userSchema.plugin(uniqueValidator);
userSchema.methods.generateAuthTokenAndSaveUser = async function(){
  const authToken = jwt.sign({_id: this._id.toString()}, 'foo' ) ; 
  this.authTokens.push({authToken}); 
  await this.save() ; 
  return authToken ; 
}
/*async function login  (req, res, next){
  try{
      const user = await user.findOne(req.body.email, req.body.mot_de_passe); 
      const authToken = await user.generateAuthTokenAndSaveUser(); 
      res.send({ user , authToken}); 

  }
  catch(e){
      res.status(400).send(); 
  }
};*/
// Modèle User basé sur le schéma
userSchema.post('save', function (doc , next){
  console.log('new user was created & saved', doc); 
  next(); 
});

userSchema.pre('save', function (next){
  console.log('user about to be created and saved', this); 
  next(); 
});
const User = mongoose.model('User', userSchema);

module.exports = User  ;
