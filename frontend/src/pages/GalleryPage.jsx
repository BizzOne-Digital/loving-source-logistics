import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { HiPhotograph } from 'react-icons/hi';

export default function GalleryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/gallery').then(res => setItems(res.data)).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 bg-hero-gradient px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl text-white mb-6">Gallery</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/70 text-lg max-w-xl mx-auto">A look at Loving Source Logistics in action.</motion.p>
      </div>
      <section className="section-pad bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <HiPhotograph className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Gallery coming soon. Check back later.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl aspect-square bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img src={item.image.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-sm">{item.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
