import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Rocket, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="glass mt-32 border-t border-slate-200 dark:border-slate-800/50 pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Background decoration line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="text-indigo-600 dark:text-cyan-400 mr-2"
              >
                <Rocket size={28} />
              </motion.div>
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                ElevateU ✦
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Empowering students to build their best selves through AI-driven insights for style, communication, and confidence.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="https://github.com/Jaanvichouhan34" color="indigo" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              } />
              <SocialIcon href="https://www.linkedin.com/in/jaanvi-chouhan" color="cyan" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              } />
              <SocialIcon href="mailto:jaanvichouhan18805@gmail.com" color="red" icon={<Mail size={20} />} />
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:pl-10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-500 mb-8">Platform</h4>
            <ul className="space-y-4">
              <FooterLink to="/outfit-scanner" label="Outfit Scanner" />
              <FooterLink to="/event-prep" label="Event Preparation" />
              <FooterLink to="/trainer" label="AI Trainer" />
              <FooterLink to="/dashboard" label="Dashboard" />
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:pl-10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-500 mb-8">Company</h4>
            <ul className="space-y-4">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/help" label="Help Center" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="p-8 rounded-[2.5rem] bg-indigo-600/5 dark:bg-indigo-600/10 border border-indigo-600/10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-500 mb-4">Newsletter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">
              Join 2,000+ students getting weekly AI growth tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 ring-indigo-500/20 transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center space-x-2"
              >
                {subscribed ? (
                  <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }}>Subscribed! ✨</motion.span>
                ) : (
                  <>
                    <span>Join Now</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center text-xs font-bold text-slate-400">
            © {new Date().getFullYear()} ElevateU. Made with <Heart size={14} className="mx-1.5 text-red-500 fill-red-500 animate-pulse" /> by Jaanvi Chouhan
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon, color }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.1 }}
    className={`p-3 glass rounded-2xl text-slate-400 hover:text-${color}-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all`}
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ to, label }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:translate-x-2 inline-block transition-all duration-300"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
