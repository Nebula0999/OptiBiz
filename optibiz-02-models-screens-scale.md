# OptiBiz — Project Blueprint
**Part 2 of 3: Data Models, Screens & Scalability**

---

## Step 4 — Data Models

> **Tip:** Get the entity relationships right before writing code. A poor schema is the most expensive mistake to fix later.

### Core Entities

| Entity | Key Fields | Relationships | Notes |
|---|---|---|---|
| **User** | id, full_name, email, phone, password_hash, role_id, business_id, status, last_login | Belongs to Business; has one Role; creates Sales, Expenses, Notifications | Central auth and identity entity |
| **Role** | id, role_name, permissions (JSON), description | Has many Users | Roles: Owner, Manager, Cashier, Accountant, SACCO Admin |
| **Business** | id, business_name, industry, registration_no, tax_pin, country, currency, subscription_plan_id | Has many Users, Branches, Products, Customers, Suppliers | Multi-tenant anchor — every record belongs to a Business |
| **Branch** | id, business_id, name, location, phone | Belongs to Business; has Inventory, Sales | Supports future multi-location SMEs |
| **SubscriptionPlan** | id, plan_name, price, billing_cycle, features (JSON) | Has many Businesses | Defines SaaS tiers (Free, Starter, Pro) |
| **Subscription** | id, business_id, plan_id, start_date, end_date, payment_status | Belongs to Business and Plan | Tracks billing lifecycle |
| **Customer** | id, business_id, name, phone, email, balance, loyalty_points | Has many Sales, Invoices, Payments | Basic CRM |
| **Supplier** | id, business_id, name, contact_person, phone, email | Linked to Products and PurchaseOrders | Supplier management |
| **Category** | id, business_id, name | Has many Products | Product organisation |
| **Product** | id, business_id, category_id, name, sku, buying_price, selling_price, stock_qty | Belongs to Category; linked to Inventory, SaleItems, PurchaseItems | Central inventory entity |
| **Inventory** | id, product_id, branch_id, quantity_available, reorder_level | Belongs to Product and Branch | Real-time stock tracking |
| **StockMovement** | id, product_id, type (in/out/transfer), quantity, source_branch_id, dest_branch_id, created_by, created_at | Belongs to Product and User | Audit trail for every stock change |
| **Sale** | id, business_id, branch_id, customer_id (nullable), total_amount, payment_method, sale_date, created_by | Has many SaleItems and Payments | Core POS / revenue record |
| **SaleItem** | id, sale_id, product_id, quantity, unit_price, subtotal | Belongs to Sale and Product | Line-item breakdown |
| **Expense** | id, business_id, category, amount, description, expense_date, created_by | Belongs to Business and User | Operational spending tracker |
| **PurchaseOrder** | id, business_id, supplier_id, total_cost, status, order_date | Has many PurchaseItems | Procurement workflow |
| **PurchaseItem** | id, purchase_order_id, product_id, quantity, unit_cost | Belongs to PurchaseOrder | Detailed procurement line items |
| **Invoice** | id, business_id, customer_id, invoice_no, due_date, total_amount, status | Linked to Payments | Accounts receivable |
| **Payment** | id, business_id, invoice_id (nullable), sale_id (nullable), amount, method, date, reference_code | Belongs to Invoice or Sale | Supports M-Pesa, cash, card, bank transfer |
| **CashflowRecord** | id, business_id, inflow, outflow, source, date | Derived from Sales and Expenses | Cashflow analysis and forecasting |
| **TaxRecord** | id, business_id, tax_type, amount_due, due_date, status | Linked to Reports | VAT / PAYE / KRA reminders |
| **Notification** | id, user_id, type, message, status (read/unread), sent_at | Belongs to User | Alerts, reminders, system messages |
| **Report** | id, business_id, report_type, generated_by, generated_at, file_url | Aggregates Sales, Expenses, Inventory | Downloadable financial and operational reports |
| **ActivityLog** | id, user_id, action, entity_type, entity_id, timestamp | Belongs to User | Security audit trail |
| **Receipt** | id, sale_id, receipt_number, generated_at, qr_code | Belongs to Sale | Printable / digital receipts |
| **Reminder** | id, business_id, title, reminder_type, due_date, recurrence | Sends Notifications | Tax and payment due-date reminders |
| **DocumentUpload** | id, business_id, document_type, file_url, uploaded_by | Linked to Loans, Tax, Verification | Receipts, licences, statements |
| **SACCOMember** | id, business_id, name, phone, email, membership_no, join_date, status | Has many Contributions and Loans | SACCO member registry |
| **Contribution** | id, member_id, business_id, amount, date, payment_method, notes | Belongs to SACCOMember | Savings and dues tracking |
| **Loan** | id, member_id, business_id, amount, interest_rate, disbursement_date, due_date, status | Has many LoanRepayments | Loan lifecycle tracking |
| **LoanRepayment** | id, loan_id, amount_paid, payment_date, payment_method, notes | Belongs to Loan | Repayment schedule tracking |
| **FeatureFlag** | id, feature_name, enabled_for_plan | Linked to SubscriptionPlan | Gradual feature rollout |

