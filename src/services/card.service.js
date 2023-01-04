import { CardModel } from "../models/card.model.js"
import {ColumnModel} from "../models/column.model.js"

const createNew = async (data) => {
    try {
        const createdCard = await CardModel.createNew(data)
        const getnewCard = await CardModel.findOneById(createdCard.insertedId.toString())
        await ColumnModel.pushCardOrder(getnewCard.columnId.toString() , getnewCard._id.toString()) // ***
        return getnewCard
    } catch (error) {
        // để lỗi nhận được truyền qua bên controllers ở catch 
        throw new Error(error)
    }
}


const deleteCard = async (id) => {
    try {
        const result = await CardModel.deleteCard(id)
        return result
    } catch (error) {
        // để lỗi nhận được truyền qua bên controllers ở catch 
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
      const updateData = {
        ...data,
        updatedAt: Date.now(),
      };
      if(updateData._id) delete updateData._id
      const updatedCard = await CardModel.update(id, updateData);
      return updatedCard
    } catch (error) {
      // để lỗi nhận được truyền qua bên controllers ở catch
      throw new Error(error);
    }
  };
  


export const CardService = { createNew , deleteCard , update }
// service để viết logic truyền lên modal