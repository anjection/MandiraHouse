'use client';

import Script from 'next/script';
import EventSlider from './components/EventSlider';
import EventSliderMenu from './components/EventSliderMenu';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Utensils, ArrowRight, UtensilsCrossed, Clock, MapPin, Globe, Soup, ChevronRight, History, Heart, Users, Instagram, ExternalLink, Menu, X, Truck, Wine } from 'lucide-react';
import { useState, useRef } from 'react';
import style from 'styled-jsx/style';

// MENU DATA - Edit descriptions and prices here
const ALL_MENU_ITEMS = [
  {
    name: 'Nasi Goreng Cikur Babat Sapi',
    price: 'Rp 25k',
    desc: 'Nasi goreng dengan rempah kencur dan gurih dari oncom dipadukan dengan babat sapi, telur ceplok, acar dan krupuk.',
    image: '/MandiraHouse/images/menu-items/Nasgor Cikur Babat Sapi.png'
  },
  {
    name: 'Short Plate Daging Sapi Sauce Lada Hitam',
    price: 'Rp 35k',
    desc: 'Short plate daging sapi dengan saus lada hitam, kentang goreng dan sayuran.',
    image: '/MandiraHouse/images/menu-items/Short Plate Daging Sapi Saus Lada Hitam.png'
  },
  {
    name: 'Spagheti Bolognaise',
    price: 'Rp 25k',
    desc: 'Spagheti dengan saus bolognaise, daging sapi cincang, dan keju parmesan.',
    image: '/MandiraHouse/images/menu-items/Spagheti Bolognaise.png'
  },
  {
    name: 'Udang Sc Mentega',
    price: 'Rp 35k',
    desc: 'Udang saus mentega, nasi putih, dan sayuran.',
    image: '/MandiraHouse/images/menu-items/Udang Sc Mentega.png'
  },
  {
    name: 'Fuyung Hai Isi Seafood',
    price: 'Rp 25k',
    desc: 'Fuyunghai dengan seafood, nasi putih.',
    image: '/MandiraHouse/images/menu-items/Fuyunghai Isi Seafood.png'
  },
  {
    name: 'Snack Platter',
    price: 'Rp 20k',
    desc: 'Kentang goreng, sosis, nugget, dan onion ring.',
    image: '/MandiraHouse/images/menu-items/Snack Platter.png'
  },
  {
    name: 'Capcay Goreng Kuah Ayam',
    price: 'Rp 20k',
    desc: 'Capcay goreng dengan kuah, nasi putih, dan ayam.',
    image: '/MandiraHouse/images/menu-items/Capcay Goreng Kuah Ayam.png'
  },
  {
    name: 'Bakwan Jagung Bumbu Kacang',
    price: 'Rp 15k',
    desc: 'Bakwan jagung dengan bumbu kacang.',
    image: '/MandiraHouse/images/menu-items/Bakwan Jagung Bumbu Kacang .png'
  },
];

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 items initially (2 rows x 3 cols)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [heroDishName, setHeroDishName] = useState('Nasi Goreng');
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#2d2d2d] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-[0.2em] text-amber-900"
            style={{ fontFamily: "'Julius Sans One', sans-serif" }}
          >
            MANDIRA
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            {[
              { name: 'Menu', href: '#menu' },
              { name: 'Our Services', href: '#about' },
              { name: 'Gallery', href: '#gallery' },
              { name: 'Contact', href: '#contact' }
            ].map((item, i) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={item.href}
                className="hover:text-amber-700 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href="https://wa.me/6285378736669" // Updated for consistency
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-amber-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/20"
          >
            Book Now
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-stone-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 overflow-hidden"
            >
              <div className="p-6 flex text-center flex-col gap-6">
                {[
                  { name: 'Menu', href: '#menu' },
                  { name: 'Our Services', href: '#about' },
                  { name: 'Gallery', href: '#gallery' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="mobile-nav-link text-stone-900 text-lg font-medium uppercase tracking-widest hover:text-amber-700 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 10);
                    }}
                  >
                    {item.name}
                  </a>
                ))}

                <a
                  href="https://wa.me/6285378736669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-900 text-white px-6 py-4 rounded-full text-center text-sm font-medium uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen lg:h-screen flex items-start lg:items-center pt-32 lg:pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          >
            <div className="absolute inset-0 bg-[url('/MandiraHouse/images/hero-bg.jpg')] bg-cover bg-center" />
          </motion.div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/50 -skew-x-12 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[40%_60%] gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Indonesian • Western • Chinese
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] text-stone-900">
                Elevating<br />
                <span className="text-amber-700 italic">Local</span> <br />
                Taste.
              </h1>
              <p className="mt-6 text-lg text-stone-600 max-w-md leading-relaxed">
                Experience the rich heritage of local Indonesian spices, the comfort of Western classics, and the bold tastes of Chinese cuisine, all under one roof at Mandira.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-amber-900 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-amber-800 transition-all shadow-xl shadow-amber-900/30"
              >
                View Our Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full font-semibold border-2 border-stone-200 hover:border-amber-900 hover:text-amber-900 transition-all"
              >
                Our Services
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-stone-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-stone-400">Open Daily</p>
                  <p className="text-sm font-semibold">10am - 10pm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-700">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-stone-400">Cuisine</p>
                  <p className="text-sm font-semibold">Multi-Cultural</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-700">
                  <Soup className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-stone-400">Authentic</p>
                  <p className="text-sm font-semibold">Local Spices</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative block order-1 lg:order-2"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl h-[450px] lg:h-[720px]">
              <EventSliderMenu onNameChange={setHeroDishName} />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-900/10 rounded-full blur-3xl" />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-2 lg:-right-12 top-[2%] bg-white p-6 rounded-2xl shadow-xl z-20 scale-90 lg:scale-100" // Adjusted for mobile visibility
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Chef's Selection</p>
                  <p className="text-xs text-stone-500">{heroDishName} <span style={{ fontFamily: "'Julius Sans One', sans-serif" }}>MANDIRA</span></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-amber-700 font-bold uppercase tracking-[0.2em] text-sm"
            >
              Our Culinary Selection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 text-stone-900"
            >
              Explore Our Menu
            </motion.h2>
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {ALL_MENU_ITEMS.slice(0, visibleCount).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-stone-50 rounded-3xl overflow-hidden border border-stone-100 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      <span className="text-amber-900 font-bold text-sm">{item.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <button className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-900 group-hover:gap-3 transition-all">
                      Order Now <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More Button */}
          {visibleCount < ALL_MENU_ITEMS.length && (
            <div className="mt-12 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1, y: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setVisibleCount(ALL_MENU_ITEMS.length)}
                className="flex flex-col items-center gap-2 text-amber-900 font-bold uppercase tracking-widest text-sm"
              >
                <span>View All Menu</span>
                <div className="w-10 h-10 rounded-full border-2 border-amber-900 flex items-center justify-center animate-bounce">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Our Services Section */}
      <section id="about" ref={aboutRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl h-[500px] md:h-[700px] bg-stone-200">
                <EventSlider onPauseChange={setIsSliderPaused} />
              </div>
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isSliderPaused ? 0 : 1, x: isSliderPaused ? 20 : 0 }}
                whileInView={{ opacity: isSliderPaused ? 0 : 1, x: isSliderPaused ? 20 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -right-8 top-1/4 bg-white p-8 rounded-3xl shadow-2xl z-20 max-w-[200px]"
              >
                <p className="text-4xl font-serif font-bold text-amber-900">12+</p>
                <p className="text-sm font-bold text-stone-500 uppercase tracking-wider mt-1">Years of Culinary Excellence</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isSliderPaused ? 0 : 1, x: isSliderPaused ? -20 : 0 }}
                whileInView={{ opacity: isSliderPaused ? 0 : 1, x: isSliderPaused ? -20 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -left-8 bottom-1/4 bg-amber-900 p-8 rounded-3xl shadow-2xl z-20 text-white max-w-[200px]"
              >
                <p className="text-4xl font-serif font-bold">100%</p>
                <p className="text-sm font-bold opacity-80 uppercase tracking-wider mt-1">Authentic Ingredients</p>
              </motion.div>

              {/* Decorative Background Shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-50 rounded-full -z-10 blur-3xl opacity-50" />
            </motion.div>

            <motion.div style={{ y: textY }} className="space-y-12">
              <div>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-amber-700 font-bold uppercase tracking-[0.2em] text-sm"
                >
                  Our Services
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-serif font-bold mt-4 text-stone-900 leading-tight"
                >
                  Our Services <br />
                  <span className="text-amber-700 italic">Taste & Tradition</span>
                </motion.h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: <Utensils className="w-6 h-6" />,
                    title: <>Dine in at <span style={{ fontFamily: "'Julius Sans One', sans-serif" }}>MANDIRA</span> House</>,
                    desc: "Experience our warm hospitality and exquisite atmosphere in the heart of the city with our signature dishes."
                  },
                  {
                    icon: <Truck className="w-6 h-6" />,
                    title: "Catering Service",
                    desc: "Bring the flavors of Mandira to your special events with our professional and customizable catering solutions."
                  },
                  {
                    icon: <Wine className="w-6 h-6" />,
                    title: "Private Dining",
                    desc: "Exclusive and intimate dining experiences tailored for your most memorable occasions and private gatherings."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-amber-700 border border-stone-100">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                <a
                  href="https://wa.me/6285378736669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold hover:bg-stone-800 transition-all shadow-xl inline-flex items-center gap-3 group"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Story Section / Gallery */}
      <section id="gallery" className="py-24 bg-stone-900 text-white overflow-hidden">
        <div id="instagram" className="absolute" /> {/* Secondary ID for instagram link */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-amber-400 font-bold uppercase tracking-widest text-sm mb-4"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow Our Journey</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl   font-bold"
                style={{ fontFamily: "'Julius Sans One', sans-serif" }}
              >
                Mandira<span className="italic text-amber-400">on Instagram</span>
              </motion.h2>
            </div>
            <motion.a
              href="https://www.instagram.com/mandira.ig" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs border-b border-stone-700 pb-1"
            >
              @mandira <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { url: '/MandiraHouse/images/insta-1.jpg', label: 'Chef at work' },
              { url: '/MandiraHouse/images/insta-2.jpg', label: 'Signature Drinks' },
              { url: '/MandiraHouse/images/insta-3.jpg', label: 'Cozy Corner' },
              { url: '/MandiraHouse/images/insta-4.jpg', label: 'Plating Art' },
              { url: '/MandiraHouse/images/insta-5.jpg', label: 'Fresh Pizza' },
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={story.url}
                  alt={story.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Instagram Story Ring Effect */}
                <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-amber-500 rounded-2xl transition-all duration-300 m-1" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-500 p-0.5 mb-2">
                    <div className="w-full h-full bg-stone-800 rounded-full flex items-center justify-center">
                      <Instagram className="w-3 h-3 text-amber-500" />
                    </div>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">{story.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
          {/* Logo Container - Adjust width here (e.g. w-32, w-40, w-[200px]) to resize */}
          <div className="relative w-[200px]">
            <img
              src="/MandiraHouse/Logo_mandira.svg"
              alt="MANDIRA"
              className="w-full h-auto object-contain brightness-0 invert"
            />
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/mandira.ig" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="/MandiraHouse" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
