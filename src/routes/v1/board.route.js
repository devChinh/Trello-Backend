import express from 'express';
import {HttpStatusCode} from '../../utillities/constants.js'
import {BoardController} from '../../controllers/board.controller.js'
import {BoardValidation} from '../../validations/board.validation.js'

const router = express.Router();

router.route('/:id')
  .get(BoardController.getFullBoard)

router.route('/:id')
  .put(BoardController.update)

router.route('/')
  .post(BoardValidation.createNew , BoardController.createNew)
  

export const BoardRoutes = router