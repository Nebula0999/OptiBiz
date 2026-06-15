import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCreateBusiness } from '@/hooks';
import { setUser } from '@/store/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/Loading';


export function RegisterPageTwo() {
  const [formData, setFormData] = useState({
        name: "",
        industry: "",
        registration_no: "",
        tax_pin: "",
        country: "",
        currency: "",
        is_active: true
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerMutation = useCreateBusiness();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Business name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.registration_no) newErrors.registration_no = 'Registration number is required';
    if (!formData.tax_pin) newErrors.tax_pin = 'Tax PIN is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.currency) newErrors.currency = 'Currency is required';

     setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const apiPayload = {
      business: {
        name: formData.name,
        industry: formData.industry,
        registration_no: formData.registration_no,
        tax_pin: formData.tax_pin,
        country: formData.country,
        currency: formData.currency,
        is_active: true
      },
      role: "owner",
    };

    registerMutation.mutate(apiPayload, {
      onSuccess: (res) => {
        const data = res.data || res;
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        
        if (data.user) {
          dispatch(setUser(data.user));
        }
        
        navigate('/app/dashboard');
      },
      onError: (error) => {
        const data = error.response?.data;
        setErrors(data || { general: 'Registration failed' });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">OptiBiz</h1>
          <p className="text-primary-200">
            Business Management for SMEs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create Business
          </h2>

          {errors.general && (
            <Alert variant="error" className="mb-6">
              {errors.general}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Business Name"
              placeholder="My Shop"
              name="business_name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
              error={errors.name}
              required
            />

            <Input
              label="Industry"
              placeholder="Retail, Food, Services, etc"
              name="industry"
              value={formData.industry}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  industry: e.target.value
                }))
              }
              error={errors.industry}
              required
            />

            <Input
              label="Registration Number"
              placeholder="e.g., 12345678"
              name="registration_no"
              value={formData.registration_no}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registration_no: e.target.value
                }))
              }
              error={errors.registration_no}
              required
            />

            <Input
              label="Tax PIN"
              placeholder="e.g., A123456789B"
              name="tax_pin"
              value={formData.tax_pin}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tax_pin: e.target.value
                }))
              }
              error={errors.tax_pin}
              required
            />

            <Input
              label="Country"
              placeholder="e.g., Kenya"
              name="country"
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  country: e.target.value
                }))
              }
              error={errors.country}
              required
            />

            <Input
              label="Currency"
              placeholder="e.g., KES"
              name="currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currency: e.target.value
                }))
              }
              error={errors.currency}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w  -full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2 " />
                  Creating Business...s
                </>
              ) : (
                'Create Business'
              )}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
