const yup=require("yup");
//const { validate } = require("../model/classroom");

const validate=async(req,res,next)=>{
    try{
        const Schema=yup.object().shape({
            name:yup.string().required(),
            email:yup.string().email().required(),
            nbrstudent:yup.number().required()

        })
        await Schema.validate(req.body,{abortEarly:false});
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
module.exports= validate;