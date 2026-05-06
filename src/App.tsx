import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Lenis from 'lenis';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sparkle = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={cn("w-6 h-6", className)}
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-imperial-crimson selection:text-stone">
      {/* Navigation */}
      <header className={cn(
        "sticky top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-700 bg-stone border-b border-charcoal-slate/5"
      )}>
        <div className="flex items-center">
          <img src="/images/nura-logo.png" alt="Nura Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
        </div>

        <nav className="hidden md:flex space-x-12">
          {[
            { name: 'Who are we', href: '#who-are-we' },
            { name: 'Our Offerings', href: '#our-offerings' },
            { name: 'Our Products', href: '#our-products' }
          ].map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="label-caps hover:opacity-60 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <a 
            href="mailto:nura.heirloomsandhome@gmail.com?subject=Catalogue Request"
            className="hidden md:block sharp-button py-2 px-6 text-center"
          >
            Request Our Catalogue
          </a>
          <button 
            className="md:hidden text-charcoal-slate"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-stone z-[60] flex flex-col p-12 md:hidden"
          >
            <div className="flex justify-between items-center mb-24">
            <div className="flex items-center">
               <img src="/images/nura-logo.png" alt="Nura Logo" className="w-16 h-16 object-contain" />
              </div>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-12">
              {[
                { name: 'Who are we', href: '#who-are-we' },
                { name: 'Our Offerings', href: '#our-offerings' },
                { name: 'Our Products', href: '#our-products' }
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="font-serif text-5xl italic border-b border-charcoal-slate/10 pb-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-12">
                <a 
                  href="mailto:nura.heirloomsandhome@gmail.com?subject=Catalogue Request"
                  className="sharp-button w-full block text-center"
                >
                  Request Our Catalogue
                </a>
              </div>
            </div>

            <div className="mt-auto pt-12 text-[10px] uppercase tracking-widest opacity-40">
              Delhi &bull; London &bull; New York
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1: Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-charcoal-slate">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/images/nura-hammered silver fruit bowl.png")',
            filter: 'brightness(0.7) contrast(1.1)'
          }}
          animate={{ scale: [1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-stone text-center px-6">
          <Reveal>
            <h1 className="text-8xl md:text-[180px] font-serif leading-none tracking-tight mb-2">NURA</h1>
            <p className="font-display tracking-[1em] text-xs md:text-xl uppercase ml-4">Heirlooms & Home</p>
          </Reveal>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-stone/40">
          <span className="label-caps">Scroll</span>
          <div className="w-px h-12 bg-stone/20 overflow-hidden">
            <motion.div 
               className="w-full h-full bg-stone/60"
               animate={{ y: ["-100%", "100%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Philosophy */}
      <section id="who-are-we" className="section-padding bg-stone relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center">
          <Reveal className="bg-neutral-200 overflow-hidden shadow-2xl relative group">
            <img 
              src="/images/nura-dual tone lotus tealight holder.png" 
              alt="Lotus Tealight Holder"
              className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 border-[20px] border-stone border-solid pointer-events-none opacity-50" />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="max-w-xl">
              <span className="label-caps block mb-10 text-imperial-crimson font-medium">Who are we</span>
              <div className="space-y-8 text-base md:text-lg text-charcoal-slate/80 leading-relaxed font-sans font-light">
                <p>Nura creates high-quality decor and gifting pieces designed for spaces that are meant to be lived in and experienced.</p>
                <p>The name Nura is inspired by the idea of light, not as ornament, but as a way of revealing form, texture, and detail. Our designs are developed to sit naturally within a space, adding depth without overpowering the surrounding décor.</p>
                <p>At Nura, quality is non-negotiable. Every piece is designed for durability, consistency, and finish, making it suitable for both everyday use and large-scale applications such as weddings, events, and gifting.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 3: Our Offerings */}
      <section id="our-offerings" className="section-padding bg-white overflow-hidden border-y border-charcoal-slate/10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-24 flex flex-col items-center text-center">
            <Sparkle className="text-imperial-crimson mb-8 w-12 h-12" />
            <h2 className="text-5xl font-serif italic mb-6">Our Offerings</h2>
            <p className="text-xl md:text-2xl text-charcoal-slate/60 font-serif italic max-w-2xl mx-auto mb-8">
              Thoughtfully designed home objects that balance form and function, inspired by nature and Indian visual traditions.
            </p>
            <div className="h-px w-32 bg-charcoal-slate/20" />
          </Reveal>

          <Reveal className="max-w-3xl mx-auto">
            <div className="p-12 md:p-16 border border-charcoal-slate/5 bg-stone/20 relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkle className="w-16 h-16 text-imperial-crimson" />
              </div>
              <h3 className="text-xl md:text-2xl font-sans mb-12 border-b border-charcoal-slate/10 pb-6 text-charcoal-slate/80 font-medium">
                Our product capabilities include, but are not limited to:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Vases",
                  "Bowls, trays, and tabletop accessories",
                  "Candle holders",
                  "Wall décor and hanging accents",
                  "Centerpieces and display objects",
                  "Decorative storage and organisers",
                  "Religious accents"
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-4 text-sm md:text-base leading-relaxed text-charcoal-slate/70">
                    <Sparkle className="w-2.5 h-2.5 text-imperial-crimson mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 4: Our Products */}
      <section id="our-products" className="section-padding bg-stone/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-32 flex flex-col items-center text-center">
            <span className="label-caps text-imperial-crimson mb-6 block">Gallery</span>
            <h2 className="text-5xl md:text-7xl font-serif italic mb-8">Our Products</h2>
            <div className="h-px w-32 bg-charcoal-slate/20" />
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {[
              { name: 'Brushed Gold Teardrop Vase', src: '/images/nura-brushed gold teardrop vase.png' },
              { name: 'Cone Incense Holder', src: '/images/nura-cone incense holder.png' },
              { name: 'Dual Tone Lotus Tealight Holder', src: '/images/nura-dual tone lotus tealight holder.png' },
              { name: 'Hammered Bowl and Tray', src: '/images/nura-hammered bowl and tray.png' },
              { name: 'Hammered Puja Thali Set', src: '/images/nura-hammered puja thali set.png' },
              { name: 'Hammered Silver Fruit Bowl', src: '/images/nura-hammered silver fruit bowl.png' },
              { name: 'Oyster Tealight Holder', src: '/images/nura-oyster tealight holder.jpg' },
              { name: 'Rose Blossom Tray', src: '/images/nura-rose blossom tray.png' },
            ].map((product, idx) => (
              <Reveal 
                key={product.name} 
                delay={(idx % 4) * 0.1}
                className={cn(
                  "aspect-square relative group bg-white overflow-hidden shadow-sm",
                  // Abstract staggered offsets for desktop
                  idx % 4 === 1 && "lg:translate-y-20",
                  idx % 4 === 2 && "lg:translate-y-40",
                  idx % 4 === 3 && "lg:translate-y-10"
                )}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  src={product.src} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal-slate/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 text-center backdrop-blur-[2px]">
                   <span className="text-stone font-serif italic text-sm md:text-lg">{product.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
          
          {/* Space to account for the translations at the bottom of the grid */}
          <div className="hidden lg:block h-64" />
        </div>
      </section>

      {/* Section 5: Manufacturing */}
      <section id="manufacturing" className="section-padding bg-imperial-crimson text-stone relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/10 -skew-x-12 translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-serif italic mb-12 leading-tight">Custom Manufacturing</h2>
            <p className="text-xl md:text-2xl mb-16 opacity-90 leading-relaxed font-serif italic font-light max-w-3xl mx-auto">
              We undertake custom and made-to-order production within a defined material and process framework. Pieces are developed by adapting existing designs or creating new ones aligned with our material expertise.
            </p>
            <a 
              href="mailto:nura.heirloomsandhome@gmail.com?subject=Purchase Inquiry"
              className="sharp-button-crimson text-sm inline-block text-center"
            >
              Inquire Now
            </a>
          </Reveal>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="bg-charcoal-slate text-stone pt-[120px] pb-12 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="font-serif text-5xl leading-none tracking-tighter">NURA</span>
              </div>
            </div>
            <p className="text-stone/60 max-w-sm text-lg font-serif italic leading-relaxed font-light">
              Silver and gold-based home decor and gifting
            </p>
            <div className="flex items-center space-x-12 pt-12 border-t border-stone/10">
               <div className="flex flex-col">
                 <span className="label-caps text-stone/30 mb-4 font-normal tracking-[0.2em]">Presence</span>
                 <div className="flex space-x-6">
                   <Instagram size={18} className="hover:text-imperial-crimson cursor-pointer transition-colors" />
                 </div>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12">
              <h5 className="label-caps text-stone/40 border-b border-stone/10 pb-4">Contact Us</h5>
              <ul className="space-y-10">
                 <li className="flex items-start space-x-6 group">
                   <div className="p-3 bg-stone/5 group-hover:bg-imperial-crimson transition-colors">
                    <MapPin className="text-stone/60" size={20} />
                   </div>
                   <span className="text-sm leading-relaxed tracking-wide">
                     Chandni Chowk,<br />
                     Delhi - 110006,<br />
                     Bharat
                   </span>
                 </li>
                 <li className="flex items-center space-x-6 group">
                   <div className="p-3 bg-stone/5 group-hover:bg-imperial-crimson transition-colors">
                    <Mail className="text-stone/60" size={20} />
                   </div>
                   <span className="text-sm tracking-wide">nura.heirloomsandhome@gmail.com</span>
                 </li>
                 <li className="pt-10 border-t border-stone/10">
                   <div className="space-y-10">
                     <div className="flex flex-col">
                       <span className="label-caps text-[8px] text-stone/30 mb-2">Direct Inquiry</span>
                       <div className="space-y-4">
                         <div className="flex items-center space-x-6">
                           <Phone className="text-stone/60" size={18} />
                           <span className="text-lg font-serif italic">+91 99100 78856</span>
                         </div>
                         <div className="flex items-center space-x-6">
                           <Phone className="text-stone/60" size={18} />
                           <span className="text-lg font-serif italic">+91 98716 27390</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] uppercase tracking-[0.4em] text-stone/30">
          <span>&copy; 2026 NURA: Heritage Home & Heirlooms.</span>
          <div className="flex space-x-12">
            <a href="#" className="hover:text-stone transition-colors underline-offset-4 hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-stone transition-colors underline-offset-4 hover:underline">Terms of Service</a>
          </div>
          <div className="px-6 py-2 border border-stone/10 rounded-full text-[8px] italic opacity-50">
            Professional B2B Network Only
          </div>
        </div>
      </footer>

      {/* Progress Scroll Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-imperial-crimson z-[100] origin-left"
        style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }}
      />
    </div>
  );
}
