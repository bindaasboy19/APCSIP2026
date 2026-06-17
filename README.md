# Aadhaar-Based Digital Identity Security & Risk Analyzer

A hackathon-ready, fully simulated cybersecurity platform for modeling Aadhaar-linked digital identity exposure without using real Aadhaar APIs or storing sensitive personal data.

## Features

- Email login with OTP simulation
- JWT-backed authenticated session flow
- Identity exposure form for bank accounts, SIM count, UPI apps, 2FA status, and inactive accounts
- Transparent risk scoring engine using the required formula
- Dashboard with charts, alerts, and recommendations
- Three visual fraud scenarios:
  - SIM Swap Attack
  - Identity Theft
  - Loan Fraud
- Helmet-secured Express API
- MongoDB persistence when configured
- Automatic in-memory fallback for local demo mode when MongoDB is unavailable

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Recharts
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Security: JWT, bcrypt, Helmet

## Project Structure

```text
digital-identity-security-risk-analyzer/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
└── package.json
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create environment files:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

3. Optional: start MongoDB locally and point `server/.env` at it.

Example:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/aadhaar-risk-analyzer
```

If `MONGODB_URI` is not provided, the app still runs in safe in-memory demo mode.

## Run

Start the backend:

```bash
npm run dev:server
```

Start the frontend in a second terminal:

```bash
npm run dev:client
```

Open:

```text
http://localhost:5175
```

## API Endpoints

- `POST /api/login`
- `POST /api/verify-otp`
- `POST /api/submit-identity`
- `GET /api/risk-score`
- `GET /api/simulate-attack`
- `GET /api/recommendations`

## Demo Flow

1. Request OTP using any valid email format.
2. Read the simulated OTP from the login page.
3. Verify the OTP.
4. Submit an identity profile.
5. Review the dashboard and simulation views.

## Sample Identity Input

```json
{
  "bankAccounts": 4,
  "simCount": 2,
  "upiAppsUsed": ["BHIM", "PhonePe", "Google Pay"],
  "twoFactorEnabled": false,
  "inactiveAccounts": true
}
```

Expected result for the sample:

- Risk score: `110`
- Risk level: `High`

## Verification Commands

Client production build:

```bash
npm --prefix client run build
```

Backend flow smoke test:

```bash
npm --prefix server run smoke
```

## Security Notes

- No real Aadhaar APIs are used.
- No Aadhaar numbers are collected or stored.
- Emails are normalized and fingerprinted server-side for lookup.
- OTPs are hashed with bcrypt before storage.
- Authenticated routes require JWT bearer tokens.
- Helmet is enabled for secure HTTP headers.
