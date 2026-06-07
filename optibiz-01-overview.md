# OptiBiz — Project Blueprint
**Part 1 of 3: Overview, Goals & MVP**

| | |
|---|---|
| **Project** | OptiBiz |
| **Author** | Allan Nabule |
| **Start Date** | 21 May 2026 |
| **Target Launch** | 05 Jun 2026 |
| **Status** | Planning |
| **Version** | v0.1.0 |
| **Stack** | Django + React |
| **Repository** | `github.com/your-org/optibiz` |

---

## Step 1 — Define Project Goals

### Problem Statement

Most small and medium enterprises (SMEs) and informal businesses in Kenya and across Africa lack accessible, affordable software to manage their operations. They track sales, expenses, and stock manually — with notebooks, loose paper, or fragmented spreadsheets — which means unreliable data, missed opportunities, and an inability to access formal credit.

**OptiBiz** is a multi-tenant SaaS platform that gives any business — from a roadside kiosk to a 50-person SME — a single dashboard for sales, expenses, inventory, customers, and reporting. A clean financial record also positions users to access loans and comply with tax obligations more easily. Future versions will layer in AI-powered recommendations as usage data accumulates.

---

### Target Audience

| Persona | Role | Tech Level | Key Pain Points |
|---|---|---|---|
| **Informal Retail Vendor** (kiosk/market stall) | Sole operator — cashier, stockkeeper | Low — smartphone + M-Pesa, little formal accounting | Pen-and-paper records; no proof of income for loans; stock goes missing |
| **Small Shop Owner** (registered retailer) | Owner/manager — sales, procurement, bookkeeping | Medium — spreadsheets or basic apps | Multiple disconnected tools; manual reconciliation; hard to get credit |
| **Restaurant / Café Operator** | Owner — menu, staff, purchases, daily cash | Medium — POS or M-Pesa | Perishable inventory; cash theft risk; no food-cost or waste tracking |
| **Small Manufacturer / Artisan** (tailor, carpenter) | Owner/production manager | Medium — spreadsheets or legacy tools | Paper-based raw material tracking; unclear production cost; pricing guesswork |
| **Market Vendor** (agri/goods reseller) | Trader — buys wholesale, sells daily | Low-Medium — feature phone or smartphone | Price volatility; cash-only; no financial history for banks |
| **Service Business Owner** (salon, mechanic) | Owner/manager — schedules, invoices, parts | Medium — smartphone + some apps | Manual booking and billing; hard to track receivables; cash leakage |
| **Accountant / Bookkeeper** | External or in-house finance | High — Excel/accounting software | Spends hours re-entering data from client paper records; no real-time visibility |
| **SME Finance Manager / CFO** | Finance/operations (10–50 person SME) | High — ERP or advanced spreadsheets | Siloed data; slow report generation; no single dashboard |
| **Procurement / Inventory Manager** | Stock controller | Medium — POS or spreadsheets | Manual stock counts; no reorder alerts; supplier invoices disconnected from sales |
| **SACCO / Cooperative Manager** | Group administrator | Low-Medium — smartphone or basic PC | Member dues tracked on paper; no audit trail; can't generate group financial reports |

---

### Value Delivered

- **Time savings** — Automated bookkeeping and invoicing saves owners an estimated 5–10 hours per week on admin.
- **Inventory efficiency** — Reorder alerts and real-time stock tracking can reduce stockouts and overstock by ~20%.
- **Loan readiness** — Organized financial records help businesses overcome the "lack of information" barrier that blocks 80%+ of Kenyan SME loan applications.
- **Cost visibility** — Real-time dashboards enable earlier detection of cash gaps and reduce late fees.
- **Tax compliance** — Automated reminders and calculations reduce the risk of penalties.
- **Customer retention** — Centralized customer tracking supports repeat-sale targeting.

---

### Success Metrics

