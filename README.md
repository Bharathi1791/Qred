# QRED

An backend api to maintain credit card home page.

TechStack:
Node js - Express framwork,
Postgresql,
Jest and Supertest - TDD,
Eslint.

Instructions:

1. git clone https://github.com/Bharathi1791/Qred_project
2. npm install
3. add .env file for environmental variables
4. update .env file.
5. Execute setup.sql
6. npm run build
7. npm start

Now you can try with following api end points to check various scenarios via postman or curl,

http://localhost:8000

CreditCard Home page:

1. GET /api/company/:id
2. GET /api/transactions/:companyId/getTransactions?limit=3
3. GET /api/transactions/:companyId/getAllTransactions?offset=3
4. GET /api/card/:companyId/amount
5. GET /api/invoice/:companyId
