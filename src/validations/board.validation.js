import Joi  from 'joi'
import {HttpStatusCode} from '../utillities/constants.js'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20),
    })

    try {
        await condition.validateAsync(req.body , { abortEarly : false })
        next()
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error : error.message
      })  
    }
}


const update = async (req, res, next) => {
  const condition = Joi.object({
      title: Joi.string().min(3).max(20).trim(),
      columnOrder: Joi.array().items(Joi.string()),
  })

  try {
      await condition.validateAsync(req.body , {
           abortEarly : false ,
           allowUnknown : true
          })
      next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errorValidation : error.message
    })  
  }
}


export const BoardValidation = { createNew , update}