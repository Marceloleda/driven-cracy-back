import { choiceSchema } from "../models/choiceSchemas.model.js";
import { optionsCollection, surveyCollection } from "../database/db.js"
import { ObjectId } from "mongodb"
import dayjs from "dayjs";

export async function validateVote(req, res, next){
    const {id} = req.params
    try{
        const findOption = await optionsCollection.findOne({
            _id: ObjectId(id)
        })
        if(!findOption){
            return res.sendStatus(404)
        }
        const option = await optionsCollection.findOne({
            _id: ObjectId(id)
        })
        const poll = await surveyCollection.findOne({
            _id: ObjectId(option.pollId)
        })
        const data = poll.expireAt;

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

