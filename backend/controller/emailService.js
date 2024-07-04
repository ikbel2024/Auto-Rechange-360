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
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
                    <table width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
                        <tr>
                            <td style="padding: 20px;">
                                <h2 style="color: #333333;">Confirmation de votre commande</h2>
                                <p style="color: #333333;">Bonjour,</p>
                                <p style="color: #333333;">Votre commande numéro <strong>${orderDetails.id}</strong> a été validée et sera bientôt expédiée.</p>
                                <h3 style="color: #333333;">Détails de la commande:</h3>
                                <ul style="color: #333333;">
                                    ${orderDetails.products.split(',').map(product => `<li>${product.trim()}</li>`).join('')}
                                </ul>
                                <p style="color: #333333;"><strong>Total:</strong> ${orderDetails.total} DT</p>
                                <p style="color: #333333;">Merci de votre confiance,</p>
                                <p style="color: #333333;">AutoRechange 360</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding: 20px; background-color: #4CAF50; color: #ffffff; border-radius: 0 0 10px 10px;">
                                <p style="margin: 0;">Pour toute question ou assistance, veuillez nous contacter à <a href="mailto:support@autorechange.com.tn" style="color: #ffffff; text-decoration: underline;">support@autorechange.com.tn</a> ou appeler le +216 30 019 969.</p>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `
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
