import { Link } from 'react-router-dom';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Loving Source Logistics" className="h-10 w-auto object-contain" />
             
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Dependable, professional courier and delivery services for healthcare providers, businesses, legal professionals, and automotive companies throughout the Dallas–Fort Worth area.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-white/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Gallery', '/gallery'], ['Contact', '/contact'], ['Request a Quote', '/request-quote']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 hover:text-primary-400 text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-5 text-white/90">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiPhone className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:18665923118" className="text-white/70 hover:text-primary-400 text-sm transition-colors block">1-866-592-3118</a>
                  <a href="tel:6824820556" className="text-white/50 hover:text-primary-400 text-xs transition-colors">Direct: 682-482-0556</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiMail className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <a href="mailto:info@lovingsourcelogistics.com" className="text-white/70 hover:text-primary-400 text-sm transition-colors break-all">info@lovingsourcelogistics.com</a>
              </li>
              <li className="flex items-start gap-3">
                <HiLocationMarker className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">17350 State Hwy 249, Suite 220 # 37201, Houston, TX 77064</span>
              </li>
            </ul>
            <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Business Hours</div>
              <div className="text-white/70 text-sm">Mon–Sun: 8AM – 6PM</div>
              <div className="text-accent-400 text-sm font-medium mt-1">On-demand available 24/7</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span>© {year} Loving Source Logistics LLC. All rights reserved.</span>
          <span className="text-xs">Professional Courier Services | DFW Metroplex, TX</span>
        </div>
      </div>
    </footer>
  );
}
