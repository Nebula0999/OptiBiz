# OptiBiz — Project Blueprint
**Part 3 of 3: Architecture, Tech Stack & Development Roadmap**

---

## Step 7 — Architecture

> **Tip:** Draw the boxes and arrows before writing code. Define clear boundaries between frontend, backend, and external services.

### Architecture Type

**REST API + Single-Page Application (SPA)**
Django REST Framework serves a JSON API. React consumes it. Django Channels handles real-time WebSocket connections for live dashboard updates and notifications.

---

### System Components

| Component | Responsibility | Communicates With | Hosting |
|---|---|---|---|
| **React Frontend** | Renders UI, manages local state, calls API | Django REST API (HTTPS), Django Channels (WSS) | Vercel (free tier → upgrade as needed) |
| **Django Backend (DRF)** | Business logic, auth, CRUD, reports, file uploads | PostgreSQL, Redis, Celery, S3, Frontend | Render / Railway |
| **Django Channels** | WebSocket server for real-time notifications and live dashboard metrics | Redis (channel layer), Frontend | Same server as Django |
| **PostgreSQL** | Primary relational data store | Django backend only | Render Managed Postgres / Supabase |
| **Redis** | Caching, Celery message broker, Django Channels layer | Django backend, Celery workers | Upstash Redis (free tier) |
| **Celery** | Async task processing — report generation, email dispatch, scheduled reminders, future AI jobs | Redis, Django ORM, SendGrid, S3 | Same server as Django (separate worker process) |
| **Cloudflare R2 / S3** | Object storage for receipts, uploaded documents, generated PDF reports | Django backend | Cloudflare / AWS |
| **Nginx** | Reverse proxy, SSL termination, static file serving | Django (Gunicorn), React build | Same VPS or managed |

---

### Architecture Overview (Text Diagram)

```
[Browser / Mobile]
        │  HTTPS REST + WebSocket (WSS)
        ▼
[React SPA — Vercel]
        │  API calls (Axios)
        ▼
[Nginx — Reverse Proxy]
        │
  ┌─────┴──────┐
  │            │
[Gunicorn]   [Daphne / ASGI]
[Django DRF] [Django Channels]
  │            │
  └─────┬──────┘
        │
  ┌─────┼──────────────────────┐
  │     │                      │
[PostgreSQL] [Redis]      [Celery Workers]
              │                │
              └────────────────┘
                               │
                    [SendGrid / Email]
                    [Cloudflare R2]
                    [Future: AI service]
```

---

### External APIs & Third-Party Services

| Service | Purpose | Pricing Tier | Fallback / Risk |
|---|---|---|---|
| **SendGrid** | Transactional email (receipts, reports, reminders) | Free up to 100/day | SMTP via Gmail or Mailgun as fallback |
| **Cloudflare R2** | Object storage for PDFs and uploads | Free up to 10 GB + zero egress | Amazon S3 (S3-compatible API — minimal code change) |
| **Stripe** *(Phase 2)* | SaaS subscription billing | % per transaction | Manual invoicing for MVP |
| **M-Pesa Daraja API** *(Phase 2)* | Mobile money payment integration | Per-transaction fee | Manual M-Pesa code entry as interim |
| **Sentry** | Error tracking and alerting | Free for small projects | Console logs + email alerts |

> **MVP note:** Stripe and M-Pesa Daraja are not required for launch. Users can self-report payment methods. Integrate billing after validating willingness to pay.

---

## Step 8 — Tech Stack

> **Tip:** Choose familiar technology. The best stack is the one you can actually ship with.

### Stack Decisions

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React 18 + Vite | Fast build tooling; large ecosystem; team familiarity |
| **State management** | Redux Toolkit (global) + React Query (server state) | Predictable state; automatic cache and refetch for API data |
| **Styling** | Tailwind CSS + shadcn/ui | Fast iteration; consistent, accessible components; no CSS file sprawl |
| **Backend** | Django 5 + Django REST Framework | Mature, batteries-included, excellent admin panel; strong security defaults |
| **Async / Real-time** | Django Channels + Daphne (ASGI) | WebSocket support for live notifications and dashboard updates |
| **Background tasks** | Celery + Redis | Async report generation, scheduled reminders, future AI jobs |
| **Database** | PostgreSQL 16 | Best choice for financial data; strong ACID guarantees; JSON fields for flexibility |
| **Auth** | djangorestframework-simplejwt + bcrypt | Stateless JWT; scales horizontally; works with React SPA |
| **File storage** | Cloudflare R2 (via django-storages) | Zero egress fees; S3-compatible |
| **Email** | SendGrid (via django-sendgrid-v5) | Reliable delivery; generous free tier |
| **API documentation** | drf-spectacular (OpenAPI / Swagger) | Auto-generated docs; useful for future integrations |
| **Containerisation** | Docker + Docker Compose | Reproducible local environment; easy production deploy |
| **CI/CD** | GitHub Actions | Free for public repos; runs tests and deploys on push |
| **Hosting (FE)** | Vercel | Free tier; instant deploys from GitHub |
| **Hosting (BE)** | Render or Railway | Docker support; easy environment variables; affordable |
| **Monitoring** | Sentry | Error tracking with context and stack traces |
| **Reverse proxy** | Nginx | Static files, SSL, WebSocket proxy |

