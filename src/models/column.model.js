import Joi  from 'joi'
import {ObjectId} from 'mongodb'
import { getDB } from '../config/mongodb.js'


// column collection

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId : Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(), // ngăn chặn hết khoảng cách 2 bên 
    cardOrder : Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

// vd khi có 2 trường hoặc nhiều trường bị lỗi thì mặc định
// khi abortEarly true thì nó chỉ chạy 1 lỗi đàu tiên , nhưng nếu là false thì nó sẽ tìm hết các lỗi

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data , {abortEarly : false})
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOne({_id : ObjectId(id)})
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const createNew = async (data) => {
    try {
        console.log('============= datatoservice',data)
        const validatedValue = await validateSchema(data)
        const insertValue = { 
            ...validatedValue,
            boardId : ObjectId(validatedValue.boardId)
        }
        const result = await getDB().collection(columnCollectionName).insertOne(insertValue)
        return result ;
    } catch (error) {
        throw new Error(error)
    }
}


const pushCardOrder = async ( columnId , cardId) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate( 
            {_id : ObjectId(columnId),},
            {$push : {
                cardOrder : cardId
            }},
            {returnDocument :  'after'} //  thì  nó sẽ trả về bản ghi mới 
        )
        return result.value
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
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate( 
            {_id : ObjectId(id)},
            {$set : updateData},
            {returnDocument :  'after'} //  thì  nó sẽ trả về bản ghi mới 
        )
        console.log(result)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteColumn = async (id) => {
    try {
        const result = await getDB().collection(columnCollectionName).deleteOne({ "_id" : ObjectId(id)})
        console.log("delete" ,result)
        // return result.ops[0]
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const  ColumnModel = { createNew ,findOneById , pushCardOrder , update  ,deleteColumn}

// model chỉ việc gọi tới cơ sở dữ liệu thoi 