import { useState } from 'react';
import { useSelector } from 'react-redux';
import { businessAPI } from '@/lib/api';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/Loading';

export function SettingsPage() {
  const { user, business } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    business_name: business?.business_name || '',
    industry: business?.industry || '',
    currency: business?.currency || 'KES',
    tax_pin: business?.tax_pin || '',
    registration_no: business?.registration_no || '',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await businessAPI.updateBusiness(business?.id, formData);
      setMessage('Settings saved successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and business settings</p>
      </div>

      {message && (
        <Alert
          variant={message.includes('Error') ? 'error' : 'success'}
          className="mb-6"
        >
          {message}
        </Alert>
      )}

      {/* Profile Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Full Name</p>
              <p className="text-lg text-gray-900">{user?.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-lg text-gray-900">{user?.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-lg text-gray-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Settings */}
      <Card className="mb-8">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Business Settings</CardTitle>
          <Button
            variant={isEditing ? 'outline' : 'primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Business Name"
                value={formData.business_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    business_name: e.target.value,
                  })
                }
              />

              <Input
                label="Industry"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
              />

              <Select
                label="Currency"
                options={[
                  { value: 'KES', label: 'KES (Kenya Shilling)' },
                  { value: 'USD', label: 'USD (US Dollar)' },
                  { value: 'UGX', label: 'UGX (Uganda Shilling)' },
                  { value: 'TZS', label: 'TZS (Tanzania Shilling)' },
                ]}
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              />

              <Input
                label="Tax PIN"
                value={formData.tax_pin}
                onChange={(e) =>
                  setFormData({ ...formData, tax_pin: e.target.value })
                }
              />

              <Input
                label="Registration Number"
                value={formData.registration_no}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_no: e.target.value,
                  })
                }
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Business Name</p>
                  <p className="text-lg text-gray-900">
                    {formData.business_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Industry</p>
                  <p className="text-lg text-gray-900">{formData.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Currency</p>
                  <p className="text-lg text-gray-900">{formData.currency}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tax PIN</p>
                  <p className="text-lg text-gray-900">
                    {formData.tax_pin || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Registration Number
                  </p>
                  <p className="text-lg text-gray-900">
                    {formData.registration_no || 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Section */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Plan</p>
              <p className="text-lg text-gray-900 capitalize">
                {business?.subscription_plan || 'Free'}
              </p>
            </div>
            <Button variant="primary">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
