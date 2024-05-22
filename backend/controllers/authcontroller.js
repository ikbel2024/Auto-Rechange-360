const User = require('../models/user');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', mot_de_passe: '' };

    //duplicate error code 

    if (err.code === 11000) {
        errors.email = 'that email is already registred'; 
        return errors;
    }

    //validation failed
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;

}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.signup_post = async (req, res) => {
    const { nom, prenom, adresse, email, num_tel, mot_de_passe, roleId } = req.body;
    try {

        const user = await User.create({ nom, prenom, adresse, email, num_tel, mot_de_passe, roleId });
        res.status(201).json(user);

    }
    catch (err) {
        const erros = handleErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.login_post = async (req, res) => {

    const { nom, prenom, adresse, email, num_tel, mot_de_passe, roleId } = req.body;

    console.log(nom, prenom, adresse, email, num_tel, mot_de_passe, roleId);
    res.send('user login');
}