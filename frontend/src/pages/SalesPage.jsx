import { useState } from 'react';
import { useSales, useCreateSale, useProducts, useCustomers } from '@/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable } from '@/components/ui/Table';
import { LoadingSpinner } from '@/components/ui/Loading';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus } from 'lucide-react';

export function SalesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    quantity: '1',
    payment_method: 'cash',
    customer: '',
  });

  const { data: salesData, isLoading } = useSales();
  const { data: productsData } = useProducts();
  const { data: customersData } = useCustomers();
  const createSaleMutation = useCreateSale();

  const sales = salesData?.results || [];
  const products = productsData?.results || [];
  const customers = customersData?.results || [];

  const handleAddSale = async (e) => {
    e.preventDefault();

    if (!formData.product || !formData.quantity) {
      alert('Please select a product and quantity');
      return;
    }

    createSaleMutation.mutate(
      {
        product_id: parseInt(formData.product),
        quantity: parseInt(formData.quantity),
        payment_method: formData.payment_method,
        customer_id: formData.customer ? parseInt(formData.customer) : null,
      },
      {
        onSuccess: () => {
          setFormData({
            product: '',
            quantity: '1',
            payment_method: 'cash',
            customer: '',
          });
          setIsAdding(false);
        },
      }
    );
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'product_name', label: 'Product' },
    { key: 'quantity', label: 'Qty' },
    { key: 'unit_price', label: 'Price', render: (val) => formatCurrency(val) },
    { key: 'total_amount', label: 'Total', render: (val) => formatCurrency(val) },
    { key: 'payment_method', label: 'Method' },
    { key: 'sale_date', label: 'Date', render: (val) => formatDate(val) },
  ];

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-600">Record and manage your sales</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          New Sale
        </Button>
      </div>

      {/* Add Sale Form */}
      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Record New Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSale} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Product"
                options={products.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                required
              />

              <Input
                label="Quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />

              <Select
                label="Customer (Optional)"
                options={[
                  { value: '', label: 'Walk-in Customer' },
                  ...customers.map((c) => ({
                    value: c.id,
                    label: c.name,
                  })),
                ]}
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
              />

              <Select
                label="Payment Method"
                options={[
                  { value: 'cash', label: 'Cash' },
                  { value: 'mpesa', label: 'M-Pesa' },
                  { value: 'card', label: 'Card' },
                  { value: 'credit', label: 'Credit' },
                ]}
                value={formData.payment_method}
                onChange={(e) =>
                  setFormData({ ...formData, payment_method: e.target.value })
                }
              />

              <div className="md:col-span-2 flex gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createSaleMutation.isPending}
                >
                  {createSaleMutation.isPending ? 'Recording...' : 'Record Sale'}
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

      {/* Sales Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : sales.length > 0 ? (
            <DataTable columns={columns} data={sales} />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No sales recorded yet. Create your first sale!
            </p>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
