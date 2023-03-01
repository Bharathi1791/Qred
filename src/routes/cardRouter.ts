import express from 'express';

const router = express.Router();
import cardController from '../controllers/cardController';

router.get('/:companyId/amount',
cardController.getRemainingSpend);

export default router;