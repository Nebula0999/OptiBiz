import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegister } from '@/hooks';
import { setUser } from '@/store/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { LoadingSpinner } from '@/components/ui/Loading';
import { validateEmail, validatePhone } from '@/lib/utils';

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    password: '', password_confirm: '',
    name: '', industry: '', registration_no: '', tax_pin: '', country: '', currency: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerMutation = useRegister();

  const set = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleStep1 = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.first_name) errs.first_name = 'First name is required';
    if (!formData.last_name) errs.last_name = 'Last name is required';
    if (!formData.email) errs.email = 'Email is required';
    else if (!validateEmail(formData.email)) errs.email = 'Invalid email format';
    if (!formData.phone) errs.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) errs.phone = 'Invalid phone format';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.password_confirm) errs.password_confirm = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name) errs.name = 'Business name is required';
    if (!formData.industry) errs.industry = 'Industry is required';
    if (!formData.registration_no) errs.registration_no = 'Registration number is required';
    if (!formData.tax_pin) errs.tax_pin = 'Tax PIN is required';
    if (!formData.country) errs.country = 'Country is required';
    if (!formData.currency) errs.currency = 'Currency is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    registerMutation.mutate(
      {
        email: formData.email, first_name: formData.first_name, last_name: formData.last_name,
        phone: formData.phone, password: formData.password,
        business_name: formData.name, industry: formData.industry,
      },
      {
        onSuccess: (res) => {
          const data = res.data || res;
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          localStorage.setItem('registration_complete', 'true');
          if (data.user) dispatch(setUser(data.user));
          navigate('/app/dashboard');
        },
        onError: (error) => setErrors(error.response?.data || { general: 'Registration failed' }),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">OptiBiz</h1>
          <p className="text-primary-200">Business Management for SMEs</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-h-[90vh] overflow-y-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 w-12 rounded ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {step === 1 ? 'Personal Details' : 'Business Details'}
          </h2>

          {errors.general && <Alert variant="error" className="mb-6">{errors.general}</Alert>}

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" value={formData.first_name} onChange={set('first_name')} error={errors.first_name} required />
                <Input label="Last Name" placeholder="Doe" value={formData.last_name} onChange={set('last_name')} error={errors.last_name} required />
              </div>
              <Input label="Email" type="email" placeholder="you@example.com" value={formData.email} onChange={set('email')} error={errors.email} required />
              <Input label="Phone" placeholder="+254712345678" value={formData.phone} onChange={set('phone')} error={errors.phone} required />
              <Input label="Password" type="password" placeholder="••••••••" value={formData.password} onChange={set('password')} error={errors.password} required />
              <Input label="Confirm Password" type="password" placeholder="••••••••" value={formData.password_confirm} onChange={set('password_confirm')} error={errors.password_confirm} required />
              <Button type="submit" variant="primary" className="w-full" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? <><LoadingSpinner size="sm" className="mr-2" />Creating account...</> : 'Next →'}
              </Button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4">
              <Input label="Business Name" placeholder="My Shop" value={formData.name} onChange={set('name')} error={errors.name} required />
              <Input label="Industry" placeholder="Retail, Food, Services, etc" value={formData.industry} onChange={set('industry')} error={errors.industry} required />
              <Input label="Registration Number" placeholder="e.g., 12345678" value={formData.registration_no} onChange={set('registration_no')} error={errors.registration_no} required />
              <Input label="Tax PIN" placeholder="e.g., A123456789B" value={formData.tax_pin} onChange={set('tax_pin')} error={errors.tax_pin} required />
              <Input label="Country" placeholder="e.g., Kenya" value={formData.country} onChange={set('country')} error={errors.country} required />
              <Input label="Currency" placeholder="e.g., KES" value={formData.currency} onChange={set('currency')} error={errors.currency} required />
              <Button type="submit" variant="primary" className="w-full" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? <><LoadingSpinner size="sm" className="mr-2" />Creating account...</> : 'Complete Registration'}
              </Button>
            </form>
          )}

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
