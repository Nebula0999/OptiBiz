import { useInventory, useLowStockAlerts } from '@/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/Table';
import { LoadingSpinner } from '@/components/ui/Loading';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export function InventoryPage() {
  const { data: inventoryData, isLoading } = useInventory();
  const { data: alertsData } = useLowStockAlerts();

  const inventory = inventoryData?.results || [];
  const alerts = alertsData?.results || [];

  const columns = [
    { key: 'product_name', label: 'Product' },
    { key: 'quantity', label: 'Stock' },
    { key: 'reorder_level', label: 'Min Level' },
    {
      key: 'quantity',
      label: 'Status',
      render: (quantity, row) => {
        const isLow = quantity <= row.reorder_level;
        return (
          <Badge variant={isLow ? 'warning' : 'success'} size="sm">
            {isLow ? 'Low Stock' : 'In Stock'}
          </Badge>
        );
      },
    },
    { key: 'unit_cost', label: 'Cost', render: (val) => formatCurrency(val) },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-600">Monitor your stock levels</p>
      </div>

      {/* Low Stock Alerts */}
      {alerts.length > 0 && (
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-yellow-900 mb-4">
              ⚠️ {alerts.length} products have low stock
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-gray-900">{alert.product_name}</p>
                  <p className="text-sm text-gray-600">
                    {alert.current_stock} / {alert.reorder_level} units
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : inventory.length > 0 ? (
            <DataTable columns={columns} data={inventory} />
          ) : (
            <p className="text-gray-500 text-center py-8">
              No inventory data. Add products first!
            </p>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
