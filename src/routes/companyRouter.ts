import express from 'express';

const router = express.Router();
import companyController from '../controllers/companyController';

router.get('/:id', companyController.getCompany);

export default router;