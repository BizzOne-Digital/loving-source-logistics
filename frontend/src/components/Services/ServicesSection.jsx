import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight, HiOutlineHeart, HiTruck, HiExclamation, HiCube } from 'react-icons/hi';
import { FaFlask, FaPills, FaBalanceScale } from 'react-icons/fa';
import api from '../../utils/api';

const defaultServices = [
  { _id: '1', title: 'Medical Supply Delivery', description: 'Reliable transportation of medical supplies, equipment, and materials to healthcare facilities with utmost care.', icon: HiOutlineHeart, category: 'medical', features: ['Temperature-sensitive handling', 'Chain of custody', 'Proof of delivery'] },
  { _id: '2', title: 'Specimen Transportation', description: 'Safe and secure transport of lab specimens with proper handling procedures and time-sensitive protocols.', icon: FaFlask, category: 'medical', features: ['HIPAA compliant', 'Secure containers', 'Priority routing'] },
  { _id: '3', title: 'Prescription Delivery', description: 'Fast and confidential prescription and healthcare-related delivery services for pharmacies and clinics.', icon: FaPills, category: 'medical', features: ['Discreet packaging', 'Signature required', 'Same-day available'] },
  { _id: '4', title: 'Legal Document Delivery', description: 'Secure, time-sensitive delivery of legal documents with verified chain of custody and proof of delivery.', icon: FaBalanceScale, category: 'legal', features: ['Confidential handling', 'Court deadlines met', 'Electronic proof'] },
  { _id: '5', title: 'Auto Parts Delivery', description: 'Fast delivery of auto parts from suppliers to shops, dealers, and customers across the DFW area.', icon: HiTruck, category: 'automotive', features: ['Fragile item care', 'Same-day options', 'Multiple pickups'] },
  { _id: '6', title: 'Same-Day & Rush Delivery', description: 'When time is critical, our STAT and same-day delivery options ensure your items arrive when they need to.', icon: HiExclamation, category: 'general', features: ['2-hour delivery', 'Real-time updates', 'Priority handling'] },
];

const DefaultIcon = HiCube;

// Map of legacy emoji values (e.g. from API data) to icon components, plus a safe fallback.
const iconMap = {
  '🏥': HiOutlineHeart,
  '🧪': FaFlask,
  '💊': FaPills,
  '⚖️': FaBalanceScale,
  '🚗': HiTruck,
  '🚨': HiExclamation,
};

function resolveIcon(icon) {
  if (!icon) return DefaultIcon;
  if (typeof icon === 'function') return icon;
  if (typeof icon === 'string') return iconMap[icon] || DefaultIcon;
  return DefaultIcon;
}

const categoryColors = {
  medical: 'bg-rose-50 text-rose-600 border-rose-100',
  legal: 'bg-blue-50 text-blue-600 border-blue-100',
  automotive: 'bg-amber-50 text-amber-600 border-amber-100',
  business: 'bg-purple-50 text-purple-600 border-purple-100',
  general: 'bg-green-50 text-green-600 border-green-100',
};

export default function ServicesSection({ limit = 6 }) {
  const [services, setServices] = useState(defaultServices);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    api.get('/services').then(res => {
      if (res.data?.length) setServices(res.data);
    }).catch(() => {});
  }, []);

  return (
    <section className="section-pad bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="tag bg-primary-50 text-primary-600 border border-primary-100 mb-4"
          >
            What We Deliver
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-navy-950"
          >
            Courier Services Built for{' '}
            <span className="text-primary-600">Professionals</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            From time-sensitive medical deliveries to legal documents, we handle every shipment with professionalism and care.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(limit ? services.slice(0, limit) : services).map((service, i) => {
            const ServiceIcon = resolveIcon(service.icon);
            return (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="card p-6 group hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center text-3xl text-primary-600 bg-gray-50 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <ServiceIcon className="w-7 h-7" />
              </div>

              {/* Category tag */}
              <span className={`tag border text-xs mb-3 ${categoryColors[service.category] || categoryColors.general}`}>
                {service.category}
              </span>

              <h3 className="font-display font-bold text-xl text-navy-950 mb-3 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              {service.features?.length > 0 && (
                <ul className="space-y-2 mb-5">
                  {service.features.slice(0, 3).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {service.image?.url && (
                <img src={service.image.url} alt={service.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              )}
            </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        {limit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-primary">
              View All Services <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
