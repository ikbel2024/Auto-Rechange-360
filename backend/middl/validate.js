const yup = require("yup");

// Define a combined validation schema using Yup
const validate = async(req, res, next) => {
    try {
        const Schema = yup.object().shape({
            // Fields from the first schema
            nom: yup.string().required("Nom is required"),
            reference: yup.string().required("Reference is required"),
            produit_id: yup.string().required("Produit ID is required"),
            quantité: yup.number().required("Quantity is required").positive("Quantity must be a positive number"),
            Description: yup.string().required("Description is required"),
            // Fields from the second schema
            modele: yup.string().required("modele obligatoire"),
            couleur: yup.string().required("couleur obligatoire"),
            energie: yup.string().required("energie obligatoire")
        });

        // Validate the request body against the schema
        await Schema.validate(req.body);

        // If validation is successful, proceed to the next middleware
        next();

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message); // Send error message as response
    }
};

module.exports = validate;