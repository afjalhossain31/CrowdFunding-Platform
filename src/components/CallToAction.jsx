"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-20 bg-emerald-600 relative overflow-hidden">
      
      {/* Background Decorative Circles with Pulse Animation */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.6, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
      
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.65, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl transform translate-x-1/3 translate-y-1/3"
      ></motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Heading Animation */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
        >
          Ready to Bring Your Idea to Life?
        </motion.h2>
        
        {/* Paragraph Animation */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Join thousands of innovators and creators who have successfully funded their dreams on our platform. Your journey starts today.
        </motion.p>
        
        {/* Buttons Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link 
            href="/dashboard/create-campaign" 
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-slate-50 transition-colors w-full sm:w-auto"
          >
            Start a Campaign
          </Link>
          <Link 
            href="/campaigns" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors w-full sm:w-auto"
          >
            Discover Projects
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}