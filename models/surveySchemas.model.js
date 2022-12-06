import joi from "joi";
  
export const surveySchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.number().allow(null, '').required(),
})