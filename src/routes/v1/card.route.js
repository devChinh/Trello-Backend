import express from 'express';
import {CardController} from '../../controllers/card.controller.js'
import {CardValidation} from '../../validations/card.validation.js'

const router = express.Router();
// them moi card
router.route('/')
.post(CardValidation.createNew , CardController.createNew)

router.route('/:id')
.delete(CardController.deleteCard)

router.route('/:id')
.put( CardValidation.update , CardController.update )


export const CardRoutes = router