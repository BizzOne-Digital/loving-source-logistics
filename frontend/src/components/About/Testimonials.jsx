import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import api from '../../utils/api';

const defaultTestimonials = [
  { _id: '1', name: 'Dr. Sarah Mitchell', company: 'DFW Medical Clinic', role: 'Operations Manager', message: 'Loving Source Logistics has been an invaluable partner for our clinic. They handle our specimen pickups with professionalism and always arrive on time. Highly recommended for any medical practice.', rating: 5 },
  { _id: '2', name: 'James Holloway', company: 'Holloway & Associates Law', role: 'Managing Partner', message: 'When we need court documents delivered on time, we call Loving Source Logistics. They understand urgency and always provide proof of delivery. Professional from start to finish.', rating: 5 },
  { _id: '3', name: 'Maria Torres', company: 'AutoFix DFW', role: 'Parts Manager', message: 'Fast, reliable, and affordable. Their auto parts delivery service has helped us reduce downtime significantly. Great communication and always careful with our parts.', rating: 5 },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    api.get('/testimonials').then(res => {
      if (res.data?.length) setTestimonials(res.data);
    }).catch(() => {});
  }, []);

  return (
    <section className="section-pad bg-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="tag bg-primary-900/50 text-primary-300 border border-primary-800 mb-4"
          >
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-white"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          className="pb-12"
        >
          {testimonials.map(t => (
            <SwiperSlide key={t._id}>
              <div className="glass-card p-7 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 italic">"{t.message}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                  {t.avatar?.url ? (
                    <img src={t.avatar.url} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-white/50 text-sm">{t.role}{t.company ? `, ${t.company}` : ''}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