---

### Key Django Packages

| Purpose | Package |
|---|---|
| REST API | `djangorestframework` |
| JWT Auth | `djangorestframework-simplejwt` |
| CORS | `django-cors-headers` |
| Filtering & search | `django-filter` |
| Background tasks | `celery` |
| Periodic tasks | `django-celery-beat` |
| WebSockets | `channels`, `channels-redis` |
| File / object storage | `django-storages`, `boto3` |
| Audit logs | `django-simple-history` |
| Row-level permissions | `django-guardian` |
| API documentation | `drf-spectacular` |
| Environment variables | `python-decouple` |
| PDF generation | `weasyprint` or `reportlab` |
| Image handling | `Pillow` |

---

### Dev Environment Setup

**Prerequisites**

```
Python >= 3.12
Node.js >= 20.x
Docker + Docker Compose
Git
```

**Required environment variables (`.env`)**

```
# Django
SECRET_KEY=
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:pass@localhost:5432/optibiz

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET_KEY=
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7

# Email
SENDGRID_API_KEY=

# Storage
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET_NAME=
CLOUDFLARE_R2_ENDPOINT_URL=

# Sentry
SENTRY_DSN=
```

**Local startup**

```bash
# Backend
docker compose up -d db redis
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Celery worker (separate terminal)
celery -A optibiz worker -l info

# Frontend
cd frontend
npm install
npm run dev
```

---

## Step 9 — Development Roadmap

> **Tip:** Build in vertical slices — one complete feature end-to-end before moving on. Set up version control first.

### Phase Plan

| Phase | Goal | Key Deliverables | Duration | Status |
|---|---|---|---|---|
| **Phase 0 — Foundation** | Repo, environment, and CI ready | Git repo + branch protection, Docker Compose (DB + Redis), GitHub Actions pipeline, `.env` setup, base Django project, React + Vite scaffold | 2 days | TODO |
| **Phase 1 — Auth & Multi-tenancy** | Users can register a business and log in | Business and User models, JWT endpoints (register, login, refresh, logout), React login/register forms, protected route wrapper, role-based access middleware | 4 days | TODO |
| **Phase 2 — Products & Inventory** | Business can manage its stock | Product and Category CRUD (API + UI), Inventory model with reorder level, low-stock alert notifications | 5 days | TODO |
| **Phase 3 — Sales & Expenses** | Business can record transactions | Sale + SaleItem CRUD, Expense CRUD, Payment recording, receipt generation (PDF), Customer model | 5 days | TODO |
| **Phase 4 — Dashboard & Reports** | Business gets real-time insight | KPI cards (revenue, expenses, profit, stock alerts), sales/expense chart (React + Recharts), basic report generation (daily/weekly P&L), PDF export | 4 days | TODO |
| **Phase 5 — SACCO Module** | SACCO managers can track group finances | SACCOMember, Contribution, Loan, LoanRepayment models + API + UI pages | 5 days | TODO |
| **Phase 6 — Notifications & Reminders** | Users receive timely alerts | In-app notifications (Django Channels), email reminders (Celery + SendGrid), tax due-date scheduler | 3 days | TODO |
| **Phase 7 — Polish & Launch Prep** | Shippable, production-ready product | Error handling, form validation, mobile responsiveness audit, Sentry integration, staging deploy, smoke tests, landing page | 4 days | TODO |

**Total estimated duration: ~32 days** (buffer ~20% → target 6 weeks)

---

### Task Backlog

