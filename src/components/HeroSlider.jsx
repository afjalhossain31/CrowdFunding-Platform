"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    bgImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop",
    badge: "Empower Innovators",
    title: "Empower Innovators & Dreamers",
    subtitle: "Join a community that brings groundbreaking projects to life. Your support can turn a brilliant idea into reality.",
    buttonText: "Explore Campaigns",
    buttonLink: "/explore-campaigns",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop",
    badge: "Launch & Grow",
    title: "Launch Your Creative Project",
    subtitle: "Have a unique idea? Our platform provides the tools and audience to help you raise funds and make it happen.",
    buttonText: "Start a Campaign",
    buttonLink: "/dashboard/add-campaign",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    badge: "Community Impact",
    title: "Make a Difference, One Contribution",
    subtitle: "Support causes you care about, from community projects to technological innovations. Every contribution counts.",
    buttonText: "Explore Campaigns",
    buttonLink: "/explore-campaigns",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative h-[calc(100vh-80px)] min-h-[550px] w-full overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        /* navigation={false} লেখাও বাদ দিয়েছি, যাতে ট্রিগার না হয় */
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="effect-fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="h-full w-full hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />

              <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full text-white">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <span className="inline-block bg-blue-600/90 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 shadow-sm backdrop-blur-sm">
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed font-normal">
                    {slide.subtitle}
                  </p>

                  {/* Action Button */}
                  <div>
                    <Link
                      href={slide.buttonLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-7 py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-600/30 active:scale-95"
                    >
                      {slide.buttonText} <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}