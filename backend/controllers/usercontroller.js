const User = require("../models/user");

async function add(req, res, next) {
    try {
        const user = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            adresse: req.body.adresse,
            email: req.body.email,
            num_tel: req.body.num_tel,
            mot_de_passe: req.body.mot_de_passe
        });
        await user.save();
        res.status(200).send("add good");
    } catch (err) {
        console.log(err);
    }
}

async function getall(req, res, next) {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

async function getbyid(req, res, next) {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}

async function deletebyid(req, res, next) {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
}
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
 exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
 
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
module.exports = {
    add,
    getall,
    getbyid,
    deletebyid,

};