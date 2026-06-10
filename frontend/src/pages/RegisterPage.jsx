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
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
    business_name: '',
    industry: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerMutation = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.full_name) newErrors.full_name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!validatePhone(formData.phone))
      newErrors.phone = 'Invalid phone format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    if (!formData.password_confirm)
      newErrors.password_confirm = 'Please confirm your password';
    else if (formData.password !== formData.password_confirm)
      newErrors.password_confirm = 'Passwords do not match';
    if (!formData.business_name)
      newErrors.business_name = 'Business name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Map form data to API payload
    const nameParts = formData.full_name.split(' ');
    const apiPayload = {
      username: formData.email.split('@')[0],
      email: formData.email,
      password: formData.password,
      first_name: nameParts[0],
      last_name: nameParts.slice(1).join(' ') || '',
      phone: formData.phone,
    };

    registerMutation.mutate(apiPayload, {
      onSuccess: (res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        
        // Store user info in Redux
        if (res.data.user) {
          dispatch(setUser(res.data.user));
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
            Create Account
          </h2>

          {errors.general && (
            <Alert variant="error" className="mb-6">
              {errors.general}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              error={errors.full_name}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Phone"
              placeholder="+254712345678"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <Input
              label="Business Name"
              placeholder="My Shop"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              error={errors.business_name}
              required
            />

            <Input
              label="Industry"
              placeholder="Retail, Food, Services, etc"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              error={errors.industry}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleChange}
              error={errors.password_confirm}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
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
