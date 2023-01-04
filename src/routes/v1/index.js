import express from 'express';
import {HttpStatusCode} from '../../utillities/constants.js'
import { BoardRoutes } from './board.route.js';
import { ColumnRoutes } from './column.route.js';
import {CardRoutes } from './card.route.js';

const router = express.Router();

// Board Api 
router.use('/boards' , BoardRoutes)

// column Api 
router.use('/columns' , ColumnRoutes)

// card Api 
router.use('/cards' , CardRoutes)


export const routerV1 = router
