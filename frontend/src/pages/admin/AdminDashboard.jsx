import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiCollection, HiClipboardList, HiPhotograph, HiStar, HiArrowRight, HiClock } from 'react-icons/hi';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({ services: 0, gallery: 0, testimonials: 0, newQuotes: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/services/admin'),
      api.get('/gallery/admin'),
      api.get('/testimonials/admin'),
      api.get('/quotes?status=new&limit=5'),
    ]).then(([s, g, t, q]) => {
      setStats({
        services: s.data.length,
        gallery: g.data.length,
        testimonials: t.data.length,
        newQuotes: q.data.total || 0,
      });
      setQuotes(q.data.quotes || []);
    }).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Services', value: stats.services, icon: <HiCollection />, to: '/admin/services', color: 'bg-blue-50 text-blue-600' },
    { label: 'Gallery Items', value: stats.gallery, icon: <HiPhotograph />, to: '/admin/gallery', color: 'bg-purple-50 text-purple-600' },
    { label: 'Testimonials', value: stats.testimonials, icon: <HiStar />, to: '/admin/testimonials', color: 'bg-amber-50 text-amber-600' },
    { label: 'New Quotes', value: stats.newQuotes, icon: <HiClipboardList />, to: '/admin/quotes', color: 'bg-rose-50 text-rose-600' },
  ];

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    reviewed: 'bg-yellow-100 text-yellow-700',
    quoted: 'bg-purple-100 text-purple-700',
    accepted: 'bg-green-100 text-green-700',
    declined: 'bg-red-100 text-red-700',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-navy-950">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map(card => (
          <Link key={card.label} to={card.to} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all group">
            <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-xl mb-4`}>{card.icon}</div>
            <div className="font-display font-bold text-3xl text-navy-950 mb-1">{card.value}</div>
            <div className="text-gray-500 text-sm flex items-center justify-between">
              {card.label}
              <HiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent quotes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-semibold text-navy-950">Recent Quote Requests</h2>
          <Link to="/admin/quotes" className="text-primary-600 text-sm font-medium hover:underline">View all</Link>
        </div>
        {quotes.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <HiClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No quote requests yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {quotes.map(q => (
              <Link key={q._id} to="/admin/quotes" className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-navy-950 text-sm truncate">{q.companyName}</div>
                  <div className="text-gray-400 text-xs">{q.contactName} · {q.deliveryType}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[q.status] || statusColors.new}`}>{q.status}</span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <HiClock className="w-3.5 h-3.5" />
                    {new Date(q.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Add New Service', to: '/admin/services', desc: 'Create or update services' },
          { label: 'Site Settings', to: '/admin/settings', desc: 'Logo, contact info, SEO' },
        ].map(a => (
          <Link key={a.to} to={a.to} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group">
            <div className="font-semibold text-navy-950 text-sm mb-1 group-hover:text-primary-600 transition-colors">{a.label}</div>
            <div className="text-gray-400 text-xs">{a.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
