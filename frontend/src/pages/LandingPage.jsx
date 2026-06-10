/**
 * LandingPage component
 * 
 * This is a template for the landing page with:
 * - Hero section with value proposition
 * - Features highlight
 * - Pricing overview
 * - Testimonials
 * - Call-to-action buttons
 * 
 * To implement:
 * 1. Import and use this in App.jsx routes
 * 2. Customize colors and content
 * 3. Add analytics tracking
 */

import { Button } from '@/components/ui/Button';
import { ArrowRight, BarChart3, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">OptiBiz</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Run Your Business Smarter
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          All-in-one platform for SMEs to manage sales, inventory, expenses,
          and get insights that grow your business
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              Start Free Trial
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Why OptiBiz?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <BarChart3 className="text-primary-600 mb-4" size={32} />
              <h4 className="text-xl font-semibold mb-2">Real-time Analytics</h4>
              <p className="text-gray-600">
                Get instant insights into your sales, expenses, and profit margins
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Zap className="text-primary-600 mb-4" size={32} />
              <h4 className="text-xl font-semibold mb-2">Fast & Easy</h4>
              <p className="text-gray-600">
                Record a sale in seconds. No complex setup or training needed
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Lock className="text-primary-600 mb-4" size={32} />
              <h4 className="text-xl font-semibold mb-2">Secure & Reliable</h4>
              <p className="text-gray-600">
                Your data is safe. Bank-level encryption and automatic backups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Simple Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: 'Free',
              features: [
                'Up to 100 transactions/month',
                'Basic reporting',
                '1 user account',
              ],
            },
            {
              name: 'Growth',
              price: '999',
              features: [
                'Unlimited transactions',
                'Advanced reports',
                '5 user accounts',
                'SACCO features',
              ],
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              features: [
                'Everything in Growth',
                'Unlimited users',
                'API access',
                'Priority support',
              ],
            },
          ].map((plan) => (
            <div key={plan.name} className="border border-gray-200 rounded-lg p-8">
              <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
              <p className="text-3xl font-bold text-primary-600 mb-6">
                {plan.price === 'Custom' ? plan.price : `KES ${plan.price}`}
                {plan.price !== 'Free' && plan.price !== 'Custom' && (
                  <span className="text-lg text-gray-600">/month</span>
                )}
              </p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-600">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to grow your business?
          </h3>
          <p className="text-lg mb-8">
            Join hundreds of SMEs managing their operations with OptiBiz
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2026 OptiBiz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
