import { votesCollection, optionsCollection, surveyCollection } from "../database/db.js"
import { ObjectId } from "mongodb"
import { count } from "console"
import { result } from "./result.controller.js"


export async function vote(req, res, next){    
    const {id} = req.params
    try{
        const option = await optionsCollection.findOne({
            _id: ObjectId(id)
        })
        
        const contado = await votesCollection.count({choiceId: ObjectId(id)})
        
        const poll = await surveyCollection.findOne({
            _id: ObjectId(option.pollId)
        })

        const inserted = await votesCollection.insertOne({
            createdAt: poll.expireAt,
            choiceId: ObjectId(id),
        })
    
        await votesCollection.updateOne(
            {_id: inserted.insertedId},
            {$set: { "title":option.title,
                    "votes": contado
            }}
        )

        res.sendStatus(201)
    }
    catch(error){
        return res.status(422).send(error.message);
    }
}