| # | Task | Phase | Status |
|---|---|---|---|
| T-01 | Initialise GitHub repo with README, `.gitignore`, branch protection | Phase 0 | TODO |
| T-02 | Set up Docker Compose (PostgreSQL + Redis) | Phase 0 | TODO |
| T-03 | Bootstrap Django project (`django-admin startproject`) | Phase 0 | TODO |
| T-04 | Configure `python-decouple` for environment variables | Phase 0 | TODO |
| T-05 | Bootstrap React + Vite frontend with Tailwind + shadcn/ui | Phase 0 | TODO |
| T-06 | Set up GitHub Actions CI (lint, test on push) | Phase 0 | TODO |
| T-07 | Design Business and User models + Django migrations | Phase 1 | TODO |
| T-08 | Implement Role model and permissions middleware | Phase 1 | TODO |
| T-09 | Build `POST /api/auth/register` endpoint | Phase 1 | TODO |
| T-10 | Build `POST /api/auth/login` and `POST /api/auth/refresh` endpoints | Phase 1 | TODO |
| T-11 | Build React Register and Login forms | Phase 1 | TODO |
| T-12 | Implement protected route wrapper in React | Phase 1 | TODO |
| T-13 | Design Product, Category, Inventory models | Phase 2 | TODO |
| T-14 | Build Product CRUD API endpoints | Phase 2 | TODO |
| T-15 | Build Product List and Add Product UI | Phase 2 | TODO |
| T-16 | Implement low-stock alert logic and notification creation | Phase 2 | TODO |
| T-17 | Design Sale, SaleItem, Expense, Payment, Customer models | Phase 3 | TODO |
| T-18 | Build Sale and SaleItem CRUD API | Phase 3 | TODO |
| T-19 | Build Create Sale UI (product selector, qty, payment method) | Phase 3 | TODO |
| T-20 | Build Expense CRUD API and UI | Phase 3 | TODO |
| T-21 | Implement receipt PDF generation (WeasyPrint / ReportLab) | Phase 3 | TODO |
| T-22 | Build Dashboard KPI cards and sales chart | Phase 4 | TODO |
| T-23 | Build report generation API (P&L, stock report) | Phase 4 | TODO |
| T-24 | Implement PDF export for reports | Phase 4 | TODO |
| T-25 | Build SACCO models and CRUD API | Phase 5 | TODO |
| T-26 | Build SACCO UI (Members, Contributions, Loans) | Phase 5 | TODO |
| T-27 | Implement Celery + Redis task queue | Phase 6 | TODO |
| T-28 | Build email reminder tasks (SendGrid) | Phase 6 | TODO |
| T-29 | Set up Django Channels for real-time notifications | Phase 6 | TODO |
| T-30 | Mobile responsiveness audit across all screens | Phase 7 | TODO |
| T-31 | Integrate Sentry error tracking | Phase 7 | TODO |
| T-32 | Deploy staging environment (Render + Vercel) | Phase 7 | TODO |
| T-33 | Write smoke-test checklist and run full QA pass | Phase 7 | TODO |
| T-34 | Build and deploy landing page | Phase 7 | TODO |

---

### Testing Strategy

| Test Type | Tool | What It Covers |
|---|---|---|
| **Unit tests** | pytest + pytest-django | Django model methods, serializer validation, utility functions, Celery tasks |
| **Integration tests** | DRF APIClient (pytest) | All API endpoints — happy paths and error cases |
| **Frontend unit tests** | Vitest + React Testing Library | React component rendering, form validation, state logic |
| **End-to-end tests** | Playwright | Critical user flows: register → onboard → record sale → view dashboard; SACCO member + loan flow |
| **Manual QA** | Checklist (see below) | Run before every release to staging |

**Manual QA Checklist (pre-release)**
- [ ] Register a new business; complete onboarding
- [ ] Add 5 products with categories and reorder levels
- [ ] Record 3 sales using different payment methods
- [ ] Log 2 expenses
- [ ] Verify KPI cards on dashboard reflect correct totals
- [ ] Trigger a low-stock alert (set stock to 0)
- [ ] Generate and download a P&L report as PDF
- [ ] Add a SACCO member, record a contribution, disburse a loan
- [ ] Check that notifications appear correctly
- [ ] Verify all screens render correctly on a 375 px mobile viewport
- [ ] Confirm a Cashier role cannot access Settings or Reports

---

### Definition of Done

A task or feature is **done** when all of the following are true:

1. Code reviewed and approved (or self-reviewed with checklist for solo work)
2. All relevant unit and integration tests pass in CI
3. Feature deployed to staging environment
4. Smoke-tested on staging (works end-to-end)
5. Documentation or inline comments updated where needed

---

## Known Risks & Assumptions

| Risk / Assumption | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Timeline slippage (first project, learning curve) | High | Medium | Budget 20% buffer in each phase; descope V2 features ruthlessly |
| Multi-tenancy logic error leaks one business's data to another | Low | High | Add `business_id` filter as default queryset on all models; write integration tests for tenant isolation |
| Django Channels / Celery complexity for a solo developer | Medium | Medium | Ship Phase 6 last; polling is an acceptable fallback if real-time proves too complex for MVP |
| PostgreSQL schema changes late in development | Medium | Medium | Use Django migrations consistently from Day 1; never edit the DB manually |
| M-Pesa Daraja API approval delays | High | Low | Defer M-Pesa integration to V2; manual payment recording is sufficient for MVP validation |
| Low adoption due to digital literacy barriers | Medium | High | Prioritise extremely simple onboarding; test with real informal vendors before launch |
| Scope creep from the long feature list | High | High | Refer back to MVP Features table before adding anything new; every addition needs a story and a phase |

---

## Open Questions

| Question | Owner | Due |
|---|---|---|
| Which subscription tiers and prices will we offer at launch? | Allan | Before Phase 7 |
| Do we require business registration number at sign-up, or make it optional? | Allan | Before Phase 1 |
| Will SACCO and SME features share one account type, or register separately? | Allan | Before Phase 1 |
| What reporting periods matter most to target users — daily, weekly, monthly? | Allan (user research) | Before Phase 4 |
| Which Kenyan tax types (VAT, PAYE, Turnover Tax) do we remind for in MVP? | Allan | Before Phase 6 |

---

## Notes & References

- Based on the "9-Step Planning Framework" by Tech With Tim
- Target market research: KBA MSMEs Survey, UNDP Informal Businesses Digital Shift, ResearchGate African Digital Economies study
- Inventory software impact data: Shipsy Africa Inventory Management blog
- AI accounting time savings: Sage Africa blog
- IMF Financial Inclusion seminar paper (cash business risk data)
