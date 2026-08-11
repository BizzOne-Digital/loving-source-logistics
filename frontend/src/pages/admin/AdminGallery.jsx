import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiPlus, HiTrash, HiEye, HiEyeOff, HiX } from 'react-icons/hi';
import api from '../../utils/api';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'general' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = () => api.get('/gallery/admin').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { fetch(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error('Please select an image');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('image', imageFile);
      await api.post('/gallery', formData);
      toast.success('Image uploaded successfully');
      setShowModal(false);
      setForm({ title: '', category: 'general' });
      setImageFile(null);
      setPreview(null);
      fetch();
    } catch {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    try {
      await api.put(`/gallery/${id}/toggle`);
      fetch();
    } catch { toast.error('Failed'); }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Deleted');
      fetch();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-navy-950">Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">Upload and manage gallery images. All uploads go to Cloudinary.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2.5">
          <HiPlus /> Upload Image
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center">
          <div className="text-5xl mb-4">🖼️</div>
          <p className="text-gray-400">No gallery images yet. Upload your first image.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item._id} className={`group relative rounded-2xl overflow-hidden bg-gray-100 aspect-square shadow-sm border-2 transition-all ${item.isActive ? 'border-transparent' : 'border-gray-300 opacity-60'}`}>
              <img src={item.image.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/50 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => toggleActive(item._id)}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow"
                  title={item.isActive ? 'Hide' : 'Show'}
                >
                  {item.isActive ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors shadow"
                  title="Delete"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
              {/* Title bar */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-950/80 to-transparent">
                <div className="text-white text-xs font-medium truncate">{item.title}</div>
                <div className="text-white/50 text-xs">{item.category}</div>
              </div>
              {!item.isActive && (
                <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-xs px-2 py-0.5 rounded-full">Hidden</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-navy-950">Upload Image</h2>
              <button onClick={() => { setShowModal(false); setPreview(null); setImageFile(null); }} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-7 space-y-5">
              {/* Drop zone */}
              <div
                onClick={() => document.getElementById('galleryFileInput').click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-xl" />
                ) : (
                  <div>
                    <div className="text-4xl mb-3">📸</div>
                    <p className="text-gray-500 text-sm">Click to select an image</p>
                    <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — max 5MB</p>
                  </div>
                )}
                <input id="galleryFileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Image Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder="e.g. Medical delivery vehicle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                >
                  {['general', 'medical', 'legal', 'automotive', 'team', 'vehicles'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setPreview(null); }} className="flex-1 px-6 py-3 border border-gray-200 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center disabled:opacity-70">
                  {loading ? 'Uploading...' : 'Upload to Cloudinary'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
