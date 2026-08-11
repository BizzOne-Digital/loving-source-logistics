import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiUpload } from 'react-icons/hi';
import api from '../../utils/api';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get('/settings').then(res => {
      const s = res.data;
      reset({
        siteName: s.siteName,
        tagline: s.tagline,
        phone: s.phone,
        email: s.email,
        address: s.address,
        serviceAreas: s.serviceAreas?.join(', '),
        businessHours: s.businessHours,
        'social.facebook': s.social?.facebook,
        'social.instagram': s.social?.instagram,
        'social.linkedin': s.social?.linkedin,
        'seo.metaTitle': s.seo?.metaTitle,
        'seo.metaDescription': s.seo?.metaDescription,
        'seo.keywords': s.seo?.keywords,
      });
      if (s.logo?.url) setCurrentLogo(s.logo.url);
    }).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) formData.append(k, v); });

      const social = { facebook: data['social.facebook'], instagram: data['social.instagram'], linkedin: data['social.linkedin'] };
      const seo = { metaTitle: data['seo.metaTitle'], metaDescription: data['seo.metaDescription'], keywords: data['seo.keywords'] };
      formData.set('social', JSON.stringify(social));
      formData.set('seo', JSON.stringify(seo));

      if (logoFile) formData.append('logo', logoFile);
      if (faviconFile) formData.append('favicon', faviconFile);

      await api.put('/settings', formData);
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400 text-navy-950";
  const tabs = ['general', 'social', 'seo', 'branding'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-navy-950">Site Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage business info, branding, social links, and SEO.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-navy-950 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* General */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
            <h2 className="font-display font-semibold text-navy-950 text-lg">Business Information</h2>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name</label>
                <input {...register('siteName')} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tagline</label>
                <input {...register('tagline')} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input {...register('phone')} className={inputCls} placeholder="1-866-592-3118" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input {...register('email')} type="email" className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Address</label>
                <input {...register('address')} className={inputCls} placeholder="Dallas–Fort Worth Metroplex, TX" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Areas (comma-separated)</label>
                <input {...register('serviceAreas')} className={inputCls} placeholder="Lancaster, Dallas, DeSoto, Cedar Hill..." />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Hours</label>
                <input {...register('businessHours')} className={inputCls} placeholder="Mon–Fri: 8AM–6PM | Sat: 9AM–3PM" />
              </div>
            </div>
          </div>
        )}

        {/* Social */}
        {activeTab === 'social' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
            <h2 className="font-display font-semibold text-navy-950 text-lg">Social Media Links</h2>
            <div className="space-y-4">
              {[
                { key: 'social.facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/lovingsourcelogistics' },
                { key: 'social.instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/lovingsourcelogistics' },
                { key: 'social.linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/loving-source-logistics' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input {...register(f.key)} className={inputCls} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
            <h2 className="font-display font-semibold text-navy-950 text-lg">SEO Settings</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
              <input {...register('seo.metaTitle')} className={inputCls} placeholder="Loving Source Logistics | Professional Courier Services DFW" />
              <p className="text-xs text-gray-400 mt-1">Recommended: 50–60 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
              <textarea {...register('seo.metaDescription')} rows={3} className={`${inputCls} resize-none`} placeholder="Reliable medical, legal, and automotive courier services across the Dallas–Fort Worth Metroplex..." />
              <p className="text-xs text-gray-400 mt-1">Recommended: 150–160 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Keywords</label>
              <input {...register('seo.keywords')} className={inputCls} placeholder="medical courier DFW, same-day delivery Dallas, logistics Texas" />
            </div>
          </div>
        )}

        {/* Branding */}
        {activeTab === 'branding' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-6">
            <h2 className="font-display font-semibold text-navy-950 text-lg">Logo & Branding</h2>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Business Logo</label>
              <div
                onClick={() => document.getElementById('logoInput').click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all max-w-sm"
              >
                {logoFile ? (
                  <img src={URL.createObjectURL(logoFile)} alt="logo" className="h-20 object-contain mx-auto" />
                ) : currentLogo ? (
                  <img src={currentLogo} alt="logo" className="h-20 object-contain mx-auto" />
                ) : (
                  <div>
                    <HiUpload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Click to upload logo</p>
                    <p className="text-gray-400 text-xs mt-1">PNG or SVG with transparent background preferred</p>
                  </div>
                )}
                <input id="logoInput" type="file" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} className="hidden" />
              </div>
            </div>

            {/* Favicon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Favicon</label>
              <div
                onClick={() => document.getElementById('faviconInput').click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all max-w-xs"
              >
                {faviconFile ? (
                  <img src={URL.createObjectURL(faviconFile)} alt="favicon" className="h-12 w-12 object-contain mx-auto" />
                ) : (
                  <div>
                    <HiUpload className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Upload favicon</p>
                    <p className="text-gray-400 text-xs mt-1">32×32 or 64×64 PNG/ICO</p>
                  </div>
                )}
                <input id="faviconInput" type="file" accept="image/*" onChange={e => setFaviconFile(e.target.files[0])} className="hidden" />
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary px-10 py-3.5 disabled:opacity-70">
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
