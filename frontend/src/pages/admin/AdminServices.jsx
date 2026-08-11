import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import api from '../../utils/api';

const categories = ['medical', 'legal', 'automotive', 'business', 'general'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const [fetchError, setFetchError] = useState(null);
  const fetch = () => api.get('/services/admin')
    .then(r => { setServices(r.data); setFetchError(null); })
    .catch(err => setFetchError(err.response?.data?.message || 'Failed to load services'));
  useEffect(() => { fetch(); }, []);

  const openModal = (service = null) => {
    setEditing(service);
    setImageFile(null);
    if (service) {
      setValue('title', service.title);
      setValue('description', service.description);
      setValue('icon', service.icon);
      setValue('category', service.category);
      setValue('features', service.features?.join(', '));
      setValue('isActive', service.isActive);
      setValue('order', service.order);
    } else {
      reset();
    }
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      if (imageFile) formData.append('image', imageFile);

      if (editing) await api.put(`/services/${editing._id}`, formData);
      else await api.post('/services', formData);

      toast.success(editing ? 'Service updated' : 'Service created');
      setShowModal(false);
      reset();
      fetch();
    } catch {
      toast.error('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success('Deleted');
      fetch();
    } catch { toast.error('Failed to delete'); }
  };

  const catColors = { medical: 'bg-rose-100 text-rose-700', legal: 'bg-blue-100 text-blue-700', automotive: 'bg-amber-100 text-amber-700', business: 'bg-purple-100 text-purple-700', general: 'bg-green-100 text-green-700' };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-navy-950">Services</h1>
          <p className="text-gray-500 text-sm mt-1">Manage services displayed on the website.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary text-sm py-2.5">
          <HiPlus /> Add Service
        </button>
      </div>

      {fetchError && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
          {fetchError}
        </div>
      )}

      {!fetchError && services.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="mb-4">No services yet. Add your first service to show it on the website.</p>
          <button onClick={() => openModal()} className="btn-primary text-sm py-2.5 mx-auto">
            <HiPlus /> Add Service
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map(s => (
          <div key={s._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {s.image?.url && <img src={s.image.url} alt={s.title} className="w-full h-40 object-cover" />}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-semibold text-navy-950">{s.title}</h3>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openModal(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"><HiPencil className="w-4 h-4" /></button>
                  <button onClick={() => deleteService(s._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><HiTrash className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{s.description}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${catColors[s.category] || catColors.general}`}>{s.category}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{s.isActive ? 'Active' : 'Hidden'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-navy-950">{editing ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><HiX className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                  <input {...register('title', { required: true })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon (emoji)</label>
                  <input {...register('icon')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="🏥" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select {...register('category')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                  <textarea {...register('description', { required: true })} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Features (comma-separated)</label>
                  <input {...register('features')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="Feature 1, Feature 2, Feature 3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Order</label>
                  <input {...register('order')} type="number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" defaultValue={0} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input {...register('isActive')} type="checkbox" id="isActive" className="w-4 h-4 accent-primary-600" defaultChecked />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (visible on site)</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Image (Cloudinary)</label>
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100" />
                  {editing?.image?.url && !imageFile && <img src={editing.image.url} alt="current" className="w-24 h-16 object-cover rounded-lg mt-2" />}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 border border-gray-200 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center disabled:opacity-70">{loading ? 'Saving...' : 'Save Service'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
