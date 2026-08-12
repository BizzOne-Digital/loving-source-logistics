import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight, HiPhone, HiShieldCheck, HiClock, HiLocationMarker, HiCube } from 'react-icons/hi';
import api from '../../utils/api';

const defaultHero = {
  headline: 'Reliable Delivery. Professional Service. Every Time.',
  subheadline: 'Medical, Legal, Automotive & Business Courier Services Across the DFW Metroplex',
  ctaText: 'Request a Quote',
  ctaSecondaryText: 'Our Services',
  stats: [
    { value: '500', label: 'Deliveries Completed', suffix: '+' },
    { value: '24', label: 'On-Demand Service', suffix: '/7' },
    { value: '100', label: 'Satisfaction Rate', suffix: '%' },
    { value: '10', label: 'Cities Served', suffix: '+' },
  ]
};

const statIcons = [HiCube, HiClock, HiShieldCheck, HiLocationMarker];
const statTheme = ['pink', 'green', 'pink', 'green'];

export default function Hero() {
  const [hero, setHero] = useState(defaultHero);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    api.get('/hero').then(res => {
      if (res.data) setHero({ ...defaultHero, ...res.data });
    }).catch(() => {});
  }, []);

  const headlineParts = hero.headline.split('.').map(s => s.trim()).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-32 pb-16">
      {/* soft background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary-100 rounded-full blur-3xl opacity-60 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-100 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Right — full-bleed oval-curved image (desktop), positioned relative to the full section, not the padded container */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block absolute top-0 bottom-0 right-0 w-[54%] overflow-hidden"
        style={{ borderRadius: '50% 0 0 50% / 55% 0 0 55%' }}
      >
        <img
          src={hero.backgroundImage?.url || '/car-hero.png'}
          alt="Loving Source Logistics delivery van"
          className="w-full h-full object-cover"
          style={{ objectPosition: '85% center' }}
        />
        <div
          className="absolute inset-y-0 left-0 w-2/5"
          style={{ background: 'linear-gradient(to right, white 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 100%)' }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative grid lg:grid-cols-2 gap-12 items-center min-h-[340px]">
          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="text-primary-600 text-sm font-bold tracking-widest uppercase">
                DFW Metroplex's Trusted Courier
              </span>
              <span className="w-10 h-px bg-primary-300" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              {headlineParts.map((part, i) => (
                <span
                  key={i}
                  className={`block ${i === headlineParts.length - 1 ? 'text-accent-600' : 'text-gray-900'}`}
                >
                  {part}.
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/request-quote" className="btn-primary text-base px-8 py-4">
                {hero.ctaText} <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="btn-outline text-base px-8 py-4">
                <HiPhone className="w-4 h-4" /> {hero.ctaSecondaryText}
              </Link>
            </motion.div>

            {/* Mobile image — simple rounded, shown after text */}
            <div className="lg:hidden mt-10">
              <img
                src={hero.backgroundImage?.url || '/car-hero.png'}
                alt="Loving Source Logistics delivery van"
                className="w-full h-64 sm:h-80 object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Right column spacer (image is absolutely positioned) */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* Stats row */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16"
        >
          {hero.stats?.map((stat, i) => {
            const Icon = statIcons[i] || HiCube;
            const theme = statTheme[i] || 'pink';
            const iconBg = theme === 'pink' ? 'bg-primary-50 text-primary-600' : 'bg-accent-50 text-accent-600';
            const numColor = theme === 'pink' ? 'text-primary-600' : 'text-accent-600';
            return (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-200/50 p-6 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className={`font-display font-bold text-3xl leading-none mb-1 ${numColor}`}>
                    {inView ? (
                      <CountUp
                        end={parseInt(stat.value) || 0}
                        duration={2.5}
                        delay={0.3 + i * 0.2}
                        suffix={stat.suffix || ''}
                      />
                    ) : `${stat.value}${stat.suffix || ''}`}
                  </div>
                  <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
