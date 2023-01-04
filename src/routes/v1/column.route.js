import express from 'express';
import {ColumnController} from '../../controllers/column.controller.js'
import {ColumnValidation} from '../../validations/column.validation.js'

const router = express.Router();

// them column
router.route('/')
.post(ColumnValidation.createNew , ColumnController.createNew)

// edit title column
router.route('/:id')
.put(ColumnValidation.update , ColumnController.update)

// delete title column
router.route('/:id')
.delete( ColumnController.deleteColumn)


export const ColumnRoutes = router