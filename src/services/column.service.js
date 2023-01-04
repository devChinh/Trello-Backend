import { ColumnModel } from "../models/column.model.js"
import { BoardModel } from "../models/board.model.js"
import { CardModel } from "../models/card.model.js"

const createNew = async (data) => {
    try {

        const createdColumn = await ColumnModel.createNew(data)
        const getnewColumn = await ColumnModel.findOneById(createdColumn.insertedId.toString())
        getnewColumn.cards = []
        await BoardModel.pushColumnOrder(getnewColumn.boardId.toString() , getnewColumn._id.toString()) // ***
        return getnewColumn
    } catch (error) {
        // để lỗi nhận được truyền qua bên controllers ở catch 
        throw new Error(error)
    }
}

const update = async (id , data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now(),
        }
        if(updateData._id) delete updateData._id
        const updatedColumn = await ColumnModel.update(id ,updateData)
        return updatedColumn
    } catch (error) {
        // để lỗi nhận được truyền qua bên controllers ở catch 
        throw new Error(error)
    }
}

const deleteColumn = async (id) => {
    try {
        const result = await ColumnModel.deleteColumn(id)
        return result
    } catch (error) {
        // để lỗi nhận được truyền qua bên controllers ở catch 
        throw new Error(error)
    }
}

export const ColumnService = { createNew , update , deleteColumn }

// service để viết logic truyền lên modal 