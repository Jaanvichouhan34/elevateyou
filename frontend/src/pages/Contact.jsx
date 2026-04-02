import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageSquare, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 top-[-200px] left-[-100px]" />
      
      <div className="flex flex-col lg:flex-row gap-20 relative z-10">
         {/* Left Side: Info */}
         <div className="lg:w-1/3 space-y-12">
            <div className="space-y-6">
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest"
               >
                  <Sparkles size={14} /> <span>Get in touch</span>
               </motion.div>
               <h1 className="text-6xl font-black tracking-tighter italic leading-[0.9]">
                  Let's <span className="text-indigo-600">talk</span> <br />about you.
               </h1>
               <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  Have questions about our AI models or need help with your account? Our team is here to support your growth.
               </p>
            </div>

            <div className="space-y-8">
               <ContactInfo icon={<Mail />} label="Email Us" value="hello@elevateu.ai" />
               <ContactInfo icon={<Phone />} label="Call Support" value="+1 (555) 000-ELEV" />
               <ContactInfo icon={<MapPin />} label="Visit Studio" value="Silicon Valley, California" />
            </div>
         </div>

         {/* Right Side: Form */}
         <div className="lg:w-2/3">
            <div className="glass p-12 md:p-20 rounded-[4rem] border-indigo-500/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
               
               {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                  >
                     <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-green-500/40">
                        <CheckCircle size={48} />
                     </div>
                     <h2 className="text-4xl font-black italic">Message Sent!</h2>
                     <p className="text-slate-500 font-medium max-w-sm mx-auto">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                     <button onClick={() => setSubmitted(false)} className="text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline">SEND ANOTHER MESSAGE</button>
                  </motion.div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputField label="First Name" placeholder="Jane" required />
                        <InputField label="Last Name" placeholder="Doe" required />
                     </div>
                     <InputField label="Email Address" placeholder="jane@example.com" type="email" required />
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Your Message</label>
                        <textarea 
                           className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 h-40 text-sm font-black outline-none focus:border-indigo-500 transition-all shadow-inner"
                           placeholder="Hello, I'm interested in..."
                           required
                        ></textarea>
                     </div>
                     <button 
                        type="submit"
                        className="w-full py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-widest text-sm shadow-2xl shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 group"
                     >
                        <span>SEND MESSAGE</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </form>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-center space-x-6 group">
     <div className="w-14 h-14 rounded-2xl bg-indigo-600/5 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
        {React.cloneElement(icon, { size: 24 })}
     </div>
     <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
        <p className="text-lg font-black tracking-tight">{value}</p>
     </div>
  </div>
);

const InputField = ({ label, placeholder, type = "text", required }) => (
  <div className="space-y-3">
     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">{label}</label>
     <input 
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-sm font-black outline-none focus:border-indigo-500 transition-all shadow-inner"
     />
  </div>
);

export default Contact;
