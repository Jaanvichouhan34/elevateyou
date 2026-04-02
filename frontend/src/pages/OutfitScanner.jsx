import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Send, Sparkles, CheckCircle2, XCircle, Info, RefreshCw, Shirt, Search, Trophy, Lightbulb, Target } from 'lucide-react';
import { scannerData } from '../data/scannerData';

const OutfitScanner = () => {
  const [selectedEvent, setSelectedEvent] = useState('Interview');
  const [mode, setMode] = useState('image'); // 'image' or 'text'
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const events = ['Interview', 'Presentation', 'Party', 'Wedding', 'Office', 'College'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (mode === 'image' && !image) return;
    if (mode === 'text' && !description.trim()) return;

    setLoading(true);
    
    // Simulate AI processing and use scannerData fallback
    setTimeout(() => {
      const data = scannerData[selectedEvent];
      setResult({
        ...data,
        analysis: mode === 'image' ? data.image : data.text,
        timestamp: new Date().toLocaleTimeString()
      });
      setLoading(false);
    }, 2000);
  };

  const resetScanner = () => {
    setResult(null);
    setImage(null);
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
            <Search size={14} /> <span>Visual Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">Outfit <span className="text-indigo-600 dark:text-cyan-400">Scanner</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">AI-driven style analysis to ensure you look your best for every occasion.</p>
        </motion.div>

        <div className="flex p-2 glass rounded-[2.5rem] shadow-2xl border-indigo-500/10">
           <button 
             onClick={() => setMode('image')}
             className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all flex items-center ${mode === 'image' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
           >
              <Camera size={18} className="mr-2" /> Image Scan
           </button>
           <button 
             onClick={() => setMode('text')}
             className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all flex items-center ${mode === 'text' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
           >
              <Send size={18} className="mr-2" /> Text Desc
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Event Selection */}
            <div className="lg:col-span-4 space-y-6">
               <div className="glass rounded-[3.5rem] p-10 border-indigo-500/5 shadow-2xl space-y-8">
                  <h3 className="font-black text-2xl italic flex items-center">
                    <Target size={24} className="mr-3 text-indigo-600" /> Target Event
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {events.map(event => (
                       <button
                         key={event}
                         onClick={() => setSelectedEvent(event)}
                         className={`p-5 rounded-[2rem] text-left font-black transition-all flex items-center justify-between border-2 ${selectedEvent === event ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200'}`}
                       >
                         <span className="text-sm tracking-tight">{event}</span>
                         {selectedEvent === event && <motion.div layoutId="check" className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-indigo-600"><CheckCircle2 size={16} /></motion.div>}
                       </button>
                    ))}
                  </div>
               </div>
            </div>

            {/* Upload Area */}
            <div className="lg:col-span-8">
               <div className="glass rounded-[3.5rem] p-10 md:p-16 border-indigo-500/5 shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {mode === 'image' ? (
                     <div className="w-full text-center space-y-10">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        {!image ? (
                           <div 
                             onClick={() => fileInputRef.current.click()}
                             className="border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[4rem] p-20 cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group/box"
                           >
                              <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto mb-8 group-hover/box:scale-110 transition-transform">
                                 <Upload size={40} />
                              </div>
                              <h4 className="text-xl font-black mb-2">Upload Outfit Photo</h4>
                              <p className="text-sm text-slate-400 font-medium">JPEG, PNG or WebP up to 10MB</p>
                           </div>
                        ) : (
                           <div className="relative inline-block">
                              <img src={image} alt="Preview" className="max-h-[400px] rounded-[3.5rem] shadow-2xl border-4 border-white dark:border-slate-800" />
                              <button 
                                onClick={() => setImage(null)}
                                className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all"
                              >
                                 <XCircle size={24} />
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <div className="w-full space-y-8">
                        <div className="text-center space-y-4 mb-8">
                           <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto">
                              <Sparkles size={40} />
                           </div>
                           <h4 className="text-2xl font-black italic">Describe Your Outfit</h4>
                           <p className="text-slate-500 font-medium">Tell us what you're planning to wear.</p>
                        </div>
                        <textarea 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Example: I'm wearing a navy blue slim-fit blazer with a white crisp shirt, dark grey chinos, and brown leather oxfords."
                          className="w-full h-48 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner font-medium leading-relaxed"
                        />
                     </div>
                  )}

                  <button 
                    onClick={handleScan}
                    disabled={loading || (mode === 'image' ? !image : !description.trim())}
                    className="mt-12 w-full max-w-sm py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center disabled:opacity-50"
                  >
                     {loading ? (
                        <div className="flex items-center space-x-3">
                           <RefreshCw size={20} className="animate-spin" />
                           <span>ANALYZING STYLE...</span>
                        </div>
                     ) : (
                        <span>RUN AI ANALYSIS</span>
                     )}
                  </button>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="analysis-result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
             {/* Score Header */}
             <div className="glass rounded-[4rem] p-12 md:p-20 border-indigo-500/5 shadow-2xl overflow-hidden relative">
                <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                   <div className="lg:col-span-3 text-center space-y-4">
                      <div className="relative inline-block">
                         <svg className="w-48 h-48 transform -rotate-90">
                            <circle cx="96" cy="96" r="80" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="12" />
                            <motion.circle 
                               cx="96" cy="96" r="80" 
                               className="stroke-indigo-600 fill-none" 
                               strokeWidth="12" 
                               strokeDasharray="502.4" 
                               initial={{ strokeDashoffset: 502.4 }} 
                               animate={{ strokeDashoffset: 502.4 - (502.4 * (result.score / 10)) }} 
                               transition={{ duration: 2, ease: "easeOut" }} 
                            />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-black text-indigo-600 tracking-tighter">{result.score}<span className="text-xl text-slate-300">/10</span></span>
                         </div>
                      </div>
                      <p className="text-xs font-black uppercase tracking-[.3em] text-indigo-500">Style Rating</p>
                   </div>
                   
                   <div className="lg:col-span-9 space-y-6">
                      <div className="flex items-center space-x-3 text-indigo-600">
                         <Sparkles size={20} />
                         <span className="text-sm font-black uppercase tracking-widest">AI Professional Feedback</span>
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter italic leading-tight">Your <span className="text-indigo-600 dark:text-cyan-400">{selectedEvent}</span> Look</h2>
                      <p className="text-xl text-slate-500 font-medium leading-relaxed italic max-w-3xl">"{result.analysis}"</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Suitable Items */}
                <div className="glass rounded-[3rem] p-10 space-y-8 border-green-500/5 shadow-xl">
                   <h4 className="font-black text-xl flex items-center text-green-600">
                      <CheckCircle2 size={24} className="mr-3" /> Key Strengths
                   </h4>
                   <ul className="space-y-4">
                      {result.appropriate.map((item, i) => (
                         <li key={i} className="flex items-start text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-3 shrink-0" /> {item}
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Improvements */}
                <div className="glass rounded-[3rem] p-10 space-y-8 border-indigo-500/5 shadow-xl bg-indigo-600 text-white">
                   <h4 className="font-black text-xl flex items-center">
                      <Lightbulb size={24} className="mr-3 text-yellow-400" /> Pro Improvements
                   </h4>
                   <ul className="space-y-4">
                      {result.improvements.map((item, i) => (
                         <li key={i} className="flex items-start text-sm font-black tracking-tight leading-snug opacity-90">
                            <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 mr-3 shrink-0" /> {item}
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Avoid Items */}
                <div className="glass rounded-[3rem] p-10 space-y-8 border-red-500/5 shadow-xl">
                   <h4 className="font-black text-xl flex items-center text-red-600">
                      <XCircle size={24} className="mr-3" /> Potential Risks
                   </h4>
                   <ul className="space-y-4">
                      {result.notSuitable.map((item, i) => (
                         <li key={i} className="flex items-start text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-3 shrink-0" /> {item}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>

             {/* Grooming Tips */}
             <div className="glass rounded-[3.5rem] p-12 border-indigo-500/5 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-12">
                   <div className="md:w-1/3">
                      <h4 className="text-3xl font-black tracking-tighter mb-4 italic">Grooming <br /><span className="text-indigo-600">Checklist</span></h4>
                      <p className="text-sm text-slate-500 font-medium">The secret to a great look is in the final details.</p>
                   </div>
                   <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {result.groomingTips.map((tip, i) => (
                         <div key={i} className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-600/10 flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">{i+1}</div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{tip}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="flex justify-center pt-10">
                <button 
                  onClick={resetScanner}
                  className="px-12 py-5 glass border-slate-200 dark:border-slate-800 rounded-[2.5rem] font-black tracking-[0.2em] text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center space-x-3"
                >
                   <RefreshCw size={20} />
                   <span>RESCAN ANOTHER OUTFIT</span>
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutfitScanner;
