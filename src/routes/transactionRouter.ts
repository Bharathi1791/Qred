import express from 'express';

const router = express.Router();
import transactionController from '../controllers/transactionController';

router.get('/:companyId/getTransactions', transactionController.getLatestTransactions);
router.get('/:companyId/getAllTransactions', transactionController.getAllTransactions);

export default router;