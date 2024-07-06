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
const sendConfirmationEmail = (to, livraisonDetails) => {
    const mailOptions = {
        from: 'ikbel.aloui@esprit.tn',
        to: to,
        subject: 'Votre livraison est lancée',
        text: `Bonjour,\n\nVotre livraison numéro ${livraisonDetails.id} a été lancée et sera bientôt expédiée.\n\nDétails de la livraison:\nProduits: ${livraisonDetails.products}\nTotal: ${livraisonDetails.total}\n\nMerci de votre confiance,\nVotre Entreprise`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        } else {
            console.log('E-mail envoyé avec succès:', info);
        }
    });const nodemailer = require('nodemailer');

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
    const sendConfirmationEmail = (to, livraisonDetails) => {
        const mailOptions = {
            from: 'ikbel.aloui@esprit.tn',
            to: to,
            subject: 'Votre livraison est lancée',
            text: `Bonjour,\n\nVotre livraison numéro ${livraisonDetails.id} a été lancée et sera bientôt expédiée.\n\nDétails de la livraison:\nProduits: ${livraisonDetails.products}\nTotal: ${livraisonDetails.total}\n\nMerci de votre confiance,\nVotre Entreprise`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
            } else {
                console.log('E-mail envoyé avec succès:', info);
            }
        });
    };
    
    module.exports = { sendConfirmationEmail };
    
};

module.exports = { sendConfirmationEmail };
