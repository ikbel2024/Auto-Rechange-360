const yup = require("yup");

// Define a validation schema using Yup
const validate = async(req, res, next) => {
    try {
        const Schema = yup.object().shape({
            modele: yup.string().required("modele obligatoire"),
            couleur: yup.string().required("couleur obligatoire"),
            energie: yup.string().required("energie obligatoire")
        });

        // Validate the request body against the schema
        await Schema.validate(req.body);

        // If validation is successful, proceed to the next middleware
        next();

    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
};

module.exports = validate;