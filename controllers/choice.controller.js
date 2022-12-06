import { optionsCollection, surveyCollection } from "../database/db.js"
import { ObjectId } from "mongodb"
import dayjs from "dayjs";


export async function addOption(req, res, next){
    const {title, pollId} = req.body

    try{
        const find = await surveyCollection.findOne({
            _id: ObjectId(pollId)
        })
        if(!find){
            return res.sendStatus(404)
        }
        await optionsCollection.insertOne({
            title,
            pollId
        })
        res.sendStatus(201)
    }
    catch(error){
        return res.status(422).send(error.message);
    }
}

export async function showOptions(req, res, next){
    const {id} = req.params
    try{
        const enquete = await surveyCollection.findOne({
            _id: ObjectId(id)
        })
        console.log(enquete)
        if(!enquete){
            return res.sendStatus(404)
        }
        const options = await optionsCollection.find({
            pollId: id
        }).toArray()
        res.status(200).send(options)
    }
    catch(error){
        res.sendStatus(422)
        return
    }
}

