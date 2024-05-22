const User = require('../models/user');

module.exports.signup_get = (req,res)=> {
    res.render('signup'); 
}

module.exports.login_get = (req,res)=> {
    res.render('login'); 
}
module.exports.signup_post = async (req,res)=> {
    const { nom , prenom , adresse , email,num_tel, mot_de_passe , roleId } = req.body ; 
    try{

        const user = await User.create({nom , prenom , adresse , email,num_tel, mot_de_passe , roleId}); 
        res.status(201).json(user); 

    }
    catch (err){
        console.log(err); 
        res.status(400)('error , user not created !'); 
    }
}
module.exports.login_post = async (req,res)=> {

    const { nom , prenom , adresse , email,num_tel, mot_de_passe , roleId } = req.body ; 

    console.log(nom , prenom , adresse , email,num_tel, mot_de_passe , roleId);
    res.send('user login'); 
}