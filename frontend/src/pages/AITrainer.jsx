import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Zap, Brain, Sparkles, Target, Award, RefreshCw, ChevronRight, CheckCircle, TrendingUp, Trophy } from 'lucide-react';
import { quizData } from '../data/quizData';

const AITrainer = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [quizState, setQuizState] = useState('config'); // config, active, result
  const [topic, setTopic] = useState('Grammar');
  const [level, setLevel] = useState('Basic');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  
  // Chat state
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Communication Coach. Choose a mode or just start typing to practice your conversation skills." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startQuiz = () => {
    // Get questions for the selected topic and level
    const bank = quizData[topic][level];
    // Shuffle and pick 5
    const shuffled = [...bank].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffled);
    setQuizState('active');
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
  };

  const handleAnswer = (optionIndex) => {
    const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);
    
    setUserAnswers([...userAnswers, { 
      question: questions[currentQuestion].text, 
      answer: questions[currentQuestion].options[optionIndex], 
      correct: isCorrect 
    }]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState('result');
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response logic
    const assistantResponse = getAssistantResponse(input, topic);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  const getAssistantResponse = (userInput, context) => {
    const lowInput = userInput.toLowerCase();
    if (lowInput.includes('hello') || lowInput.includes('hi')) return `Hi there! I'm ready to help you with ${context}. What's on your mind today?`;
    if (lowInput.includes('interview')) return "Interviews can be tough! My best advice is to use the STAR method: Situation, Task, Action, Result. Would you like to do a mock interview?";
    if (lowInput.includes('confidence')) return "Confidence comes from preparation. Let's practice some common scenarios to help you feel more at ease.";
    if (lowInput.includes('grammar')) return "Grammar is the foundation of clear communication. I can help you spot common errors in your sentences.";
    
    return `That's an interesting point about ${context}. Can you elaborate more on that? I'm here to refine your professional presence.`;
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
            <Sparkles size={14} /> <span>Smart Training</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">AI <span className="text-indigo-600 dark:text-cyan-400">Trainer</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">Master the art of communication with real-time AI feedback and interactive assessments.</p>
        </motion.div>

        <div className="flex p-2 glass rounded-[2.5rem] shadow-2xl border-indigo-500/10">
           <button 
             onClick={() => setActiveTab('quiz')}
             className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all ${activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
           >
              Knowledge Quiz
           </button>
           <button 
             onClick={() => setActiveTab('chat')}
             className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all ${activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
           >
              Practice Coach
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'quiz' ? (
          <motion.div
            key="quiz-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-[3.5rem] p-8 md:p-20 border-indigo-500/5 shadow-2xl shadow-indigo-500/5 overflow-hidden relative"
          >
            {quizState === 'config' && (
              <div className="max-w-3xl mx-auto space-y-16 py-10">
                <div className="text-center space-y-4">
                   <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto mb-8 shadow-inner">
                      <Brain size={48} />
                   </div>
                   <h2 className="text-4xl font-black tracking-tight">Configure Your Session</h2>
                   <p className="text-slate-500 font-medium">Choose your focus area and difficulty level.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center">
                        <Target size={14} className="mr-2 text-indigo-500" /> Topic
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {['Grammar', 'Vocabulary', 'Scenario'].map(t => (
                          <button
                            key={t}
                            onClick={() => setTopic(t)}
                            className={`p-5 rounded-3xl text-left font-black transition-all flex items-center justify-between border-2 ${topic === t ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200'}`}
                          >
                            <span>{t}</span>
                            {topic === t && <CheckCircle size={20} />}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center">
                        <TrendingUp size={14} className="mr-2 text-indigo-500" /> Difficulty
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {['Basic', 'Intermediate', 'Professional'].map(l => (
                          <button
                            key={l}
                            onClick={() => setLevel(l)}
                            className={`p-5 rounded-3xl text-left font-black transition-all flex items-center justify-between border-2 ${level === l ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200'}`}
                          >
                            <span>{l}</span>
                            {level === l && <CheckCircle size={20} />}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>

                <button 
                  onClick={startQuiz}
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center group"
                >
                   <span>START CHALLENGE</span>
                   <ChevronRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}

            {quizState === 'active' && (
              <div className="max-w-4xl mx-auto py-10">
                 <div className="flex justify-between items-end mb-16 gap-8">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">{topic} • {level}</p>
                      <h3 className="text-xl font-bold text-slate-400">Step {currentQuestion + 1} <span className="text-slate-300 font-medium">/ {questions.length}</span></h3>
                   </div>
                   <div className="flex-1 max-w-xs h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner mb-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      />
                   </div>
                 </div>

                 <motion.h4 
                   key={currentQuestion}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-3xl md:text-5xl font-black mb-16 leading-tight tracking-tight lg:leading-[1.1]"
                 >
                   {questions[currentQuestion].text}
                 </motion.h4>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, x: 8 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAnswer(index)}
                        className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] text-left font-bold hover:border-indigo-500 hover:shadow-2xl transition-all flex items-center group relative overflow-hidden"
                      >
                         <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mr-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm font-black text-lg">
                            {String.fromCharCode(65 + index)}
                         </div>
                         <span className="flex-1 text-lg group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">{option}</span>
                      </motion.button>
                   ))}
                 </div>
              </div>
            )}

            {quizState === 'result' && (
              <div className="max-w-2xl mx-auto py-10 text-center space-y-12">
                 <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-40 h-40 bg-indigo-600 rounded-[3rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-500/40 relative"
                 >
                    <Award size={80} />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 border-2 border-indigo-500 rounded-[3.5rem] opacity-30" 
                    />
                 </motion.div>
                 
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tight italic leading-tight">Challenge <br /><span className="text-indigo-600 dark:text-cyan-400">Complete!</span></h2>
                    <p className="text-slate-500 font-medium text-lg">You've mastered the {topic} {level} module.</p>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] space-y-2 border-indigo-500/10 hover:border-indigo-500/30 transition-all">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Efficiency</p>
                       <p className="text-5xl font-black text-indigo-600 tracking-tighter">{Math.round((score / questions.length) * 100)}%</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] space-y-2 border-indigo-500/10 hover:border-indigo-500/30 transition-all">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Correct</p>
                       <p className="text-5xl font-black text-indigo-600 tracking-tighter">{score}<span className="text-2xl text-slate-300">/{questions.length}</span></p>
                    </div>
                 </div>

                 <div className="space-y-4 pt-10">
                   <button 
                     onClick={() => setQuizState('config')}
                     className="w-full py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center"
                   >
                     <RefreshCw size={20} className="mr-3" /> RETAKE QUIZ
                   </button>
                   <button 
                     onClick={() => setQuizState('config')}
                     className="w-full py-6 glass border-slate-200 dark:border-slate-800 rounded-[2.5rem] font-black tracking-[0.2em] text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                   >
                     EXPLORE OTHER TOPICS
                   </button>
                 </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="chat-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]"
          >
            {/* Sidebar/Stats */}
            <div className="lg:col-span-4 space-y-8">
               <div className="glass rounded-[3.5rem] p-10 border-indigo-500/5 shadow-2xl">
                  <h3 className="font-black text-2xl mb-10 flex items-center italic">
                    <Zap size={24} className="mr-3 text-indigo-600" /> Performance
                  </h3>
                  <div className="space-y-8">
                     <GoalItem label="Clarity of Speech" status="high" />
                     <GoalItem label="Professional Tone" status="medium" />
                     <GoalItem label="Confidence Level" status="low" />
                  </div>
               </div>
               
               <div className="glass rounded-[3.5rem] p-10 border-indigo-500/5 shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative overflow-hidden group">
                  <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  <h3 className="font-black text-2xl mb-4 italic flex items-center">
                    <Trophy size={24} className="mr-3 text-yellow-400" /> Smart Practice
                  </h3>
                  <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed">Choose a real-world scenario to simulate with your AI Coach.</p>
                  <div className="space-y-3">
                     {['Salary Negotiation', 'Ordering Coffee', 'Project Presentation'].map(s => (
                        <button key={s} className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-left text-xs font-black tracking-widest transition-all">
                           {s}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-8 glass rounded-[3.5rem] border-indigo-500/10 shadow-[0_32px_64px_-12px_rgba(99,102,241,0.12)] flex flex-col overflow-hidden relative">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl">
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                       <Bot size={28} />
                    </div>
                    <div>
                       <h3 className="font-black text-lg tracking-tight leading-none italic">AI Prep Coach</h3>
                       <p className="text-[10px] text-green-500 font-black uppercase tracking-[0.2em] mt-2 flex items-center">
                         <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" /> Live Assistance
                       </p>
                    </div>
                  </div>
               </div>

               <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
                  {messages.map((m, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      key={i}
                      className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-sm leading-relaxed shadow-sm ${
                        m.role === 'assistant' 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none' 
                        : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 rounded-br-none font-medium'
                      }`}>
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                       <div className="bg-slate-100 dark:bg-slate-800 p-6 px-8 rounded-[2rem] rounded-bl-none flex space-x-1.5">
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                       </div>
                    </div>
                  )}
               </div>

               <form onSubmit={handleSendMessage} className="p-8 bg-white/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask the coach anything..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] px-10 py-6 pr-20 text-sm outline-none shadow-sm focus:ring-4 ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={isTyping}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-90 flex items-center justify-center disabled:opacity-50"
                    >
                       <Send size={22} />
                    </button>
                  </div>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GoalItem = ({ label, status }) => {
   const colors = {
      high: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]',
      medium: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]',
      low: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
   };
   
   return (
      <div className="space-y-4">
         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <span>{label}</span>
            <span className={status === 'high' ? 'text-green-500' : status === 'medium' ? 'text-yellow-500' : 'text-red-500'}>{status}</span>
         </div>
         <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: status === 'high' ? '92%' : status === 'medium' ? '60%' : '35%' }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className={`h-full rounded-full ${colors[status]}`} 
            />
         </div>
      </div>
   );
};

export default AITrainer;
