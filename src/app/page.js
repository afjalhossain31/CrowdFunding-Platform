"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ArrowRight, CheckCircle2, TrendingUp, Users, ShieldCheck, Award } from "lucide-react";
import TopCampaignsSection from "@/components/TopCampaigns"; // <-- এভাবে ইমপোর্ট করো

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

                  {/* Top Badge (Green Ribbon Style from image) */}
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

                  {/* Yellow CTA Button from image */}
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

      {/* Top Funded Campaigns Section (Matching your requirement & design) */}
      <TopCampaignsSection />



      {/* 3. Yellow Counter/Impact Section (Matching your screenshot) */}
      <section className="bg-amber-400 py-16 px-4 text-zinc-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          <div>
            <div className="text-4xl md:text-5xl font-black mb-1">84k</div>
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-800">Projects are Completed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-1">22k</div>
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-800">Ideas Raised Funds</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-1">17k</div>
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-800">Categories Served</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-1">88k</div>
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-800">Happy Customers</div>
          </div>
        </div>
      </section>

      {/* 4. We Help at Every Step Section (Matching your screenshot) */}
      <section className="bg-slate-800 text-white py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              We Help at Every Step from Concept to Market
            </h2>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              Discover projects just for you and get great recommendations when you select your interests.
            </p>

            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-amber-400 shrink-0" size={20} />
                Raise funds with a crowdfunding campaign
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-amber-400 shrink-0" size={20} />
                Extend your campaign with InDemand
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-amber-400 shrink-0" size={20} />
                Fast track to the global market
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="experts" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-zinc-950 p-6 rounded-xl shadow-xl max-w-xs font-bold text-sm hidden sm:block">
              All the Right Experts to Help Your Business
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}