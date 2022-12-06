import { surveySchema } from "../models/surveySchemas.model.js";

export async function validateSurvey(req, res, next){
    const {body} = req

    try{
        const validation = surveySchema.validate(body, {abortEarly: false,})
        
        if(validation.error){
            const errors = validation.error.details.map((detail)=> detail.message);
            res.status(422).send(errors)
            return;
        }
        
        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }

}