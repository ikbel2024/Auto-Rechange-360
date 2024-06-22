const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'grakrem23@gmail.com',
    pass: 'fybu zdrk mmgy peqe' // Utilisez des variables d'environnement pour plus de sécurité
  }
});

module.exports = transporter;