| Metric | Target | How to Measure |
|---|---|---|
| User sign-ups | 50 in Month 1 | Analytics dashboard |
| Active retained users | 40 by end of Month 1 | Analytics dashboard |
| Page load time | < 2 s | Lighthouse score |
| AI recommendations generated | 20 in Month 1 | Analytics dashboard |
| Users reporting cash-flow improvement | 30 by end of Month 1 | In-app feedback |
| Loan applications assisted | 10 by Month 2 | User feedback survey |
| User-reported tax compliance improvement | > 75% | In-app feedback |
| User-reported cost reduction | > 15% | In-app feedback |

---

### Explicitly Out of Scope

The following will **never** be part of this product:

- Directly disbursing or applying for loans on behalf of users
- Filing taxes directly with KRA or any other authority
- Sharing customer data with lenders or third parties without explicit user consent

---

## Step 2 — User Stories

### User Roles

| Role | Description | Primary Goal |
|---|---|---|
| **Business Owner / Admin** | Registers the business; full access | Oversee all business data and settings |
| **Manager** | Manages staff, stock, and reports | Daily operational oversight |
| **Cashier / Sales Attendant** | Records sales and issues receipts | Fast, accurate point-of-sale entry |
| **Accountant / Bookkeeper** | Reviews finances, generates reports | Accurate, exportable financial data |
| **SACCO Manager** | Manages cooperative finances | Member records, contributions, loans |
| **Platform Super-Admin** | Manages OptiBiz platform itself | User and subscription oversight |

---

### User Stories (Prioritised)

| # | As a … | I want to … | So that … | Priority |
|---|---|---|---|---|
| 1 | Informal Retail Vendor | record a sale instantly on my phone (item + amount) | my daily sales total stays accurate | High |
| 2 | Informal Retail Vendor | see a low-stock alert when an item falls below threshold | I never run out of popular items | High |
| 3 | Informal Retail Vendor | log a purchase expense (stock restock, rent) | I get an accurate profit figure (sales minus expenses) | Medium |
| 4 | Informal Retail Vendor | view a daily sales and expense summary | I can confirm my cash matches the records | Medium |
| 5 | Informal Retail Vendor | back up my data to the cloud | records survive a lost or broken phone | Low |
| 6 | Small Shop Owner | record sales by payment mode (cash, M-Pesa, card) | all payments reconcile into one view | High |
| 7 | Small Shop Owner | manage inventory by category and see totals per category | I can reorder best-sellers and avoid overstock | High |
| 8 | Small Shop Owner | export a weekly profit-and-loss report as PDF | I can share it with a bank for a loan application | Medium |
| 9 | Small Shop Owner | bulk-update prices or apply a discount | I respond to market changes in one action | Low |
| 10 | Restaurant Operator | log orders and auto-decrement ingredient stock | I prevent ingredient stockouts | High |
| 11 | Restaurant Operator | split a bill or apply a discount/tax on an invoice | customers receive correct charges | Medium |
| 12 | Restaurant Operator | review daily food waste versus sales | I identify waste and reduce food costs | Medium |
| 13 | Small Manufacturer | record raw-material inputs and work-in-progress | I calculate precise cost per item | High |
| 14 | Small Manufacturer | convert raw materials into finished-goods inventory | I always know available stock before fulfilling orders | Medium |
| 15 | Small Manufacturer | issue a digital invoice when an order is complete | I reduce billing errors and get paid faster | High |
| 16 | Small Manufacturer | view a monthly sales-vs-production report | I make data-driven pricing decisions | Medium |
| 17 | Market Vendor | tally the day's sales quickly (entry or barcode scan) | my cash total matches the app records | High |
| 18 | Market Vendor | record mobile money payments in the app | I can serve customers who don't carry cash | High |
| 19 | Market Vendor | see alerts for best-selling items based on past data | I know what to prioritise when restocking | Low |
| 20 | Service Business Owner | create and manage service bookings | I organise my day and reduce no-shows | High |
| 21 | Service Business Owner | record service charges and parts used per job | I ensure complete billing and know job profitability | High |
| 22 | Service Business Owner | send automated invoice reminders to clients | clients pay faster and I reduce outstanding balances | Medium |
| 23 | Accountant / Bookkeeper | import transactions from M-Pesa, bank feeds, or receipt uploads | I save hours of manual re-entry | High |
| 24 | Accountant / Bookkeeper | generate client-wise monthly financial statements (P&L, balance sheet) | I deliver audit-ready reports to clients | High |
| 25 | Accountant / Bookkeeper | flag duplicate invoices or unusually large expenses | I catch errors and potential fraud early | Medium |
| 26 | Finance Manager / CFO | see a consolidated dashboard across all branches/departments | I monitor business health at a glance | High |
| 27 | Finance Manager / CFO | run a 3-month cashflow forecast | I plan ahead and avoid funding gaps | High |
| 28 | Finance Manager / CFO | compare budget versus actual spending | I control costs and explain variances to leadership | Medium |
| 29 | Inventory Manager | receive new stock using a mobile barcode scanner | inventory updates instantly without manual entry | High |
| 30 | Inventory Manager | auto-generate a purchase order when stock hits reorder level | I avoid stockouts without watching every item manually | High |
| 31 | Inventory Manager | transfer stock between branches in the app | I track inventory accurately across locations | Medium |
| 32 | SACCO Manager | record each member's contribution and account balance | member records are always transparent and auditable | High |
| 33 | SACCO Manager | disburse a loan and schedule repayments | I track every loan and avoid overdue balances | High |
| 34 | SACCO Manager | generate a quarterly financial report for members | members receive clear summaries of savings and group finances | Medium |
| 35 | SACCO Manager | send automated reminders before contribution due dates | on-time payment rates improve | Low |

