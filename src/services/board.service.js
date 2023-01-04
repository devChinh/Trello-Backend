import { BoardModel } from "../models/board.model.js";

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data);
    const getnewBoard = await BoardModel.findOneById(
      createdBoard.insertedId.toString()
    );
    return getnewBoard;
  } catch (error) {
    // để lỗi nhận được truyền qua bên controllers ở catch
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    // add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (c) => c.columnId.toString() === column._id.toString()
      );
    });

    // remove cards data from the board
    delete board.cards;

    return board;
  } catch (error) {
    // để lỗi nhận được truyền qua bên controllers ở catch
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if(updateData._id) delete updateData._id
    const updatedBoard = await BoardModel.update(id, updateData);
    return updatedBoard;
  } catch (error) {
    // để lỗi nhận được truyền qua bên controllers ở catch
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard, update };

// service để viết logic truyền lên modal
// render ra giao diện Api
