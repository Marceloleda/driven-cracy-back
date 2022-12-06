import {Router} from "express";
import {vote} from "../controllers/vote.controller.js";
import {validateVote} from "../middlewares/validateVote.middleware.js"

const router = Router();

router.post("/choice/:id/vote",validateVote, vote)

export default router