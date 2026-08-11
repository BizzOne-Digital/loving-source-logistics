import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import ServicesSection from '../components/Services/ServicesSection';
import WhyChooseUs from '../components/About/WhyChooseUs';
import Testimonials from '../components/About/Testimonials';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineHeart, HiScale, HiTruck, HiCube } from 'react-icons/hi';
import { FaFlask, FaPills, FaStethoscope, FaWrench } from 'react-icons/fa';

const industries = [
  { name: 'Healthcare & Medical Facilities', icon: HiOutlineHeart },
  { name: 'Laboratories', icon: FaFlask },
  { name: 'Pharmacies', icon: FaPills },
  { name: 'Hospitals & Clinics', icon: FaStethoscope },
  { name: 'Law Firms', icon: HiScale },
  { name: 'Automotive Businesses', icon: FaWrench },
  { name: 'Auto Parts Stores', icon: HiTruck },
  { name: 'Medical Supply Companies', icon: HiCube },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <WhyChooseUs />

      {/* Industries */}
      <section className="section-pad bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-navy-950"
            >
              Industries We Serve
            </motion.h2>
            <p className="section-subtitle mx-auto">Trusted by businesses across multiple sectors in the DFW Metroplex.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3 text-primary-600 flex justify-center"><ind.icon className="w-8 h-8" /></div>
                <div className="font-medium text-navy-950 text-sm">{ind.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-hero-gradient relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-5xl text-white mb-6"
          >
            Ready to Work With a Logistics Partner You Can Trust?
          </motion.h2>
          <p className="text-white/70 text-lg mb-10">Contact us today to discuss your delivery needs. Same-day quotes available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-quote" className="btn-primary px-10 py-4 text-base">
              Request a Quote <HiArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:18665923118" className="btn-outline px-10 py-4 text-base">
              Call 1-866-592-3118
            </a>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </>
  );
}
