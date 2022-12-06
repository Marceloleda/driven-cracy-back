import { choiceSchema } from "../models/choiceSchemas.model.js";
import { optionsCollection, surveyCollection } from "../database/db.js"
import { ObjectId } from "mongodb"
import dayjs from "dayjs";

export async function validateChoice(req, res, next){
    const {body} = req
    const {title, pollId} = req.body

    const validation = choiceSchema.validate(body, {abortEarly: false,})
    
    if(validation.error){
        const errors = validation.error.details.map((detail)=> detail.message);
        res.status(422).send(errors)
        return;
    }
    try{
        const findTitle = await optionsCollection.findOne({
            title
        })
        if(findTitle){
            return res.sendStatus(409)
        }
        const expired = await surveyCollection.findOne({
            _id: ObjectId(pollId)
        })
        const data = expired.expireAt;

        const isDayExpired = (date) => dayjs().date() === dayjs(date).date() ? 
        false : dayjs().isAfter(dayjs(date));

        if(isDayExpired(data)=== true){
            return res.sendStatus(403)
        }
        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }
}

