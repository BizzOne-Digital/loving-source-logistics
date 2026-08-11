import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ServicesSection from '../components/Services/ServicesSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiRefresh, HiClipboardList, HiShieldCheck, HiCheckCircle, HiExclamation, HiCalendar } from 'react-icons/hi';

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 bg-hero-gradient px-6 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl text-white mb-6">Our Services</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/70 text-lg max-w-2xl mx-auto">
          From medical courier services to legal document delivery and auto parts logistics — we handle it all with professionalism.
        </motion.p>
      </div>
      <ServicesSection limit={null} />
      {/* Medical Courier Deep Dive */}
      <section className="section-pad bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy-950 mb-4">Medical Courier Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Our primary niche — safe, reliable, and professional transport of medical items across the DFW Metroplex.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Pickup & Delivery Procedures', desc: 'Structured pickup and delivery protocols with clear communication at every step.', icon: HiRefresh },
              { title: 'Chain of Custody', desc: 'Documented chain of custody for sensitive specimens and confidential materials.', icon: HiClipboardList },
              { title: 'Secure Handling', desc: 'Careful handling of all medical items to ensure safety and integrity.', icon: HiShieldCheck },
              { title: 'Proof of Delivery', desc: 'Every delivery documented with confirmation for compliance and records.', icon: HiCheckCircle },
              { title: 'STAT/Emergency Delivery', desc: 'Rush delivery options for time-critical medical needs.', icon: HiExclamation },
              { title: 'Recurring Routes', desc: 'Consistent scheduled pickups for clinics, labs, and pharmacies.', icon: HiCalendar },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="text-3xl mb-4 text-primary-600"><item.icon className="w-8 h-8" /></div>
                <h3 className="font-semibold text-navy-950 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-hero-gradient text-center">
        <h2 className="font-display font-bold text-3xl text-white mb-6">Ready to Get Started?</h2>
        <Link to="/request-quote" className="btn-primary px-10 py-4 text-base">Request a Quote</Link>
      </section>
      <Footer />
    </>
  );
}
