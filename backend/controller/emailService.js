const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Remplacez par votre serveur SMTP
    port: 587, // Port SMTP standard
    secure: false, // true pour 465, false pour les autres ports
    auth: {
        user: 'ikbel.aloui@esprit.tn', // Remplacez par votre adresse e-mail
        pass: 'Pag12490' // Remplacez par votre mot de passe
    }
});

// Fonction pour envoyer un e-mail de confirmation
const sendConfirmationEmail = (to, orderDetails) => {
    const mailOptions = {
        from: 'ikbel.aloui@esprit.tn', 
        to: to,
        subject: 'Confirmation de votre commande',
        text: `Bonjour,\n\nVotre commande numéro ${orderDetails.id} a été validée et sera bientôt expédiée.\n\nDétails de la commande:\nProduits: ${orderDetails.products}\nTotal: ${orderDetails.total}\n\nMerci de votre confiance,\nVotre Entreprise`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error while sending mail:', error);
        } else {
            console.log('Mail sent successfully:', info);
        }
    });
};


module.exports = { sendConfirmationEmail };
