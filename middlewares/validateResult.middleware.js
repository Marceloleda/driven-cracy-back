import { ObjectId } from "mongodb"
import {surveyCollection } from "../database/db.js"

export async function validateResult(req, res, next){
    const {id} = req.params

    try{
       const survey = await surveyCollection.findOne({_id: ObjectId(id)})
       if(!survey){
        return res.sendStatus(404)
       }
        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }

}