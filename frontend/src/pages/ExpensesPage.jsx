import { useState } from 'react';
import { useExpenses, useCreateExpense } from '@/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { DataTable } from '@/components/ui/Table';
import { LoadingSpinner } from '@/components/ui/Loading';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus } from 'lucide-react';

const EXPENSE_CATEGORIES = [
  { value: 'rent', label: 'Rent' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'salaries', label: 'Salaries' },
  { value: 'supplies', label: 'Supplies' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'transport', label: 'Transport' },
  { value: 'other', label: 'Other' },
];

export function ExpensesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
  });

  const { data: expensesData, isLoading } = useExpenses();
  const createExpenseMutation = useCreateExpense();

  const expenses = expensesData?.results || [];

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    createExpenseMutation.mutate(
      {
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
      },
      {
        onSuccess: () => {
          setFormData({ category: '', amount: '', description: '' });
          setIsAdding(false);
        },
      }
    );
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val) },
    { key: 'description', label: 'Description' },
    { key: 'expense_date', label: 'Date', render: (val) => formatDate(val) },
  ];

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600">Track your business expenses</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add Expense
        </Button>
      </div>

      {/* Add Expense Form */}
      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Record New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={EXPENSE_CATEGORIES}
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />

              <Input
                label="Amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Description (Optional)"
                  placeholder="Details about this expense"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createExpenseMutation.isPending}
                >
                  {createExpenseMutation.isPending ? 'Adding...' : 'Add Expense'}
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

      {/* Expenses Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : expenses.length > 0 ? (
            <DataTable columns={columns} data={expenses} />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No expenses recorded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
