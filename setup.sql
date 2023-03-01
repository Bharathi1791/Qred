DROP TABLE IF EXISTS "invoice"
CASCADE;
DROP TABLE IF EXISTS "payment"
CASCADE;
DROP TABLE IF EXISTS "transactions"
CASCADE;
DROP TABLE IF EXISTS "card"
CASCADE;
DROP TABLE IF EXISTS "application"
CASCADE;
DROP TABLE IF EXISTS "credit"
CASCADE;
DROP TABLE IF EXISTS "company"
CASCADE;
DROP TABLE IF EXISTS "country"
CASCADE;

CREATE TABLE "country" (
  "country_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  "code" VARCHAR(100)  UNIQUE NOT NULL,
  "currency" VARCHAR(10) NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP
);

CREATE TABLE "company" (
  "company_id" SERIAL PRIMARY KEY,
  "country_id" INTEGER,
  "name" VARCHAR(100),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "phone_number" VARCHAR(10),
  "activation_status" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES "country"(country_id)
);

CREATE TABLE "credit" (
  "credit_id" SERIAL PRIMARY KEY,
  "country_id" INTEGER NOT NULL,
  "credit_amount" INTEGER NOT NULL,
  "interest" NUMERIC(5,2),
  "version" INTEGER NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES "country"(country_id)
);

CREATE TABLE "application" (
  "application_id" SERIAL PRIMARY KEY,
  "company_id" INTEGER,
  "status" VARCHAR(100),
  "rejection_reason" VARCHAR(500),
  "date_submitted" TIMESTAMP NOT NULL,
  "requested_credit_id" INTEGER,
  "granted_credit_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
   FOREIGN KEY (company_id) REFERENCES "company"(company_id),
   FOREIGN KEY (requested_credit_id) REFERENCES "credit"(credit_id),
   FOREIGN KEY (granted_credit_id) REFERENCES "credit"(credit_id)
);

CREATE TABLE "card" (
  "card_id" SERIAL PRIMARY KEY,
  "card_number" VARCHAR(100) NOT NULL,
  "expiration_date" TIMESTAMP NOT NULL,
  "card_cvv" VARCHAR(100) NOT NULL,
  "total_credit_amount" INTEGER NOT NULL,
  "available_credit_amount" INTEGER NOT NULL,
  "date_activated" TIMESTAMP NOT NULL,
  "activation_status" BOOLEAN NOT NULL,
  "application_id" INTEGER NOT NULL,
  "company_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES "application"(application_id),
  FOREIGN KEY (company_id) REFERENCES "company"(company_id)
);

CREATE TABLE "transactions" (
  "transaction_id" SERIAL PRIMARY KEY,
  "transaction_date" TIMESTAMP NOT NULL,
  "amount" INTEGER NOT NULL,
  "merchant_name" VARCHAR(100) NOT NULL,
  "card_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES "card"(card_id)
);

CREATE TABLE "payment" (
  "payment_id" SERIAL PRIMARY KEY,
  "payment_date" VARCHAR(100) NOT NULL,
  "amount" INTEGER,
  "payment_reference" VARCHAR(100),
  "payment_type" VARCHAR(100),
  "card_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP NOT NULL,
  FOREIGN KEY (card_id) REFERENCES "card"(card_id)
);

CREATE TABLE "invoice" (
  "invoice_id" SERIAL PRIMARY KEY,
  "invoice_number" VARCHAR(100) NOT NULL,
  "payment_reference" VARCHAR(100) NOT NULL,
  "invoice_amount" INTEGER NOT NULL,
  "remaining_amount" INTEGER NOT NULL,
  "card_id" INTEGER NOT NULL,
  "due_date" TIMESTAMP NOT NULL,
  "invoice_status" VARCHAR(100),
  "created_at" TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES "card"(card_id)
);

