import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, MessageSquare, User, Info, CheckCircle2, ChevronRight, BookOpen, Sparkles, Target, Zap, Clock } from 'lucide-react';
import { prepData } from '../data/prepData';

const EventPrep = () => {
  const [selectedEvent, setSelectedEvent] = useState('Interview');
  const [activeTab, setActiveTab] = useState('outfit'); // 'outfit', 'communication', 'bodyLanguage'

  const events = [
    { id: 'Interview', icon: '💼' },
    { id: 'Viva', icon: '🎓' },
    { id: 'Presentation', icon: '📊' },
    { id: 'Group Discussion', icon: '👥' },
    { id: 'Meeting', icon: '🤝' },
    { id: 'First Date', icon: '✨' }
  ];

  const tabs = [
    { id: 'outfit', label: 'Outfit', icon: <Shirt size={18} /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare size={18} /> },
    { id: 'bodyLanguage', label: 'Body Language', icon: <User size={18} /> }
  ];

  const currentData = prepData[selectedEvent];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
            <BookOpen size={14} /> <span>Preparation Guide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">Event <span className="text-indigo-600 dark:text-cyan-400">Preparation</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">Complete toolkits to master your presence at any critical life event.</p>
        </motion.div>

        {/* Event Selector Pill */}
        <div className="flex p-2 glass rounded-[2.5rem] shadow-2xl border-indigo-500/10 overflow-x-auto max-w-full">
           {events.map((event) => (
             <button 
               key={event.id}
               onClick={() => {
                 setSelectedEvent(event.id);
                 setActiveTab('outfit');
               }}
               className={`px-6 py-3 rounded-[1.5rem] text-sm font-black transition-all flex items-center space-x-2 shrink-0 ${selectedEvent === event.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
             >
                <span>{event.icon}</span>
                <span>{event.id}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Left Column: Guidance Content */}
         <div className="lg:col-span-8 space-y-8">
            <div className="glass rounded-[3.5rem] border-indigo-500/5 shadow-2xl overflow-hidden shadow-indigo-500/5">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 dark:border-slate-800">
                   {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-6 flex items-center justify-center space-x-3 font-black text-sm uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                         {tab.icon}
                         <span>{tab.label}</span>
                         {activeTab === tab.id && (
                           <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600" />
                         )}
                      </button>
                   ))}
                </div>

                <div className="p-10 md:p-16">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedEvent + activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                         {Object.entries(currentData[activeTab]).map(([section, tips], idx) => (
                            <div key={section} className="space-y-6">
                               <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 font-black">
                                     {idx + 1}
                                  </div>
                                  <h3 className="text-2xl font-black tracking-tight italic">{section}</h3>
                               </div>
                               <div className="grid grid-cols-1 gap-4 pl-14">
                                  {tips.map((tip, i) => (
                                     <motion.div 
                                       key={i}
                                       initial={{ opacity: 0, x: 20 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{ delay: i * 0.1 }}
                                       className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-start space-x-4 group hover:border-indigo-500/30 transition-all shadow-sm"
                                     >
                                        <CheckCircle2 size={18} className="text-indigo-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{tip}</p>
                                     </motion.div>
                                  ))}
                               </div>
                            </div>
                         ))}
                      </motion.div>
                   </AnimatePresence>
                </div>
            </div>
         </div>

         {/* Right Column: Event Stats & Pro Tips */}
         <div className="lg:col-span-4 space-y-8">
            <div className="glass rounded-[3rem] p-10 border-indigo-500/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
               <h3 className="font-black text-xl mb-8 flex items-center italic">
                  <Sparkles size={20} className="mr-3 text-indigo-600" /> Professional Edge
               </h3>
               <div className="space-y-6">
                  <ProTipItem icon={<Zap size={18} />} title="Quick Win" text="Arrive 10 minutes early to visualize the space and calm your breath." />
                  <ProTipItem icon={<Target size={18} />} title="Core Objective" text={`To project confidence, authority, and authenticity during your ${selectedEvent}.`} />
                  <ProTipItem icon={<Clock size={18} />} title="Last Minute" text="Check your appearance in a mirror before entering the venue." />
               </div>
            </div>

            <div className="glass rounded-[3rem] p-10 border-yellow-500/5 shadow-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
               <h3 className="font-black text-xl mb-4 italic flex items-center">
                  <Info size={20} className="mr-3 text-yellow-400" /> Experts Say
               </h3>
               <p className="text-sm font-medium opacity-90 italic leading-relaxed mb-8">
                 "Preparation is the key to confidence. When you know you look the part and have your message ready, your brain can focus on performing at its best."
               </p>
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black">AU</div>
                  <div>
                     <p className="text-xs font-black uppercase tracking-widest">Aditi Uppal</p>
                     <p className="text-[10px] opacity-70">Style & Etiquette Coach</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const ProTipItem = ({ icon, title, text }) => (
  <div className="space-y-2">
     <div className="flex items-center space-x-2 text-indigo-600">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
     </div>
     <p className="text-xs font-bold text-slate-500 leading-relaxed pl-7">{text}</p>
  </div>
);

export default EventPrep;
