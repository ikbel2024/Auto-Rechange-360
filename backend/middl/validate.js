const yup=require("yup");
//const { validate } = require("../model/classroom");

const validatepost =async(req,res,next)=>{
    try{
        const Schema=yup.object().shape({
            name:yup.string().required(),
            post:yup.string().required(),
            date:yup.number().required(),
            likes:yup.number().required()


        })
        await Schema.validate(req.body,{abortEarly:false});
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

const validatecomment =async(req,res,next)=>{
    try{
        const Schema=yup.object().shape({
            name:yup.string().required(),
            description:yup.string().required(),
            date:yup.number().required(),
            likes:yup.number().required()


        })
        await Schema.validate(req.body,{abortEarly:false});
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
module.exports= {validatepost,validatecomment};