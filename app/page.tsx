'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Utensils, ArrowRight, UtensilsCrossed, Clock, MapPin, Globe, Soup, ChevronRight, History, Heart, Users, Instagram, ExternalLink } from 'lucide-react';
import { useState, useRef } from 'react';

const MENU_CATEGORIES = [
  { id: 'indonesian', name: 'Indonesian', icon: '🇮🇩' },
  { id: 'western', name: 'Western', icon: '🍔' },
  { id: 'chinese', name: 'Chinese', icon: '🥢' },
];

const MENU_ITEMS = {
  indonesian: [
    { name: 'Nasi Goreng Mandira', price: 'Rp 45k', desc: 'Signature fried rice with chicken, prawns, and authentic local spices.', image: '/OPMandira/images/nasi-goreng.png' },
    { name: 'Sate Ayam Madura', price: 'Rp 38k', desc: 'Grilled chicken skewers served with rich peanut sauce and rice cakes.', image: '/OPMandira/images/sate-ayam.png' },
    { name: 'Gado-Gado', price: 'Rp 32k', desc: 'Traditional vegetable salad with tofu, tempeh, and peanut dressing.', image: '/OPMandira/images/gado-gado.png' },
  ],
  western: [
    { name: 'Mandira Beef Burger', price: 'Rp 65k', desc: 'Juicy wagyu patty with caramelized onions, cheddar, and secret sauce.', image: '/OPMandira/images/beef-burger.png' },
    { name: 'Grilled Salmon Steak', price: 'Rp 120k', desc: 'Fresh Atlantic salmon with lemon butter sauce and mashed potatoes.', image: '/OPMandira/images/salmon-steak.png' },
    { name: 'Creamy Carbonara', price: 'Rp 55k', desc: 'Classic pasta with smoked beef, parmesan, and rich cream sauce.', image: '/OPMandira/images/carbonara.png' },
  ],
  chinese: [
    { name: 'Dim Sum Platter', price: 'Rp 42k', desc: 'Assorted handmade dumplings served with chili oil and soy sauce.', image: '/OPMandira/images/dim-sum.jpg' },
    { name: 'Kung Pao Chicken', price: 'Rp 48k', desc: 'Stir-fried chicken with peanuts, vegetables, and spicy Szechuan sauce.', image: '/OPMandira/images/kung-pao.jpg' },
    { name: 'Beef Black Pepper', price: 'Rp 58k', desc: 'Tender beef slices tossed in aromatic black pepper sauce.', image: '/OPMandira/images/beef-black-pepper.jpg' },
  ],
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('indonesian');
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

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            {['Menu', 'About', 'Gallery', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="hover:text-amber-700 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href="https://wa.me/6281234567890" // You can change this number
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-800 transition-all shadow-lg shadow-amber-900/20"
          >
            Book a Table
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          >
            <div className="absolute inset-0 bg-[url('/OPMandira/images/hero-bg.jpg')] bg-cover bg-center" />
          </motion.div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/50 -skew-x-12 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Indonesian • Western • Chinese
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] text-stone-900">
                A Fusion of <br />
                <span className="text-amber-700 italic">Global</span> <br />
                Flavors.
              </h1>
              <p className="mt-6 text-lg text-stone-600 max-w-md leading-relaxed">
                Experience the rich heritage of Indonesian spices, the comfort of Western classics, and the bold tastes of Chinese cuisine, all under one roof at Mandira.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#menu" className="group bg-amber-900 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-amber-800 transition-all shadow-xl shadow-amber-900/30">
                View Our Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#instagram" className="px-8 py-4 rounded-full font-semibold border-2 border-stone-200 hover:border-amber-900 hover:text-amber-900 transition-all">
                Our Story
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
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/OPMandira/images/signature-dish.jpg"
                alt="Mandira Cafe Signature Dish"
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-900/10 rounded-full blur-3xl" />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 top-1/4 bg-white p-6 rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Chef's Special</p>
                  <p className="text-xs text-stone-500">Nasi Goreng <span style={{ fontFamily: "'Julius Sans One', sans-serif" }}>MANDIRA</span></p>
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

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeCategory === cat.id
                    ? 'bg-amber-900 text-white shadow-lg shadow-amber-900/20'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {MENU_ITEMS[activeCategory as keyof typeof MENU_ITEMS].map((item, index) => (
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
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="/OPMandira/images/restaurant-interior.jpg"
                  alt="Mandira Restaurant Interior"
                  className="w-full h-[700px] object-cover"
                />
              </div>
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-8 top-1/4 bg-white p-8 rounded-3xl shadow-2xl z-20 max-w-[200px]"
              >
                <p className="text-4xl font-serif font-bold text-amber-900">25+</p>
                <p className="text-sm font-bold text-stone-500 uppercase tracking-wider mt-1">Years of Culinary Excellence</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
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
                  Our Story
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-serif font-bold mt-4 text-stone-900 leading-tight"
                >
                  A Legacy of <br />
                  <span className="text-amber-700 italic">Taste & Tradition</span>
                </motion.h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: <History className="w-6 h-6" />,
                    title: "Humble Beginnings",
                    desc: "Founded in 1998, Mandira started as a small family kitchen with a passion for bringing authentic Indonesian flavors to the local community."
                  },
                  {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Global Evolution",
                    desc: "Over the decades, we've expanded our horizons, blending Western techniques and Chinese traditions with our deep-rooted local heritage."
                  },
                  {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Our Philosophy",
                    desc: "We believe food is a universal language. Every dish we serve is crafted with love, using only the freshest locally-sourced ingredients."
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
                <button className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold hover:bg-stone-800 transition-all shadow-xl flex items-center gap-3 group">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Story Section */}
      <section id="instagram" className="py-24 bg-stone-900 text-white overflow-hidden">
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
                className="text-4xl md:text-5xl font-serif font-bold"
              >
                Mandira on <span className="italic text-amber-400">Instagram</span>
              </motion.h2>
            </div>
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs border-b border-stone-700 pb-1"
            >
              @mandirarestaurant <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { url: '/OPMandira/images/insta-1.jpg', label: 'Chef at work' },
              { url: '/OPMandira/images/insta-2.jpg', label: 'Signature Drinks' },
              { url: '/OPMandira/images/insta-3.jpg', label: 'Cozy Corner' },
              { url: '/OPMandira/images/insta-4.jpg', label: 'Plating Art' },
              { url: '/OPMandira/images/insta-5.jpg', label: 'Fresh Pizza' },
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

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div
            className="text-2xl font-bold tracking-[0.2em] text-white"
            style={{ fontFamily: "'Julius Sans One', sans-serif" }}
          >
            MANDIRA
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
