import { votesCollection, surveyCollection, optionsCollection} from "../database/db.js"
import { ObjectId } from "mongodb"


export async function result(req, res, next){    
    const {id} = req.params
    try{
        const poll = await surveyCollection.findOne({
            _id: ObjectId(id)
        })
        const {_id, title, expireAt} = poll

        const query = {createdAt: poll.expireAt} 
        const findVotes =  await votesCollection.find(query).sort({"votes" : -1}).limit(1).toArray()

        findVotes.map((id)=>{
            res.send({
                _id,
                title,
                expireAt,                
                result:{
                    title: id.title,
                    votes: id.votes
                }
            })
        })
    }
    catch(error){
        return res.status(422).send(error.message);
    }
}



