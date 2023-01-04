import { CardService } from "../services/card.service.js"
import { HttpStatusCode } from "../utillities/constants.js"

const createNew =  async (req, res) => {
    try {
        const result = await  CardService.createNew(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message})
    }
}

const deleteCard =  async (req, res) => {
    try {
        const { id } = req.params
        const result = await  CardService.deleteCard(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message})
    }
}

const update = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('============= id',id)
      console.log('============= req.body',req.body)
      const result = await CardService.update(id, req.body);
      res.status(HttpStatusCode.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

export const CardController  = { createNew , deleteCard , update}

// controllers dùng để điều hướng 