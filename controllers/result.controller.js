import { votesCollection, surveyCollection, optionsCollection} from "../database/db.js"
import { ObjectId } from "mongodb"


export async function result(req, res, next){    
    const {id} = req.params
    try{
        const poll = await surveyCollection.findOne({
            _id: ObjectId(id)
        })
        const {_id, title, expireAt} = poll
        const findOptions = await optionsCollection.find({pollId: id}).toArray()

        const teste = await votesCollection.aggregate([
            {$match: {choiceId: {$in: [ObjectId("638f67a202508000bad581d8")]}}},
            { $project: { quizMax: { $max: "$votes"} } }
         ]).toArray()


        const query = {choiceId: findOptions._id} 
        const findVotes =  await votesCollection.find().sort({"votes" : -1}).limit(1).toArray()
        const countVotes = await votesCollection.find().toArray()
        console.log("teste", teste)
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