> **MVP scope:** Build and ship Business, User, Role, Product, Category, Inventory, StockMovement, Sale, SaleItem, Expense, Customer, Payment, Notification, Report, Receipt, SACCOMember, Contribution, Loan, LoanRepayment. The remaining entities can be introduced in later phases.

---

### Entity Relationship Summary

```
Business
├── Users (via Role)
├── Branches
├── Products → Category
│   └── Inventory → Branch
│       └── StockMovements
├── Customers
├── Suppliers
├── Sales → SaleItems → Product
│   └── Payments
├── Expenses
├── PurchaseOrders → PurchaseItems → Product
├── Invoices → Payments
├── TaxRecords
├── Reports
├── Notifications
├── Reminders
├── SACCO
│   ├── Members
│   │   ├── Contributions
│   │   └── Loans → LoanRepayments
└── ActivityLogs
```

---

## Step 5 — Screens & User Flows

> **Tip:** Wireframes don't need to be polished — they need to communicate layout and flow. Use Figma, Excalidraw, or pencil-and-paper. Links can be added here once drawn.

### Key Screens

| Screen | Purpose | Key Elements | Wireframe |
|---|---|---|---|
| **Landing Page** | Explain value proposition and acquire users | Hero, CTA, benefits, pricing preview, testimonials | — |
| **Sign Up** | Business registration | Business name, email, phone, password, CTA | — |
| **Login** | Authentication | Email/phone, password, forgot password link | — |
| **Forgot Password** | Account recovery | Email field, reset link button | — |
| **Onboarding Wizard** | First-time setup (3–4 steps) | Business info, industry, currency, first products | — |
| **Dashboard** | Business overview at a glance | KPI cards (revenue, expenses, profit, stock alerts), sales chart, recent transactions | — |
| **Sales List** | Browse all transactions | Search, date filter, payment method filter, table, Add Sale button | — |
| **Create Sale** | Record a new sale | Product selector, quantity, payment method, customer (optional), submit | — |
| **Expenses List** | Browse all expenses | Table, category filter, date filter | — |
| **Add Expense** | Log a new expense | Amount, category, date, optional notes | — |
| **Products List** | Product catalogue | Table with stock qty, search, Add Product button | — |
| **Add / Edit Product** | Create or update an item | Name, SKU, category, buying price, selling price, initial stock, reorder level | — |
| **Inventory View** | Monitor stock levels | Stock table, low-stock highlights, movement history | — |
| **Customers** | Customer list | Table, search, Add Customer button | — |
| **Customer Profile** | Customer detail | Contact info, purchase history, outstanding balance | — |
| **Suppliers** | Supplier list | Table, contacts, linked products | — |
| **Reports** | Generate business reports | Report type selector (sales, expenses, stock, P&L), date range, Export PDF button | — |
| **Notifications** | Alerts and reminders | Low-stock alerts, tax due dates, payment reminders | — |
| **SACCO Dashboard** | SACCO overview | KPI cards (total savings, active loans, members), recent activity | — |
| **Members List** | SACCO member management | Table, search, Add Member | — |
| **Contributions** | Track member savings | Transaction table, member balance | — |
| **Loans** | Loan lifecycle | Loan list, status badges, repayment schedule | — |
| **Profile & Settings** | Account and business settings | Business info, users & roles, security, notifications | — |
| **Subscription & Billing** | SaaS plan management | Current plan, invoice history, Upgrade button | — |
| **Admin Dashboard** | Platform-level management (OptiBiz staff only) | User list, business accounts, subscriptions, system health | — |

---

### Must-Launch Screens (MVP Minimum)

