# Digital Identity Fraud Intelligence & Risk Analyzer

A hackathon-ready cybersecurity demo that shows how digital identity misuse can lead to account takeover, mule-account exposure, and fraud risk without using real Aadhaar APIs or storing sensitive personal data.

## 1. Setup Instructions

### Install

```bash
cd digital-identity-security-risk-analyzer
npm run install:all
```

### Environment files

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

`MongoDB` is optional. If `MONGODB_URI` is empty, the backend automatically runs in safe in-memory demo mode.

Example `server/.env`:

```env
PORT=5001
CLIENT_ORIGIN=http://localhost:5175
JWT_SECRET=change-me-for-local-development
MONGODB_URI=mongodb://127.0.0.1:27017/digital-identity-fraud-analyzer
```

### Run

Terminal 1:

```bash
npm run dev:server
```

Terminal 2:

```bash
npm run dev:client
```

Open `http://localhost:5175`

## 2. Backend Code

### Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Helmet security headers

### Backend structure

```text
server/
├── package.json
├── .env.example
└── src/
    ├── config/
    ├── constants/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── utils/
    ├── app.js
    ├── server.js
    └── smokeTest.js
```

### Implemented API endpoints

- `POST /api/auth/login`
- `POST /api/auth/verify-otp`
- `POST /api/user/input`
- `GET /api/user/risk`
- `GET /api/user/patterns`
- `GET /api/user/insights`
- `GET /api/user/recommendations`
- `GET /api/threats`

### Backend behavior

- Email + password login with OTP simulation
- JWT-based session handling
- Input validation and sanitization
- Simple explainable risk formula:

```text
(banks * 10) + (inactive ? 25 : 0) + (simCount > 1 ? 15 : 0) + (!has2FA ? 30 : 0)
```

- Fraud pattern detection:
  - Possible mule account risk
  - Inactive account exposure
  - SIM swap risk
  - Weak authentication controls
- Threat scenarios:
  - SIM Swap Attack
  - Identity Theft
  - Loan Fraud

## 3. Frontend Code

### Stack

- React with functional components
- Tailwind CSS
- Recharts

### Frontend structure

```text
client/
├── package.json
├── .env.example
└── src/
    ├── components/
    ├── context/
    ├── pages/
    ├── services/
    ├── utils/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

### Pages

- Landing Page
- Login Page
- Identity Form Page
- Dashboard Page
- Threat Simulation Page

### Key components

- `RiskCard`
- `PatternList`
- `InsightBox`
- `ThreatCard`

### Frontend behavior

- Secure login flow with OTP helper for demo use
- Simple identity input form
- Dashboard with:
  - numeric risk score
  - risk level
  - fraud pattern list
  - investigation insights
  - fraud flow visualization
  - alerts
  - recommendations
  - Recharts graphs
- Threat scenario browsing with step-by-step flows

## 4. Integration Steps

1. Start the backend on port `5001`.
2. Start the frontend on port `5175`.
3. Log in using any valid email and a password with at least 8 characters.
4. Use the displayed demo OTP to verify the session.
5. Submit the identity input form.
6. Review dashboard results and open the threat simulation page.

## 5. Sample Test Data

### Login

```json
{
  "email": "demo.user@example.com",
  "password": "HackathonDemo@123"
}
```

### Identity input

```json
{
  "numberOfBankAccounts": 4,
  "simCount": 2,
  "has2FA": false,
  "hasInactiveAccounts": true
}
```

### Expected outcome for sample data

- Risk score: `110`
- Risk level: `High`
- Mule risk signal: `Medium`
- SIM swap signal: `High`

## 6. README Notes

### Verification commands

Backend smoke test:

```bash
npm run smoke:server
```

Frontend production build:

```bash
npm run build:client
```

### Security and safety notes

- No real Aadhaar APIs are used.
- No sensitive personal identity data is stored.
- OTPs are hashed before persistence.
- Sessions use JWT bearer tokens.
- Passwords are hashed with bcrypt.
- Helmet is enabled for HTTP header hardening.
- MongoDB is optional and only stores non-sensitive mock profile data.
