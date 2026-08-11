import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import WhyChooseUs from '../components/About/WhyChooseUs';
import Testimonials from '../components/About/Testimonials';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiScale, HiTruck, HiCube } from 'react-icons/hi';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Page Header */}
      <div className="pt-32 pb-20 bg-hero-gradient px-6 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tag bg-white/10 text-white border border-white/20 mb-4">About Us</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
          Who We Are
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/70 text-lg max-w-2xl mx-auto">
          Loving Source Logistics is a professional courier and delivery company serving the Dallas–Fort Worth Metroplex with reliability and care.
        </motion.p>
      </div>

      {/* About Content */}
      <section className="section-pad bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-navy-950 mb-6">Our Story & Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Loving Source Logistics was founded with a clear mission: to provide dependable, professional courier and delivery services that businesses in the DFW Metroplex can count on. We specialize in time-sensitive deliveries where reliability, professionalism, and careful handling matter most.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                From medical supply and specimen transportation to legal document delivery and auto parts logistics, we serve a wide range of industries with the same commitment — prompt, courteous, and dependable service from pickup to delivery.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you need a critical medical item transported, an auto part delivered quickly, or important legal documents handled securely, Loving Source Logistics is your trusted partner.
              </p>
              <Link to="/request-quote" className="btn-primary">Get a Free Quote</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Medical Courier', desc: 'HIPAA-aware specimen & supply transport', icon: HiOutlineHeart },
                { label: 'Legal Delivery', desc: 'Secure, time-sensitive document courier', icon: HiScale },
                { label: 'Auto Parts', desc: 'Fast delivery across DFW', icon: HiTruck },
                { label: 'B2B Logistics', desc: 'Scheduled & recurring routes', icon: HiCube },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3 text-primary-600"><item.icon className="w-8 h-8" /></div>
                  <div className="font-semibold text-navy-950 mb-1">{item.label}</div>
                  <div className="text-gray-400 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro Image Banner */}
      <section className="px-6 pb-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <img
            src="/about.png"
            alt="Loving Source Logistics courier van on the road"
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-md"
          />
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
}
