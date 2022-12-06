import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("Projeto conectado ao banco de dados");
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("drivenCracy");
export const surveyCollection = db.collection("survey");
export const optionsCollection = db.collection("options");
export const votesCollection = db.collection("votes");
