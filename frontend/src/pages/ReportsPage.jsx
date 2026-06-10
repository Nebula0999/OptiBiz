import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/Loading';
import { formatCurrency, formatDate } from '@/lib/utils';
import { BarChart3, Download } from 'lucide-react';
import { reportsAPI } from '@/lib/api';

export function ReportsPage() {
  const [reportType, setReportType] = useState('sales');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'expenses', label: 'Expenses Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'profit-loss', label: 'Profit & Loss' },
  ];

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const params = {};
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;

      let response;
      if (reportType === 'sales') {
        response = await reportsAPI.getSales(params);
      } else if (reportType === 'expenses') {
        response = await reportsAPI.getExpenses(params);
      } else if (reportType === 'inventory') {
        response = await reportsAPI.getInventory(params);
      } else if (reportType === 'profit-loss') {
        response = await reportsAPI.getProfitLoss(params);
      }

      setReportData(response.data);
    } catch (error) {
      alert('Error generating report: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const params = {};
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;

      const response = await reportsAPI.generatePDF(reportType, params);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}-report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
    } catch (error) {
      alert('Error exporting PDF: ' + error.message);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate financial and operational reports</p>
      </div>

      {/* Report Generator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateReport} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Report Type"
              options={reportTypes}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            />

            <Input
              label="From Date"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />

            <Input
              label="To Date"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />

            <div className="flex items-end gap-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Generating...
                  </>
                ) : (
                  <>
                    <BarChart3 size={18} />
                    Generate
                  </>
                )}
              </Button>

              {reportData && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleExportPDF}
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  PDF
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Report Results */}
      {reportData && (
        <Card>
          <CardHeader>
            <CardTitle>
              {reportTypes.find((r) => r.value === reportType)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reportType === 'profit-loss' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(reportData.total_revenue)}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(reportData.total_expenses)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(
                        reportData.total_revenue - reportData.total_expenses
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Item</th>
                      <th className="px-4 py-2 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.items?.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2 text-right">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold">
                    <tr>
                      <td className="px-4 py-2">Total</td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(reportData.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!reportData && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select report type and click generate to view data</p>
            </div>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
}
