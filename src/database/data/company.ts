import { pool } from '../configuration/config';

const getCompanyById = (companyId: string):Promise<{company_id: string, name: string}[] | null> =>
  pool
    .query('SELECT company_id, name FROM "company" WHERE company_id = $1', [companyId])
    .then(res => res.rows);

export default {
  getCompanyById,
};


