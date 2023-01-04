import { ObjectId } from "mongodb"
import { ColumnService } from "../services/column.service.js"
import { HttpStatusCode } from "../utillities/constants.js"

const createNew =  async (req, res) => {
    try {
        const result = await  ColumnService.createNew(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errorValidation: error.message})
    }
}

const update =  async (req, res) => {
    try {
        const { id } = req.params
        const result = await  ColumnService.update(id,req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message})
    }
}

const deleteColumn =  async (req, res) => {
    try {
        const { id } = req.params
        const result = await  ColumnService.deleteColumn(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message})
    }
}

export const ColumnController  = { createNew , update , deleteColumn}

// controllers dùng để điều hướng 