# Quick Start Guide

## Prerequisites

- Node.js >= 20.x
- npm >= 10.x

## Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `.env` file in the frontend directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Optional: For production build
# VITE_API_URL=https://your-production-api.com/api
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Project Structure Overview

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, Card, etc.)
│   ├── layout/          # Layout components (Sidebar, Header, MainLayout)
│   └── ProtectedRoute.jsx
├── pages/               # Full page components
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProductsPage.jsx
│   ├── SalesPage.jsx
│   ├── ExpensesPage.jsx
│   ├── InventoryPage.jsx
│   ├── CustomersPage.jsx
│   ├── SaccoPage.jsx
│   ├── ReportsPage.jsx
│   ├── SettingsPage.jsx
│   └── LandingPage.jsx
├── hooks/               # Custom React hooks for API calls
├── lib/
│   ├── api.js           # API endpoint definitions
│   ├── api-client.js    # Axios configuration with JWT auth
│   └── utils.js         # Utility functions
├── store/               # Redux store configuration
├── App.jsx              # Main app router
└── main.jsx             # Entry point
```

## Key Features Included

✅ **Authentication**
- Login/Register pages with JWT token handling
- Automatic token refresh
- Protected routes

✅ **Dashboard**
- KPI cards (Revenue, Expenses, Profit)
- Recent sales table
- Low stock alerts

✅ **Products Management**
- Add, view, delete products
- Category management
- SKU and pricing

✅ **Sales Tracking**
- Record sales transactions
- Multiple payment methods
- Customer association

✅ **Expense Management**
- Categorized expense tracking
- Date filtering
- Expense totals

✅ **Inventory Control**
- Real-time stock monitoring
- Low stock alerts
- Reorder levels

✅ **Customer Management**
- Customer database
- Contact information
- Transaction history

✅ **SACCO Features**
- Member management
- Contribution tracking
- Loan management
- Repayment schedules

✅ **Reports**
- Sales reports
- Expense analysis
- Inventory reports
- Profit & Loss
- PDF export

✅ **Settings**
- Business information
- User profile
- Currency and preferences

## API Integration

All API calls are managed through `src/lib/api.js` and custom hooks in `src/hooks/`.

### Making API Calls

```javascript
// Using hooks (recommended)
import { useProducts } from '@/hooks';

function MyComponent() {
  const { data: products, isLoading } = useProducts();
  // ...
}
```

### Adding New API Endpoints

1. Add to `src/lib/api.js`:
```javascript
export const myAPI = {
  getAll: (params) => apiClient.get('/my-endpoint/', { params }),
  create: (data) => apiClient.post('/my-endpoint/', data),
};
```

2. Create hook in `src/hooks/index.js`:
```javascript
export function useMyResource(params = {}) {
  return useQuery({
    queryKey: ['myResource', params],
    queryFn: () => myAPI.getAll(params),
  });
}
```

## State Management

### Redux (Global State)
- Authentication state in `src/store/authSlice.js`
- Add more slices as needed

### React Query (Server State)
- Automatic caching
- Background refetching
- Optimistic updates on mutations

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom colors** in `tailwind.config.js`
- **Responsive design** with mobile-first approach
- **Dark mode** ready (extend `tailwind.config.js`)

## Component Examples

### Button Component
```jsx
<Button variant="primary" size="md">
  Click me
</Button>
```

### Form Input
```jsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  required
/>
```

### Card Component
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Debugging

### Redux DevTools
Install Redux DevTools browser extension to debug Redux state

### React Query DevTools
Included in development - shows cache state and queries

### Network Tab
Check browser DevTools Network tab to see API calls

## Common Tasks

### Add a New Page
1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

### Add a New API Endpoint
1. Define in `src/lib/api.js`
2. Create hook in `src/hooks/index.js`
3. Use hook in component

### Style a Component
1. Use Tailwind CSS classes
2. For complex styling, use `src/lib/utils.js` cn() function
3. Check `tailwind.config.js` for colors

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy 'dist' folder to Netlify
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### API calls not working
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check browser console for CORS errors
- Verify JWT token is being sent

### Styling not applying
- Clear `.next` or `dist` folder
- Run `npm run dev` again
- Check Tailwind CSS is properly configured

### Build errors
- Delete `node_modules` and `npm install`
- Check for TypeScript errors (if using TS)
- Review console output for specific errors

## Next Steps

1. ✅ Setup is complete! Run `npm run dev`
2. Test login with your Django backend
3. Add your custom branding
4. Customize colors in `tailwind.config.js`
5. Add analytics tracking
6. Deploy to Vercel or your hosting

## Support & Resources

- Tailwind CSS: https://tailwindcss.com/docs
- React Documentation: https://react.dev
- React Router: https://reactrouter.com
- React Query: https://tanstack.com/query
- Axios: https://axios-http.com

---

**Happy building! 🚀**
