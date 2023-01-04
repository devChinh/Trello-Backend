import Joi  from 'joi'
import {HttpStatusCode} from '../utillities/constants.js'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        boardId : Joi.string().required(),
        title: Joi.string().required().min(3).max(20).trim()
    })

    try {
        await condition.validateAsync(req.body , { abortEarly : false })
        next()
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        errorValidation : error.message
      })  
    }
}

const update = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(20).trim()
    })

    try {
        await condition.validateAsync(req.body , {
             abortEarly : false ,
             allowUnknown : true
            })
        next()
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error : error.message
      })  
    }
}

export const ColumnValidation = { createNew , update}