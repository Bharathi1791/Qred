import { pool } from '../configuration/config';

const getCreditDetailByCompanyId = (companyId: string) =>
  pool
    .query('SELECT card_id, company_id, total_credit_amount, available_credit_amount FROM "card" WHERE company_id = $1 and activation_status = $2', [
      companyId, true])
    .then(res => res.rows);

export default {
  getCreditDetailByCompanyId,
};