import {Router} from "express";
import {result} from "../controllers/result.controller.js";
import { validateResult } from "../middlewares/validateResult.middleware.js";

const router = Router();

router.get("/poll/:id/result", validateResult, result)

export default router