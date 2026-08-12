import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import { HiPhone, HiMail, HiClock, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const contactInfo = [
  { icon: <HiPhone className="w-6 h-6" />, label: 'Phone', value: '1-866-592-3118', href: 'tel:18665923118', color: 'bg-primary-500' },
  { icon: <HiPhone className="w-6 h-6" />, label: 'Direct', value: '682-482-0556', href: 'tel:6824820556', color: 'bg-accent-600' },
  { icon: <HiMail className="w-6 h-6" />, label: 'Email', value: 'info@lovingsourcelogistics.com', href: 'mailto:info@lovingsourcelogistics.com', color: 'bg-blue-500' },
  { icon: <HiClock className="w-6 h-6" />, label: 'Business Hours', value: 'Mon–Fri: 8AM–6PM | Sat: 8AM–6PM', color: 'bg-accent-500' },
  { icon: <HiLocationMarker className="w-6 h-6" />, label: 'Address', value: '17350 State Hwy 249, Suite 220 # 37201, Houston, TX 77064', color: 'bg-purple-500' },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 bg-hero-gradient px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl text-white mb-6">Contact Us</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/70 text-lg max-w-xl mx-auto">Get in touch with our team. We respond within one business day.</motion.p>
      </div>
      <section className="section-pad bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-5"
              >
                <div className={`w-12 h-12 ${item.color} text-white rounded-xl flex items-center justify-center shrink-0`}>{item.icon}</div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-navy-950 font-semibold hover:text-primary-600 transition-colors">{item.value}</a>
                  ) : (
                    <div className="text-navy-950 font-semibold">{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-hero-gradient rounded-3xl p-10 text-center">
            <h2 className="font-display font-bold text-3xl text-white mb-4">Ready to Request a Delivery?</h2>
            <p className="text-white/70 mb-8">Fill out our quote form and we'll get back to you within one business day.</p>
            <Link to="/request-quote" className="btn-primary px-10 py-4 text-base">Request a Quote</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
