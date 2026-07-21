"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black dark:text-white w-full">
      
      {/* 1. Hero Section (Slider) */}
      <section className="w-full h-[60vh] md:h-[80vh]">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-full h-full bg-blue-600 text-white p-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Empower Innovation</h1>
              <p className="text-lg md:text-2xl max-w-2xl">Support groundbreaking tech and creative projects today and help shape the future.</p>
              <Link href="/explore" className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition">
                Explore Campaigns
              </Link>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-full h-full bg-green-600 text-white p-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Community First</h1>
              <p className="text-lg md:text-2xl max-w-2xl">Fund local causes, support those in need, and help communities thrive together.</p>
              <Link href="/explore" className="mt-8 px-6 py-3 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-100 transition">
                Start Contributing
              </Link>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-full h-full bg-purple-600 text-white p-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Creative Arts</h1>
              <p className="text-lg md:text-2xl max-w-2xl">Bring independent films, music, fashion brands, and beautiful art to life.</p>
              <Link href="/register" className="mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-md hover:bg-gray-100 transition">
                Join as a Creator
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* 2. Top Funded Campaigns (Placeholder) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Top Funded Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card placeholders - we will fetch actual data from backend later */}
          <div className="p-10 bg-white dark:bg-zinc-900 shadow-md rounded-lg text-center border dark:border-zinc-800">
            <h3 className="font-semibold text-lg">Campaign 1</h3>
            <p className="text-gray-500 mt-2">Data coming soon...</p>
          </div>
          <div className="p-10 bg-white dark:bg-zinc-900 shadow-md rounded-lg text-center border dark:border-zinc-800">
            <h3 className="font-semibold text-lg">Campaign 2</h3>
            <p className="text-gray-500 mt-2">Data coming soon...</p>
          </div>
          <div className="p-10 bg-white dark:bg-zinc-900 shadow-md rounded-lg text-center border dark:border-zinc-800">
            <h3 className="font-semibold text-lg">Campaign 3</h3>
            <p className="text-gray-500 mt-2">Data coming soon...</p>
          </div>
        </div>
      </section>

      {/* 3. Testimonial Section (Placeholder) */}
      <section className="py-20 bg-gray-100 dark:bg-zinc-900 w-full px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-400">Testimonial Slider will be implemented here.</p>
        </div>
      </section>

      {/* 4. Extra Sections (Placeholders) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400">Sign Up - Launch Campaign - Get Funded.</p>
      </section>

    </div>
  );
}