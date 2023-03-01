import { pool } from '../configuration/config';

const getInvoiceDueByCompanyId = (companyId: string) =>
  pool
    .query('SELECT invoice_id, due_date, "card".card_id  FROM "invoice" INNER JOIN "card" ON "card".card_id = "invoice".card_id WHERE card.company_id = $1 and invoice_status = $2 ORDER BY "invoice".invoice_id DESC', [companyId, 'UNPAID'])
    .then(res => res.rows);

export default {
  getInvoiceDueByCompanyId,
};
