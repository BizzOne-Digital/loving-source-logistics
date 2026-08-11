import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX, HiStar } from 'react-icons/hi';
import api from '../../utils/api';

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const fetch = () => api.get('/testimonials/admin').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const openModal = (item = null) => {
    setEditing(item);
    setAvatarFile(null);
    if (item) {
      ['name', 'company', 'role', 'message', 'rating', 'order', 'isActive'].forEach(k => setValue(k, item[k]));
    } else {
      reset({ rating: 5, isActive: true });
    }
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v ?? ''));
      if (avatarFile) formData.append('avatar', avatarFile);

      if (editing) await api.put(`/testimonials/${editing._id}`, formData);
      else await api.post('/testimonials', formData);

      toast.success(editing ? 'Updated' : 'Created');
      setShowModal(false);
      reset();
      fetch();
    } catch {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Deleted');
      fetch();
    } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-navy-950">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">Manage client reviews shown on the website.</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary text-sm py-2.5">
          <HiPlus /> Add Testimonial
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map(item => (
          <div key={item._id} className={`bg-white rounded-2xl border shadow-sm p-6 transition-all ${item.isActive ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <HiStar key={i} className={`w-4 h-4 ${i < (item.rating || 5) ? 'text-amber-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <p className="text-gray-500 text-sm italic leading-relaxed mb-5 line-clamp-3">"{item.message}"</p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              {item.avatar?.url ? (
                <img src={item.avatar.url} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  {item.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-navy-950 text-sm truncate">{item.name}</div>
                <div className="text-gray-400 text-xs truncate">{item.role}{item.company ? ` · ${item.company}` : ''}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openModal(item)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><HiPencil className="w-4 h-4" /></button>
                <button onClick={() => deleteItem(item._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><HiTrash className="w-4 h-4" /></button>
              </div>
            </div>
            {!item.isActive && (
              <div className="mt-3 px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full inline-block">Hidden</div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center">
          <div className="text-5xl mb-4">⭐</div>
          <p className="text-gray-400">No testimonials yet. Add your first client review.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-navy-950">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><HiX className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-7 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Name *</label>
                  <input {...register('name', { required: true })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                  <input {...register('company')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Role / Title</label>
                  <input {...register('role')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" placeholder="Operations Manager" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (1–5)</label>
                  <select {...register('rating')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400">
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Testimonial Message *</label>
                  <textarea {...register('message', { required: true })} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" placeholder="What the client said about Loving Source Logistics..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Order</label>
                  <input {...register('order')} type="number" defaultValue={0} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input {...register('isActive')} type="checkbox" id="tActive" className="w-4 h-4 accent-primary-600" defaultChecked />
                  <label htmlFor="tActive" className="text-sm font-medium text-gray-700">Show on website</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Photo (optional)</label>
                  <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100" />
                  {editing?.avatar?.url && !avatarFile && (
                    <img src={editing.avatar.url} alt="avatar" className="w-12 h-12 rounded-full object-cover mt-2" />
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 border border-gray-200 rounded-full text-gray-600 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center disabled:opacity-70">{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
