import { surveyCollection } from "../database/db.js"
import { ObjectId } from "mongodb"
import dayjs from "dayjs";


export async function addSurvey(req, res, next){
    const {title, expireAt} = req.body

    const time = dayjs().add((expireAt === "" ? 30 : expireAt), 'day').format('YYYY/MM/DD hh:mm');

    console.log(time)

    try{
        const survey = await surveyCollection.findOne({
            title,
        })
        if(survey){
            return res.sendStatus(409)
        }
        const idSurvey = await surveyCollection.insertOne({
            title,
            expireAt: time
        })

        res.status(201).send(idSurvey.insertedId)
    }
    catch(error){
        return res.status(422).send(error.message);
    }
}

export async function getSurvey(req, res, next){

    try{
        const listSurvey = await surveyCollection.find().toArray()
        res.status(200).send(listSurvey)
    }
    catch(error){
        return res.status(422).send(error.message);
    }
}