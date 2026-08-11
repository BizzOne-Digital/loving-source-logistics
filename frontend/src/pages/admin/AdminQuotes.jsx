import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiEye, HiTrash, HiX, HiChevronDown } from 'react-icons/hi';
import api from '../../utils/api';

const statuses = ['new', 'reviewed', 'quoted', 'accepted', 'declined'];

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  reviewed: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-purple-100 text-purple-700',
  accepted: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    const params = new URLSearchParams({ page, limit: 15 });
    if (filterStatus) params.append('status', filterStatus);
    api.get(`/quotes?${params}`).then(r => {
      setQuotes(r.data.quotes);
      setTotal(r.data.total);
    }).catch(() => {});
  };

  useEffect(() => { fetch(); }, [filterStatus, page]);

  const openDetail = (quote) => {
    setSelected(quote);
    setNoteText(quote.adminNotes || '');
    setUpdateStatus(quote.status);
  };

  const saveUpdate = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await api.put(`/quotes/${selected._id}/status`, { status: updateStatus, adminNotes: noteText });
      toast.success('Quote updated');
      setSelected(null);
      fetch();
    } catch {
      toast.error('Failed to update');
    } finally {
      setLoading(false);
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Delete this quote request?')) return;
    try {
      await api.delete(`/quotes/${id}`);
      toast.success('Deleted');
      setSelected(null);
      fetch();
    } catch { toast.error('Failed'); }
  };

  const pages = Math.ceil(total / 15);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-navy-950">Quote Requests</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total requests received</p>
        </div>
        {/* Status filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 appearance-none"
          >
            <option value="">All Status</option>
            {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Company</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Contact</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Type</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {quotes.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-16 text-gray-400">No quote requests found</td></tr>
              ) : quotes.map(q => (
                <tr key={q._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-navy-950">{q.companyName}</td>
                  <td className="px-5 py-4">
                    <div className="text-navy-950">{q.contactName}</div>
                    <div className="text-gray-400 text-xs">{q.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{q.deliveryType}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{new Date(q.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[q.status]}`}>{q.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openDetail(q)} className="p-1.5 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors"><HiEye className="w-4 h-4" /></button>
                      <button onClick={() => deleteQuote(q._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><HiTrash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-400">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">Previous</button>
              <button disabled={page === pages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-navy-950">Quote Request Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><HiX className="w-5 h-5" /></button>
            </div>
            <div className="p-7 space-y-6">
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Company', selected.companyName],
                  ['Contact', selected.contactName],
                  ['Phone', selected.phone],
                  ['Email', selected.email],
                  ['Pickup', selected.pickupLocation],
                  ['Delivery', selected.deliveryLocation],
                  ['Type', selected.deliveryType],
                  ['Recurring', selected.isRecurring ? 'Yes' : 'No'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</div>
                    <div className="text-navy-950 font-medium text-sm">{value}</div>
                  </div>
                ))}
              </div>

              {selected.specialHandling && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Special Handling</div>
                  <div className="text-navy-950 text-sm">{selected.specialHandling}</div>
                </div>
              )}

              {/* Update status */}
              <div className="space-y-4 border-t border-gray-100 pt-5">
                <h3 className="font-semibold text-navy-950">Update Quote</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select
                    value={updateStatus}
                    onChange={e => setUpdateStatus(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Notes</label>
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                    placeholder="Internal notes, quoted price, follow-up details..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => deleteQuote(selected._id)} className="px-5 py-3 rounded-full border border-red-200 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors">Delete</button>
                <div className="flex-1" />
                <button onClick={() => setSelected(null)} className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={saveUpdate} disabled={loading} className="btn-primary text-sm py-3 disabled:opacity-70">{loading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
