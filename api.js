import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import surveyRouter from "./routes/survey.router.js"
import choiceRouter from "./routes/choice.router.js"
import voteRouter from "./routes/vote.router.js"
import resultRouter from "./routes/result.router.js"

dotenv.config()

const api = express()
api.use(cors())
api.use(express.json())

api.use(surveyRouter);
api.use(choiceRouter);
api.use(voteRouter)
api.use(resultRouter)

const PORT = process.env.PORT || 5000;
api.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
