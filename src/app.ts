import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 8080;

// ROUTERS
import companyRouter from './routes/companyRouter';
import transactionRouter from './routes/transactionRouter';
import cardRouter from './routes/cardRouter';
import invoiceRouter from './routes/invoiceRouter';

// * EXPRESS MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTER PATH
app.use('/api/company', companyRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/card', cardRouter);
app.use('/api/invoice', invoiceRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
