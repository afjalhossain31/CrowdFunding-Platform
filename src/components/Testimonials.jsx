"use client";
import React from "react";
import { motion } from "framer-motion"; // framer-motion ইম্পোর্ট করা হয়েছে
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Creator",
    image: "https://i.pravatar.cc/150?img=47",
    quote: "Crowdfund helped me launch my eco-friendly clothing line. The support from the community was overwhelming, and the platform's transparent credit system made everything effortless!"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Supporter",
    image: "https://i.pravatar.cc/150?img=11",
    quote: "I love exploring innovative campaigns here. The secure payment system and the ability to track my contributions on the dashboard make it my absolute favorite platform."
  },
  {
    id: 3,
    name: "Amina Rahman",
    role: "Creator",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "Thanks to this platform, our rural education initiative reached its funding goal in just two weeks. The withdrawal process was incredibly smooth and hassle-free."
  },
  {
    id: 4,
    name: "Marcus Doe",
    role: "Supporter",
    image: "https://i.pravatar.cc/150?img=33",
    quote: "The user interface is fantastic! It feels great to be part of something bigger and directly help creators bring their amazing projects to life. Highly recommended!"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the creators who brought their dreams to life and the supporters who made it all possible.
          </p>
        </motion.div>

        {/* Swiper Slider with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14" // Padding bottom for pagination bullets
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
                  
                  {/* Quote Icon */}
                  <div className="text-emerald-200 mb-6">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 italic mb-8 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}