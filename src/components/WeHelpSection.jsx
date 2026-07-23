"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WeHelpSection() {
  return (
    // এখানে bg-[#1e2736] ব্যবহার করা হয়েছে যা তোমার ছবির কালারের সাথে হুবহু মিলে যাবে
    <section className="bg-[#111827] text-white py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"> 
        
        {/* Left Content (Text) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.2]"
          >
            We Help at Every Step from <br className="hidden md:block" /> Concept to Market
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-base mb-10 leading-relaxed max-w-md"
          >
            Discover projects just for you and get great recommendations when you select your interests.
          </motion.p>

          <motion.ul 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-5 text-base font-medium"
          >
            <motion.li 
              whileHover={{ x: 8 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-4 cursor-default"
            >
              <CheckCircle2 className="text-amber-400 shrink-0" size={24} />
              Raise funds with a crowdfunding campaign
            </motion.li>
            <motion.li 
              whileHover={{ x: 8 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-4 cursor-default"
            >
              <CheckCircle2 className="text-amber-400 shrink-0" size={24} />
              Extend your campaign with InDemand
            </motion.li>
            <motion.li 
              whileHover={{ x: 8 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center gap-4 cursor-default"
            >
              <CheckCircle2 className="text-amber-400 shrink-0" size={24} />
              Fast track to the global market
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Right Content (Image) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative mt-8 md:mt-0"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
              alt="experts" 
              className="w-full h-[400px] object-cover origin-center" 
            />
          </div>
          
          {/* Green Badge with Pop Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4, 
              type: "spring", 
              bounce: 0.5 
            }}
            className="absolute -bottom-8 -left-8 bg-emerald-500 text-zinc-950 p-6 rounded-xl shadow-xl max-w-xs font-bold text-sm hidden sm:block"
          >
            All the Right Experts to Help Your Business
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}