---

## Step 3 — Define the MVP

### Core Hypotheses

| Hypothesis | Why It Matters |
|---|---|
| SME owners prefer mobile-first tools | Most operate primarily from phones |
| Simplicity beats feature richness | Existing systems are too complex for informal users |
| Easy onboarding unlocks digitisation | Low digital literacy is the main adoption barrier |
| Real-time visibility improves decisions | This is the core value proposition |
| Clean financial records unlock credit | Strong and proven incentive for adoption |
| SACCOs need lightweight operational tools | Large, underserved segment |
| Affordable SaaS pricing converts if ROI is clear | Monetisation validation target |

---

### MVP Features (Must Have for Launch)

| Feature | Why It's Essential | Effort |
|---|---|---|
| Business registration + user auth | Everything else depends on identity and multi-tenancy | M |
| Product / inventory management (CRUD) | Stock is the foundation of every persona's workflow | M |
| Sales recording (single and multi-item) | Core revenue-tracking action | L |
| Expense logging | Required for any profit calculation | S |
| Dashboard with KPI cards | Delivers immediate visible value on first login | M |
| Low-stock alerts | Prevents the #1 operational problem across personas | S |
| Basic reports (daily/weekly P&L, exportable PDF) | Enables loan applications and tax prep | M |
| Customer management (basic CRM) | Supports invoicing and follow-up | S |
| SACCO module (members, contributions, loans) | Validates a key underserved segment | L |
| Role-based access (Owner, Manager, Cashier) | Required for multi-user businesses | S |
| Responsive mobile-first UI | Most users are on phones | M |

---

### Deferred to V2+

| Feature | Why It Waits |
|---|---|
| AI Business Advisor | Needs historical usage data first |
| Loan Scoring Engine | Requires months of transaction history |
| M-Pesa Auto-Reconciliation | Complex API integration — not needed to validate core value |
| Advanced Analytics / Data Warehouse | Basic reports satisfy MVP; deepen after product-market fit |
| Payroll & HR Management | Different problem space from core tracking |
| Multi-Branch Management | Most early users are single-location |
| WhatsApp / SMS Notifications | Email and in-app alerts are sufficient initially |
| Receipt OCR Scanning | Expensive and technically complex |
| Offline Sync | Valuable but significantly increases complexity |
| Native Mobile Apps (iOS / Android) | Responsive web app first |
| Multi-Currency Support | Focus on Kenya first |
| E-commerce / Marketplace Integration | Separate product problem |
| Banking Direct Integrations | Regulatory-heavy — post-PMF |
| Predictive Inventory Forecasting | Requires historical data |
| Customer Loyalty Programme | Nice-to-have, not core |
| API for Third Parties | Wait until platform adoption grows |
