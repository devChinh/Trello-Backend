import Joi from "joi";
import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

// board collection
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

// vd khi có 2 trường hoặc nhiều trường bị lỗi thì mặc định
// khi abortEarly true thì nó chỉ chạy 1 lỗi đàu tiên , nhưng nếu là false thì nó sẽ tìm hết các lỗi

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        {
          $push: {
            columnOrder: columnId,
          },
        },
        { returnDocument: "after" } //  thì  nó sẽ trả về bản ghi mới
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
          },
        },
        {
          $lookup: {
            // dùng để look up dữ liệu con trong 1 key của cha
            from: "columns",
            localField: "_id", // so sánh id cuả board với boardId của column
            foreignField: "boardId",
            as: "columns", // tên key
          },
        },
        {
          $lookup: {
            // dùng để look up dữ liệu con trong 1 key của cha
            from: "cards", // từ collection name  card trong mongodb
            localField: "_id", // so sánh id cuả board với boardId của column
            foreignField: "boardId",
            as: "cards", // tên key
          },
        },
      ])
      .toArray();
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id , data) => {
  try {
      const updateData = {...data}
      const result = await getDB().collection(boardCollectionName).findOneAndUpdate( 
          {_id : ObjectId(id)},
          {$set : updateData},
          { returnDocument: 'after' } //  thì  nó sẽ trả về bản ghi sau khi set update
      )
      return result
  } catch (error) {
      throw new Error(error)
  }
}

export const BoardModel = {
  createNew,
  findOneById,
  pushColumnOrder,
  getFullBoard,
  update
};
