import Joi  from 'joi'
import { getDB } from '../config/mongodb.js'
import {ObjectId} from 'mongodb'
// card collection

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId : Joi.string().required(),
    columnId : Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cover : Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

// vd khi có 2 trường hoặc nhiều trường bị lỗi thì mặc định
// khi abortEarly true thì nó chỉ chạy 1 lỗi đàu tiên , nhưng nếu là false thì nó sẽ tìm hết các lỗi

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data , {abortEarly : false})
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(cardCollectionName).findOne({_id : ObjectId(id)})
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = { 
            ...validatedValue,
            boardId : ObjectId(validatedValue.boardId),
            columnId : ObjectId(validatedValue.columnId)
        }
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
        return result
    } catch (error) {
        console.log('============= error',error)
    }
}

const deleteCard = async (id) => {
    try {
        const result = await getDB().collection(cardCollectionName).deleteOne({ "_id" : ObjectId(id)})
        // return result.ops[0]
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id , data) => {
    try {
        const updateData = {...data}
        if(data.boardId){
            updateData.boardId =  ObjectId(data.boardId)
        }
        if(data.columnId){
            updateData.columnId =  ObjectId(data.columnId)
        }

        const result = await getDB().collection(cardCollectionName).findOneAndUpdate( 
            {_id : ObjectId(id)},
            {$set : updateData},
            { returnDocument: 'after' } //  thì  nó sẽ trả về bản ghi sau khi set update
        )
        return result
    } catch (error) {
        throw new Error(error)
    }
  }


export const  CardModel = { createNew , findOneById , deleteCard , update}