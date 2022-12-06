import {Router} from "express";
import {addSurvey, getSurvey} from "../controllers/survey.controller.js";
import { validateSurvey } from "../middlewares/validateSurvey.middleware.js";
// import validate

const router = Router();

router.post("/poll", validateSurvey, addSurvey)
router.get("/poll", getSurvey)

export default router