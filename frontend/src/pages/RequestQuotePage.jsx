import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import api from '../utils/api';
import { HiCheckCircle } from 'react-icons/hi';

const deliveryTypes = [
  { value: 'medical-supply', label: 'Medical Supply Delivery' },
  { value: 'specimen', label: 'Specimen Transportation' },
  { value: 'prescription', label: 'Prescription Delivery' },
  { value: 'equipment', label: 'Medical Equipment' },
  { value: 'auto-parts', label: 'Auto Parts Delivery' },
  { value: 'legal-docs', label: 'Legal Document Delivery' },
  { value: 'b2b', label: 'B2B Courier Services' },
  { value: 'same-day', label: 'Same-Day Delivery' },
  { value: 'rush', label: 'Rush/STAT Delivery' },
  { value: 'scheduled', label: 'Scheduled/Recurring Route' },
  { value: 'other', label: 'Other' },
];

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/quotes', data);
      setSubmitted(true);
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.');
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6 bg-gradient-to-br from-primary-50 to-accent-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center"
          >
            <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiCheckCircle className="w-12 h-12 text-accent-600" />
            </div>
            <h2 className="font-display font-bold text-3xl text-navy-950 mb-4">Quote Request Received!</h2>
            <p className="text-gray-500 leading-relaxed mb-8">Thank you for reaching out to Loving Source Logistics. Our team will review your request and get back to you within one business day.</p>
            <p className="text-gray-500 text-sm">For urgent needs, please call us directly at <a href="tel:18665923118" className="text-primary-600 font-semibold">1-866-592-3118</a>.</p>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  const fieldCls = (err) => `w-full px-4 py-3 rounded-xl border ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-navy-950 transition-all`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-primary-50 to-accent-50 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="tag bg-primary-100 text-primary-700 border border-primary-200 mb-4">Get a Free Quote</span>
            <h1 className="font-display font-bold text-4xl text-navy-950 mb-4">Request a Delivery Quote</h1>
            <p className="text-gray-500">Fill out the form below and we'll respond within one business day. For urgent deliveries, call us directly.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Company Name *</label>
                <input {...register('companyName', { required: true })} className={fieldCls(errors.companyName)} placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Contact Name *</label>
                <input {...register('contactName', { required: true })} className={fieldCls(errors.contactName)} placeholder="Your full name" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Phone *</label>
                <input {...register('phone', { required: true })} type="tel" className={fieldCls(errors.phone)} placeholder="Your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Email *</label>
                <input {...register('email', { required: true })} type="email" className={fieldCls(errors.email)} placeholder="Your email address" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Pickup Location *</label>
                <input {...register('pickupLocation', { required: true })} className={fieldCls(errors.pickupLocation)} placeholder="Full address or city" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Delivery Location *</label>
                <input {...register('deliveryLocation', { required: true })} className={fieldCls(errors.deliveryLocation)} placeholder="Full address or city" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-950 mb-2">Type of Delivery *</label>
              <select {...register('deliveryType', { required: true })} className={fieldCls(errors.deliveryType)}>
                <option value="">Select delivery type</option>
                {deliveryTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Date & Time Needed</label>
                <input {...register('dateTimeNeeded')} type="datetime-local" className={fieldCls(false)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-950 mb-2">Recurring Delivery?</label>
                <select {...register('isRecurring')} className={fieldCls(false)}>
                  <option value="false">No — One-time delivery</option>
                  <option value="true">Yes — Recurring/Scheduled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-950 mb-2">Special Handling Requirements</label>
              <textarea {...register('specialHandling')} rows={3} className={fieldCls(false)} placeholder="Temperature-sensitive, fragile, confidential, STAT, etc." />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary justify-center py-4 text-base disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </button>

            <p className="text-center text-gray-400 text-xs">
              For urgent deliveries, call us at{' '}
              <a href="tel:18665923118" className="text-primary-600 font-semibold">1-866-592-3118</a>
            </p>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
}
