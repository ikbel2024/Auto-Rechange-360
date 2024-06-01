const yup=require("yup");
//const { validate } = require("../model/classroom");

const validatepost =async(req,res,next)=>{
    try{
        const Schema=yup.object().shape({
            name:yup.string().required(),
            post:yup.string().required(),
            likes:yup.number().required(),
            views : yup.number().required()


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
            
            comment:yup.string().required(),
            
            likes:yup.number().required(),
            dislikes:yup.number().required()



        })
        await Schema.validate(req.body,{abortEarly:false});
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
module.exports= {validatepost,validatecomment};