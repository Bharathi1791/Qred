/* eslint-disable */
const request = require("supertest");
const app = "http://localhost:8000"


describe('Company API', () => {

  it('will return status 200 and data with company id and name', async() => {
    const companyId = 1;

    const response =  await request(app).get(`/api/company/${companyId}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('company_id', 1);
    expect(response.body.data).toHaveProperty('name', 'Svensk Home AB');
  });

  it('will return 404 if company not found', async() => {
    const companyId = 8;

    const response =  await request(app).get(`/api/company/${companyId}`);

    expect(response.status).toBe(404);
  });

  it('will return 500 if company not numeric', async() => {
    const companyId = 'as8';

    const response =  await request(app).get(`/api/company/${companyId}`);

    expect(response.status).toBe(500);
  });
});
