"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";

const slides = [
  {
    bgImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949&auto=format&fit=crop",
    title: "Empower Innovators & Dreamers",
    subtitle: "Join a community that brings groundbreaking projects to life. Your support can turn a brilliant idea into reality.",
    buttonText: "Explore Campaigns",
    buttonLink: "/campaigns",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop",
    title: "Launch Your Creative Project",
    subtitle: "Have a unique idea? Our platform provides the tools and audience to help you raise funds and make it happen.",
    buttonText: "Start a Campaign",
    buttonLink: "/create-campaign",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    title: "Make a Difference, One Contribution at a Time",
    subtitle: "Support causes you care about, from community projects to technological innovations. Every contribution counts.",
    buttonText: "Donate Now",
    buttonLink: "/campaigns",
  },
];

export default function HeroSlider() {
  return (
    <div className="h-[calc(100vh-80px)] w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center text-center">
                <div className="max-w-3xl mx-auto px-4 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.buttonLink}
                    className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
