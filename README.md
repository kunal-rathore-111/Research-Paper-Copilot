# Research-Paper-Copilot

> AI-powered backend that discovers, analyzes, and summarizes academic papers using a multi-agent pipeline built on Google Gemini and the arXiv API.

**Live Demo** → [minor-deploy-64gx.vercel.app](https://minor-deploy-64gx.vercel.app)

---

## What it does

You send a research query. The system runs it through three specialized AI agents in sequence — one searches arXiv for relevant papers, one summarizes them using Gemini, and one validates the output for accuracy and structure. The final response includes a comprehensive answer, paper metadata, and a downloadable PDF report.

---

## Architecture

```
User Query
    │
    ▼
Coordinator Agent
    ├── Search Agent   → queries arXiv API → returns up to 7 papers
    ├── Summary Agent  → formats papers + runs Gemini 2.0 Flash → structured summary
    └── Validation Agent → quality checks with Gemini 2.5 Flash → final JSON output
    │
    ▼
MongoDB  (conversation + paper storage)
    │
    ▼
PDF Export via Puppeteer
```

---

## Tech Stack

| Layer | Technology |
|:--|:--|
| Runtime | Node.js v18+ |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| AI | Google Gemini 2.0 & 2.5 Flash |
| Paper Source | arXiv API |
| Auth | JWT + bcrypt + OTP via Nodemailer |
| Validation | Zod |
| PDF | Puppeteer |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|:--|:--|:--|
| POST | `/auth/email-register` | Register — sends OTP to email |
| POST | `/auth/email-register/otp-verification` | Verify OTP and complete signup |
| POST | `/auth/signin` | Sign in — sets JWT cookie |
| POST | `/auth/signin/check-token` | Validate existing token |

### Research
| Method | Endpoint | Description |
|:--|:--|:--|
| POST | `/chat/query` | Submit a research query |
| GET | `/chat/fetch-all-chat` | Get full conversation history |
| POST | `/export/:queryId` | Download query result as PDF |

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/kunal-rathore-111/Research-Paper-Copilot.git
cd Research-Paper-Copilot

# 2. Install
npm install

# 3. Configure environment
cp env.example .env
# Fill in the values below

# 4. Run
npm run dev
```

### Environment Variables

```env
PORT=3000
MONGOO_DB_URL=mongodb://localhost:27017/research-copilot
JWT_SECRET=your_jwt_secret_min_32_chars
GEMINI_API=your_google_gemini_api_key
EMAIL_ID=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
BACKEND_BASE_Url=http://localhost:3000/app/api
```

---

## Project Structure

```
src/
├── agents/          # Multi-agent pipeline (coordinator, search, summary, validation, html)
├── controllers/     # Route handlers
├── middlewares/     # Auth, validation, error handling
├── models/          # Mongoose schemas (User, Conversation, Paper, OTP)
├── routes/          # Express routers
├── services/        # Database operations
├── utils/           # JWT, OTP, email, PDF generation
└── validators/      # Zod schemas
```

---

## Roadmap

- [ ] PubMed and Google Scholar integration
- [ ] Paper bookmarking and collections
- [ ] Citation export (BibTeX, APA)
- [ ] Rate limiting and caching
- [ ] Unit and integration tests

---

*Built by [Kunal Rathore](https://github.com/kunal-rathore-111)*