INSERT INTO country (name, code, currency, created_at, updated_at)
  VALUES ('Sweden', 'SE', 'SEK', '2023-02-25', NULL),
         ('Norway', 'NO', 'NOK', '2023-02-25', NULL),
         ('Netherlands', 'NL', 'EUR', '2023-02-25', NULL),
         ('Denmark', 'DK', 'DKK', '2023-02-25', NULL),
         ('Belgium', 'BE', 'EUR', '2023-02-25', NULL),
         ('Brazil', 'BR', 'BRL', '2023-02-25', NULL);


INSERT INTO company (country_id, name, email, phone_number, activation_status, created_at, updated_at)
  VALUES ('1', 'Svensk Home AB', 'svenskHome@home.se', '0793040001', true, '2023-02-25', NULL),
         ('1', 'Svensk Forest AB', 'svenskForest@forest.se', '079304002', true, '2023-02-25', NULL),
         ('2', 'Norway Company AB', 'norwayCompany@norway.no', '079304003', true, '2023-02-25', NULL),
         ('2', 'Norway Fish AB', 'norwayFish@fish.no', '079304004', true, '2023-02-25', NULL),
         ('3', 'Denmark Demand AB', 'demandDenmark@demand.dk', '079304005', true, '2023-02-25', NULL);

INSERT INTO credit (country_id, credit_amount, interest, version, created_at, updated_at)
  VALUES ('1', 10000, 0.18, 1, '2023-02-25', NULL),
         ('1', 20000, 0.18, 1, '2023-02-25', NULL),
         ('2', 10000, 0.18, 1, '2023-02-25', NULL),
         ('3', 10000, 0.18, 1, '2023-02-25', NULL),
         ('4', 10000, 0.18, 1, '2023-02-25', NULL),
         ('5', 10000, 0.18, 1, '2023-02-25', NULL),
         ('6', 10000, 0.18, 1, '2023-02-25', NULL);

INSERT INTO application (company_id, status, rejection_reason, date_submitted, requested_credit_id, granted_credit_id, created_at, updated_at)
  VALUES ('1', 'Granted', NULL, '2023-02-25', 2, 1, '2023-02-25', NULL),
         ('2', 'Granted', NULL, '2023-02-23', 1, 1, '2023-02-25', NULL),
         ('3', 'Rejected', 'Less Credit Score', '2023-02-23', 1, NULL, '2023-02-25', NULL);

INSERT INTO card (card_number, expiration_date, card_cvv, total_credit_amount, available_credit_amount, date_activated, activation_status, application_id, company_id, created_at, updated_at)
  VALUES ('1234 5678 1234 3435', '2030-02-25', '456', 10000, 3000, '2022-02-25', true, 1, 1, '2022-02-25', NULL),
         ('1234 5678 5945 1111', '2045-02-25', '666', 10000, 5800, '2021-02-25', true, 1, 1, '2021-02-25', NULL);

INSERT INTO transactions (transaction_date, amount, merchant_name, card_id, created_at, updated_at)
  VALUES ('2022-03-14', 1000, 'HEMKÖP', 1, '2022-03-26', NULL),
         ('2022-03-15', 1000, 'WILLYS', 1, '2022-03-15', NULL),
         ('2022-03-16', 1000, 'SALAM LIVS', 1, '2022-03-16', NULL),
         ('2022-03-18', 1000, 'BARBER', 1, '2022-03-18', NULL),
         ('2022-03-20', 1000, 'MAX', 1, '2022-03-20', NULL),
         ('2022-03-22', 1000, 'EXPRESSO', 1, '2022-03-22', NULL),
         ('2022-03-27', 1000, 'K25', 1, '2022-03-27', NULL);

INSERT INTO invoice (invoice_number, payment_reference, invoice_amount, remaining_amount, card_id, due_date, invoice_status, created_at, updated_at)
  VALUES ('1234567891213', 'MNOP2423DFR', 2000, 0, 1, '2022-03-27', 'PAID', '2022-03-26', NULL),
  ('1234567891213', 'MNOP2423DFRSS', 4000, 0, 1, '2022-04-27', 'UNPAID', '2022-03-26', NULL);
