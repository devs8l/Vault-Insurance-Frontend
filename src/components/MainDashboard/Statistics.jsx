import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Statistics = () => {

  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    clients: 0,
    claims: 0,
    awards: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate numbers when component comes into view
            animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateNumbers = () => {
    const duration = 5000; 
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        years: Math.floor(progress * 23),
        clients: Math.floor(progress * 2000),
        claims: Math.floor(progress * 10),
        awards: Math.floor(progress * 100)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };


  const testimonials = [
    {
      id: 1,
      quote: "they organized their work and internal management was outstanding!",
      name: "denise the menace",
      image: "/images/testimonial1.png"
    },
    {
      id: 2,
      quote: "working with them was a great experience",
      name: "richie rich",
      image: "/images/testimonial2.png"
    },
    {
      id: 3,
      quote: "they tailor their solutions to our specifin needs and goals.",
      name: "noddy",
      image: "/images/testimonial-3.png"
    },
    {
      id: 4,
      quote: "working with them was a great experience",
      name: "richie rich",
      image: "/images/testimonial2.png"
    }
  ];

  return (
    <>
      {/* Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#5bb5ee] to-[#7aa1ff] rounded-[30px] mx-4 md:mx-5 my-5 md:my-5 relative overflow-hidden">
        <div className="relative z-10">
          {/* Statistics Grid */}
      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
  <div className="text-center p-4">
    <div className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-4">
      {animatedStats.years}+
    </div>
    <div className="text-[14px] md:text-[18px] text-white">
      years of experience
    </div>
  </div>
  <div className="text-center p-4">
    <div className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-4">
      {animatedStats.clients}+
    </div>
    <div className="text-[14px] md:text-[18px]  text-white">
      clients served
    </div>
  </div>
  <div className="text-center p-4">
    <div className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-4">
      ₹{animatedStats.claims} Cr+
    </div>
    <div className="text-[14px] md:text-[18px] text-white">
      in claims paid
    </div>
  </div>
  <div className="text-center p-4">
    <div className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-4">
      {animatedStats.awards}+
    </div>
    <div className="text-[14px] md:text-[18px]  text-white">
      industry awards
    </div>
  </div>
</div>

         

{/* Insurance Partners */}
<div className="w-full px-4 md:px-6 lg:px-0 mb-12 md:mb-20 mt-12 ml-6 md:mt-30">
  <div className="bg-white rounded-l-[20px] md:rounded-l-[30px] p-4 sm:p-6 md:p-20 relative">

    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#22272b] mb-15 sm:mb-8 md:mb-20 text-left">
      Our Insurance Partners
    </h2>

    {/* Mobile Swiper: 2 rows */}
    <div className="block md:hidden">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        spaceBetween={20}
      >
        {[
          "/images/hdfc-logo.png",
          "/images/birla-logo.png",
          "/images/sbi-logo.png",
          "/images/axis-logo.png",
          "/images/lic-logo.png",
          "/images/icici-logo.png",
        ].map((src, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1">
              <img src={src} alt="Insurance Partner" className="h-12 w-auto mx-auto mb-4" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        spaceBetween={20}
      >
        {[
          "/images/axis-logo.png",
          "/images/hdfc-logo.png",
          "/images/birla-logo.png",
          "/images/lic-logo.png",
          "/images/sbi-logo.png",
          "/images/icici-logo.png",
        ].map((src, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1">
              <img src={src} alt="Insurance Partner" className="h-12 w-auto mx-auto mb-4" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Desktop Swiper: single row */}
    <div className="hidden md:block">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {[
          { src: "/images/hdfc-logo.png", alt: "HDFC Life" },
          { src: "/images/birla-logo.png", alt: "Birla Sun Life" },
          { src: "/images/sbi-logo.png", alt: "SBI Life" },
          { src: "/images/axis-logo.png", alt: "AXIS Bank" },
          { src: "/images/lic-logo.png", alt: "LIC" },
          { src: "/images/icici-logo.png", alt: "ICICI Prudential" },
        ].map((partner, index) => (
          <SwiperSlide key={index}>
            <img
              src={partner.src}
              alt={partner.alt}
              className="h-16 w-auto mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Right side image (only for desktop) */}
    <div className="absolute z-10 right-0 top-1/2 -translate-y-1/2 lg:block mt-10">
      <img
        src="/images/search-img.png"
        alt="Statistics Illustration"
        className="w-auto h-[250px] sm:h-[300px] lg:h-[450px] md:ml-15"
      />
    </div>
  </div>
</div>


          
  {/* Testimonials Section */}
    <div className="mt-12 md:mt-30 px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-left md:px-10">
        Stories from Our Vaulters
      </h2>
      <p className="text-[14px] md:text-[15px] text-white/90 mb-10 md:mb-12 text-left md:px-10">
        Join 1000s of Happy Souls Who Have Trusted Vault — Become a Vaulter Today!
      </p>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mb-10 swiper-container-with-custom-pagination"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="flex h-full">
            <div className="bg-white rounded-[24px] p-8 shadow-md w-full flex flex-col justify-between min-h-[230px] md:min-h-[250px]">
              <p className="text-[14px] md:text-[18px] font-bold text-[#4788dc] mb-8 leading-relaxed">
                “{testimonial.quote}”
              </p>
              <div className="flex items-center space-x-4 mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <span className="text-base md:text-[12px] font-semibold text-[#596069]">
                  {testimonial.name}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
        </div>
      </section>

      {/* Corporate Clients Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#22272b] mb-8 md:mb-12 lg:mb-16">Our Corporate Insurance Clients</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            <img src="/images/NCC-logo.png" alt="NCC" className="h-16 md:h-20 lg:h-24 w-auto" />
            <img src="/images/trivik.png" alt="Trivik" className="h-12 md:h-16 lg:h-20 w-auto" />
            <img src="/images/ramada.png" alt="Ramada" className="h-12 md:h-16 lg:h-20 w-auto" />
            <img src="/images/sri-gos.png" alt="Sri-Gos" className="h-12 md:h-16 lg:h-20 w-auto" />
            <img src="/images/NCC-1-logo.png" alt="NCC-1" className="h-16 md:h-20 lg:h-24 w-auto rounded-2xl" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistics;

