"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, Award } from "lucide-react";

import { motion } from "framer-motion";
import TopCampaignsSection from "@/components/TopCampaigns";
import WeHelpSection from "@/components/WeHelpSection";
import Testimonials from "@/components/Testimonials";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    badge: "ULTIMATE CROWDFUNDING PLATFORM",
    title: "Raising Money Has Never Been Easy",
    subtitle: "Discover projects just for you and get great recommendations when you select your interests.",
    buttonText: "EXPLORE PROJECTS",
    buttonLink: "/explore-campaigns",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    badge: "EMPOWER CREATORS & INNOVATORS",
    title: "Turn Your Vision Into Reality",
    subtitle: "Launch your campaign, connect with global supporters, and raise funds securely.",
    buttonText: "START A CAMPAIGN",
    buttonLink: "/dashboard/add-campaign",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 font-sans text-slate-900 dark:text-slate-100 w-full overflow-hidden">

      {/* 1. Hero Section (Inspiried by your design) */}
      <section className="w-full h-[calc(100vh-80px)] min-h-[550px] relative">
        <Swiper
          spaceBetween={0}
          effect="fade"
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="w-full h-full hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex items-center justify-center w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[1px]"></div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">

                  {/* Top Badge */}
                  <div className="inline-block bg-emerald-500 text-zinc-950 font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-1.5 rounded-sm shadow-md mb-6 transform -skew-x-6">
                    <span className="transform skew-x-6">{slide.badge}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed mb-8">
                    {slide.subtitle}
                  </p>

                  {/* Yellow CTA Button */}
                  <Link
                    href={slide.buttonLink}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm uppercase tracking-wider rounded-md shadow-lg transition-all hover:scale-105 active:scale-95"
                  >
                    {slide.buttonText}
                  </Link>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. Top Funded Campaigns Section */}
      <TopCampaignsSection />

      {/* 3. Impact/Counter Section (Light Yellow Matching image_157f38.png) */}
      <section className="w-full bg-[#fce060] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        {/* Optional: Faint Background Pattern (mimicking the raised hands vibe with a subtle gradient/opacity) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center"
          >
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-5xl md:text-6xl font-light mb-2 text-[#2c3e50]">84k</div>
              <div className="text-sm md:text-base font-normal text-[#2c3e50]">Projects are Completed</div>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-5xl md:text-6xl font-light mb-2 text-[#2c3e50]">22k</div>
              <div className="text-sm md:text-base font-normal text-[#2c3e50]">Ideas Raised Funds</div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-5xl md:text-6xl font-light mb-2 text-[#2c3e50]">17k</div>
              <div className="text-sm md:text-base font-normal text-[#2c3e50]">Categories Served</div>
            </motion.div>

            {/* Item 4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-5xl md:text-6xl font-light mb-2 text-[#2c3e50]">88k</div>
              <div className="text-sm md:text-base font-normal text-[#2c3e50]">Happy Customers</div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 4. We Help at Every Step Section */}
      <WeHelpSection />
      <Testimonials/>





    </div>
  );
}