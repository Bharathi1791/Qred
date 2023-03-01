import { pool } from '../configuration/config';

const getLastestTransactionsByLimt = (companyId: string, limit: string) =>
  pool
    .query('SELECT transaction_id, amount, transaction_date, merchant_name, "card".card_id  FROM "transactions" INNER JOIN "card" ON "card".card_id = "transactions".card_id WHERE card.company_id = $1 ORDER BY "transactions".transaction_id DESC LIMIT $2', [companyId, limit])
    .then(res => res.rows);

const countTransactions = (cardId: string) =>
  pool
    .query('SELECT count(*) FROM "transactions" WHERE card_id = $1', [cardId])
    .then(res => res.rows);

const getAllTransactionsWithOffset = (companyId: string, offset: string) =>
  pool
    .query('SELECT transaction_id, amount, transaction_date, merchant_name, "card".card_id  FROM "transactions" INNER JOIN "card" ON "card".card_id = "transactions".card_id WHERE card.company_id = $1 ORDER BY "transactions".transaction_id DESC OFFSET $2', [companyId, offset])
    .then(res => res.rows);

export default {
    getLastestTransactionsByLimt,
    countTransactions,
    getAllTransactionsWithOffset,
};
