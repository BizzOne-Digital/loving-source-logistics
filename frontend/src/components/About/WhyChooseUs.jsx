import { motion } from 'framer-motion';
import { HiShieldCheck, HiClock, HiDocumentText, HiPhone, HiRefresh, HiStar, HiLocationMarker } from 'react-icons/hi';

const reasons = [
  { icon: <HiClock className="w-6 h-6" />, color: 'bg-primary-500', title: 'On-Time, Every Time', description: 'We understand that your deliveries are time-critical. Our drivers are punctual, professional, and prepared.' },
  { icon: <HiShieldCheck className="w-6 h-6" />, color: 'bg-accent-500', title: 'Secure & Careful Handling', description: 'From sensitive medical items to confidential legal documents, we handle every delivery with the highest level of care.' },
  { icon: <HiDocumentText className="w-6 h-6" />, color: 'bg-primary-600', title: 'Proof of Delivery', description: 'Every delivery includes documented confirmation so you always have a clear record for compliance or records.' },
  { icon: <HiPhone className="w-6 h-6" />, color: 'bg-accent-600', title: 'Clear Communication', description: 'We keep you informed at every step. No guessing. No missed updates. Just clear, professional communication.' },
  { icon: <HiRefresh className="w-6 h-6" />, color: 'bg-primary-500', title: 'Recurring Route Services', description: 'Need scheduled daily or weekly pickups? We offer consistent, dependable recurring route options for businesses.' },
  { icon: <HiStar className="w-6 h-6" />, color: 'bg-accent-500', title: 'Professional Service', description: 'Loving Source Logistics operates at a B2B level. We represent your business well at every pickup and delivery.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="tag bg-accent-50 text-accent-700 border border-accent-200 mb-4"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-navy-950 mb-6"
            >
              Built for Businesses That Can't Afford Mistakes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 leading-relaxed mb-8"
            >
              Loving Source Logistics was built to serve healthcare providers, legal professionals, automotive businesses, and B2B clients who need a courier partner they can actually rely on — not just a delivery app.
            </motion.p>

            {/* Service area pills */}
            <div className="flex flex-wrap gap-2">
              {['Lancaster', 'Dallas', 'DeSoto', 'Cedar Hill', 'Duncanville', 'Arlington', 'Irving', 'Grand Prairie', 'Fort Worth', 'DFW Metroplex'].map(area => (
                <span key={area} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium inline-flex items-center gap-1">
                  <HiLocationMarker className="inline w-3.5 h-3.5 text-primary-600" /> {area}
                </span>
              ))}
            </div>

            {/* Supporting image */}
            <img
              src="/about.png"
              alt="Loving Source Logistics warehouse and delivery operations"
              className="w-full h-56 object-cover rounded-2xl shadow-md mt-6"
            />
          </div>

          {/* Right — reasons grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl border border-gray-100 hover:border-primary-100 hover:shadow-lg hover:shadow-primary-50 transition-all duration-300"
              >
                <div className={`w-11 h-11 ${r.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                  {r.icon}
                </div>
                <h3 className="font-display font-semibold text-navy-950 mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
