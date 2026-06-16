import { useState } from 'react';
import { useCustomers, useCreateCustomer } from '@/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { DataTable } from '@/components/ui/Table';
import { LoadingSpinner } from '@/components/ui/Loading';
import { formatCurrency } from '@/lib/utils';
import { Plus } from 'lucide-react';

export function CustomersPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    balance: '',
    loyalty_points: '',
  });

  function getList(data) {
    const payload = data?.data || data;
    if (Array.isArray(payload)) return payload;
    return payload?.results || [];
}

  const { data: customersData, isLoading } = useCustomers();
  const createCustomerMutation = useCreateCustomer();

  const customers = getList(customersData);

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Please enter customer name');
      return;
    }

    createCustomerMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', phone: '', email: '', balance: '', loyalty_points: '' });
        setIsAdding(false);
      },
    });
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'balance', label: 'Balance', render: (val) => formatCurrency(val) },
    { key: 'loyalty_points', label: 'Points' },
  ];

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Customer
        </Button>
      </div>

      {/* Add Customer Form */}
      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                placeholder="Customer name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <Input
                label="Phone"
                placeholder="+254712345678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <Input
                label="Email"
                type="email"
                placeholder="customer@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                label="Balance"
                type="number"
                placeholder="0.00"
                value={formData.balance}
                onChange={(e) =>
                  setFormData({ ...formData, balance: e.target.value })
                }
              />

              <Input
                label="Loyalty Points"
                type="number"
                placeholder="0"
                value={formData.loyalty_points}
                onChange={(e) =>
                  setFormData({ ...formData, loyalty_points: e.target.value })
                }
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createCustomerMutation.isPending}
                >
                  {createCustomerMutation.isPending ? 'Adding...' : 'Add Customer'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Customers Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : customers.length > 0 ? (
            <DataTable columns={columns} data={customers} />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No customers yet. Add your first customer!
            </p>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
