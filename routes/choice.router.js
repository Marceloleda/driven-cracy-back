import {Router} from "express";
import {addOption, showOptions} from "../controllers/choice.controller.js";
import { validateChoice } from "../middlewares/validateChoice.middleware.js";

const router = Router();

router.post("/choice", validateChoice,addOption)
router.get("/poll/:id/choice", showOptions)

export default router