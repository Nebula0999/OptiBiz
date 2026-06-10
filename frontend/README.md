# OptiBiz Frontend

Modern React frontend for OptiBiz business management SaaS platform.

## Features

- 🎨 **Modern UI** - Built with React 18, Tailwind CSS, and Radix UI
- 🔐 **Authentication** - JWT-based auth with automatic token refresh
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🚀 **Fast Build** - Vite for lightning-fast development
- 🎯 **Type Safe** - TypeScript support ready
- 📊 **Data Management** - React Query for server state + Redux for global state
- 🔄 **Real-time** - Support for WebSocket integration with Django Channels

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - Global state management
- **React Query** - Server state management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   ├── hooks/               # Custom hooks
│   ├── lib/
│   │   ├── api.js           # API endpoints
│   │   ├── api-client.js    # Axios config
│   │   └── utils.js         # Utility functions
│   ├── store/               # Redux store
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Pages

### Public Pages
- **Login** - User authentication
- **Register** - New account creation

### App Pages (Protected)
- **Dashboard** - Business overview with KPIs
- **Products** - Product catalogue management
- **Sales** - Sales transactions and POS
- **Expenses** - Expense tracking
- **Inventory** - Stock level monitoring
- **Customers** - Customer database
- **SACCO** - Cooperative savings and loans
- **Reports** - Financial and operational reports
- **Settings** - Account and business settings

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8000/api
```

## API Integration

All API calls are managed through `src/lib/api.js` with endpoints for:
- Authentication
- Products & Categories
- Sales & Transactions
- Expenses
- Inventory
- Customers
- SACCO (Members, Contributions, Loans)
- Reports
- Dashboard
- Notifications

## Redux Store

Global state is managed with Redux Toolkit at `src/store/`:

- **authSlice** - User authentication state

## React Query Hooks

Custom hooks in `src/hooks/index.js` provide convenient access to:
- Authentication (login, register)
- Products (CRUD operations)
- Sales (list, create)
- Expenses (CRUD)
- Inventory (tracking)
- Customers (management)
- SACCO (members, contributions, loans)
- Dashboard (statistics)
- Notifications

## Styling

Tailwind CSS is configured with custom colors:
- Primary color: Sky Blue (#0ea5e9)
- Fully responsive design
- Dark mode ready

## Key Features

### Authentication Flow
1. User logs in or registers
2. JWT tokens stored in localStorage
3. Authorization header added to all requests
4. Automatic token refresh on 401 response

### Responsive Navigation
- Sidebar for desktop
- Mobile menu toggle
- Active route highlighting

### Data Validation
- Form validation with error messages
- Input field error states
- Type validation using schemas

### Loading States
- Loading spinners on async operations
- Optimistic UI updates with React Query
- Error handling and user feedback

## Development Tips

- Use `useProducts()`, `useSales()` etc. hooks instead of direct API calls
- Components auto-refetch data after mutations
- All mutations invalidate related cache
- Toast notifications for user feedback (ready to implement)

## Deployment

Ready to deploy on:
- **Vercel** - Recommended (zero-config)
- **Netlify** - Drop-in deploy
- **Self-hosted** - Docker or traditional server

See deployment documentation in root `README.md`.

## Contributing

1. Follow the component structure
2. Use TypeScript when adding new features
3. Keep components small and reusable
4. Use existing UI components
5. Follow Tailwind CSS conventions

## License

MIT
