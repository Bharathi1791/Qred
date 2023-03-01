import express from 'express';

const router = express.Router();
import invoiceController from '../controllers/invoiceController';

router.get('/:companyId', invoiceController.getInvoiceDue);

export default router;