1. Landing Page
2. Sign Up
3. Login
4. Onboarding Wizard
5. Dashboard
6. Products List + Add Product
7. Sales List + Create Sale
8. Expenses List + Add Expense
9. Inventory View
10. Reports
11. SACCO (Members, Contributions, Loans)
12. Profile & Settings

---

### Primary User Flows

**Flow 1 — SME Owner (first use)**
```
Landing Page → Sign Up → Onboarding Wizard → Add Products
→ Record First Sale → Log Expenses → View Dashboard
→ Receive Stock Alert → Generate Report → Subscribe to Paid Plan
```

**Flow 2 — Informal Business Owner (daily use)**
```
Login → Record Today's Sales → Log Today's Expenses
→ View Profit Summary → Logout
```

**Flow 3 — SACCO Manager (first use)**
```
Sign Up (SACCO type) → Add Members → Record Contributions
→ Disburse Loan → View Financial Summary → Generate Member Report
```

**Flow 4 — Sales Attendant (daily)**
```
Login → Create Sale → Issue Receipt → View Daily Sales → Logout
```

---

### Main Navigation Structure

```
Dashboard
├── Sales
├── Expenses
├── Inventory
│   └── Products
├── Customers
├── Reports
├── SACCO
│   ├── Members
│   ├── Contributions
│   └── Loans
├── Notifications
└── Settings
```

---

### Design System Notes

| Element | Decision |
|---|---|
| **Colour palette** | To be defined — suggest a clean, high-contrast primary (trust/finance feel) with a neutral base |
| **Typography** | Clear, readable sans-serif (e.g. Inter); generous font sizes for low-literacy users |
| **Component library** | Tailwind CSS + shadcn/ui (pre-built accessible components) |
| **UI tone** | Simple, friendly, actionable — no jargon; every screen should feel obvious |
| **Mobile-first** | All layouts designed for 375 px viewport first, then scaled to desktop |
| **Accessibility** | WCAG AA minimum; sufficient colour contrast for outdoor/bright-sun use |

---

## Step 6 — Scalability Plan

> **Tip:** Don't over-engineer now, but don't paint yourself into a corner. Focus on the 2–3 decisions that are hardest to reverse.

### Anticipated Scale

| Horizon | Users | Infrastructure | Estimated Cost |
|---|---|---|---|
| **Launch — Month 1** | ~100 | 1 VPS, PostgreSQL, Django single process | ~$10/mo |
| **Growth — Month 6** | ~5,000 | Load balancer, Redis cache, Celery workers | ~$60/mo |
| **Scale — Month 12** | ~50,000 | Postgres replicas, CDN, container orchestration (Docker + Render/Railway auto-scale) | ~$300/mo |
| **Expansion — Year 2** | ~200,000+ | Potential migration to django-tenants schema isolation, managed DB, S3 CDN | ~$800+/mo |

---

### Critical Architectural Decisions

| Decision | Option A | Option B | Chosen & Reason |
|---|---|---|---|
| **Multi-tenancy model** | Row-level isolation (business_id on every table) | Schema-per-tenant (django-tenants) | **Row-level for MVP** — simpler to start; migrate to schema isolation in V2 if needed |
| **Auth strategy** | JWT (stateless) | Session-based | **JWT** — scales horizontally; works well with React SPA and future mobile apps |
| **Monolith vs microservices** | Django monolith | Microservices | **Monolith first** — faster to build and debug; extract services (e.g. notifications, AI) later when justified |
| **API style** | REST (DRF) | GraphQL | **REST** — simpler, DRF is well-documented, more familiar to contributors |
| **Real-time** | Django Channels (WebSocket) | Polling | **Channels for notifications/dashboard** — low overhead for MVP scale; polling as fallback |
| **Task queue** | Celery + Redis | Django-Q | **Celery + Redis** — battle-tested, good ecosystem, required for future AI jobs |
| **File storage** | Amazon S3 | Cloudflare R2 | **Cloudflare R2 for MVP** — zero egress fees; S3-compatible API means easy switch later |

---

### V2 Roadmap (Post-MVP Ideas)

- AI Business Advisor (spending insights, demand forecasts)
- Loan Scoring Engine (creditworthiness from transaction history)
- M-Pesa Auto-Reconciliation
- Multi-Branch inventory transfers with approval workflow
- SMS / WhatsApp Notifications
- Native iOS + Android apps
- Offline-first PWA mode
- Receipt OCR scanning
- Multi-currency support (East Africa expansion)
- Banking API integrations (direct account sync)
- SACCO dividend management and governance tools
- Predictive inventory reorder suggestions
