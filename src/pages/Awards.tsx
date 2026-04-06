'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Star, Trophy, Users, Calendar, ArrowRight, Download, Send, 
  CheckCircle2, HelpCircle, Mail, Phone, MapPin, Search, ShoppingBag, 
  ChevronDown, Quote, Globe 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const CATEGORIES_DATA = [
  {
    id: '01',
    title: 'Excellence in Research',
    desc: 'Original, high-impact research that advances human knowledge and addresses pressing global challenges through rigorous, evidence-based inquiry.',
    tags: ['Sciences', 'Humanities', 'Technology', 'Social Sciences'],
    count: '12 sub-categories',
    color: 'gold'
  },
  {
    id: '02',
    title: 'Innovation Leadership',
    desc: 'Academics and institutions who push disciplinary boundaries through creative, interdisciplinary, and transformative approaches to knowledge-creation.',
    tags: ['EdTech', 'AI Research', 'Policy'],
    count: '8 sub-categories',
    color: 'teal'
  },
  {
    id: '03',
    title: 'Lifetime Achievement',
    desc: 'The highest Acadivate honour — bestowed upon scholars whose decades of work have fundamentally shaped their field and left an enduring global legacy.',
    tags: ['Cross-Discipline', 'Peer-Nominated'],
    count: 'Jury Nominated',
    color: 'wine'
  },
  {
    id: '04',
    title: 'Young Researcher Award',
    desc: 'Recognising emerging academic talent — scholars under 35 who are already making significant, peer-acknowledged contributions to their disciplines.',
    tags: ['Early Career', 'PhD Scholars', 'Postdoc'],
    count: 'Under 35',
    color: 'navy'
  },
  {
    id: '05',
    title: 'Best Paper Award',
    desc: 'Awarded at each Acadivate conference to the paper demonstrating the highest quality of original research, methodological rigor, and scholarly impact.',
    tags: ['ICASD 2026', 'ICGSD', 'GCSD'],
    count: '5 sub-categories',
    color: 'navy'
  },
  {
    id: '06',
    title: 'Institutional Excellence',
    desc: 'Honouring universities, research institutes, and academic bodies that have demonstrated exceptional commitment to research quality and global engagement.',
    tags: ['Universities', 'Research Institutes'],
    count: '6 sub-categories',
    color: 'primary'
  }
];

const JURY = [
  {
    name: 'Prof. Anand Krishnan',
    title: 'Jury Chair, Research Excellence',
    inst: 'IIT Delhi · 28 years',
    country: 'India',
    image: 'https://picsum.photos/seed/j1/400/300'
  },
  {
    name: 'Prof. Nurul Ain Harun',
    title: 'Innovation & Technology Panel',
    inst: 'Manipal International University',
    country: 'Malaysia',
    image: 'https://picsum.photos/seed/j2/400/300'
  },
  {
    name: 'Dr. Mohammed Al-Rashidi',
    title: 'Institutional Excellence Panel',
    inst: 'Abu Dhabi University',
    country: 'UAE',
    image: 'https://picsum.photos/seed/j3/400/300'
  },
  {
    name: 'Prof. Claire Beaumont',
    title: 'Social Sciences & Policy Panel',
    inst: 'London School of Economics',
    country: 'UK',
    image: 'https://picsum.photos/seed/j4/400/300'
  }
];

const WINNERS_DATA = {
  y2025: [
    { name: 'Prof. Rashida Ahmed', inst: 'University of Kuala Lumpur', award: 'Excellence in Research', cat: 'Research', image: 'https://picsum.photos/seed/w1/400/300' },
    { name: 'Dr. Sanjay Nair', inst: 'IIT Bombay, India', award: 'Innovation Leadership', cat: 'Innovation', image: 'https://picsum.photos/seed/w2/400/300' },
    { name: 'Dr. Lin Wei', inst: 'Tsinghua University', award: 'Young Researcher Award', cat: 'Young Scholar', image: 'https://picsum.photos/seed/w3/400/300' },
    { name: 'Dr. Fatima Al-Rashid', inst: 'King Abdulaziz University', award: 'Best Paper — ICGSD 2025', cat: 'Best Paper', image: 'https://picsum.photos/seed/w4/400/300' }
  ],
  y2024: [
    { name: 'Prof. Maria Souza', inst: 'University of São Paulo', award: 'Lifetime Achievement', cat: 'Lifetime', image: 'https://picsum.photos/seed/w5/400/300' },
    { name: 'Prof. James Okafor', inst: 'University of Lagos', award: 'Excellence in Research', cat: 'Research', image: 'https://picsum.photos/seed/w6/400/300' },
    { name: 'Dr. Priya Anand', inst: 'BITS Pilani', award: 'Young Researcher 2024', cat: 'Young', image: 'https://picsum.photos/seed/w7/400/300' },
    { name: 'Manipal Intl. University', inst: 'Malaysia', award: 'Institutional Excellence', cat: 'Institution', image: 'https://picsum.photos/seed/w8/400/300' }
  ],
  y2023: [
    { name: 'Prof. Aiko Tanaka', inst: 'Osaka University, Japan', award: 'Inaugural Research Award', cat: 'Inaugural', image: 'https://picsum.photos/seed/w9/400/300' },
    { name: 'Dr. Ahmed Hassan', inst: 'Cairo University, Egypt', award: 'Innovation Award 2023', cat: 'Innovation', image: 'https://picsum.photos/seed/w10/400/300' },
    { name: 'Dr. Kenji Yamamoto', inst: 'Tokyo University', award: 'Young Researcher 2023', cat: 'Young', image: 'https://picsum.photos/seed/w11/400/300' },
    { name: 'Abu Dhabi University', inst: 'UAE', award: 'Institutional Excellence 2023', cat: 'Institution', image: 'https://picsum.photos/seed/w12/400/300' }
  ]
};

export default function Awards() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeYear, setActiveYear] = useState<'y2025' | 'y2024' | 'y2023'>('y2025');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Fetch dynamic categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.items);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  if (!mounted) return null;

  // Use dynamic categories if available, otherwise fallback to static for safety
  const displayCategories = categories.length > 0 ? categories : CATEGORIES_DATA;

  return (
    <div className="bg-app-bg min-h-screen font-sans">
      {/* Hero Section */}
      <section data-annotate-id="awards-hero-section" className="relative min-h-[90vh] bg-app-bg flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <img src="https://picsum.photos/seed/heroawards/1920/1080" alt="Hero" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-b from-app-bg via-app-bg/80 to-app-bg" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(18,167,207,.1) 1px,transparent 1px), linear-gradient(90deg,rgba(18,167,207,.1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-[1fr_450px] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <div className="w-6 h-px bg-primary" />
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-primary">Acadivate Excellence Awards · 2026</span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl font-bold text-navy leading-[1.05] mb-6">
                Honour the<br />
                <span className="italic shim">Extraordinary.</span>
              </h1>

              <p className="font-prose text-lg text-text-muted leading-relaxed max-w-xl mb-10">
                The Acadivate Excellence Awards celebrate the scholars, researchers, and institutions whose work is rewriting the rules of global academia.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/nomination-form">
                  <Button variant="gold" size="lg" className="rounded-xl px-8 py-4 text-base shadow-sh-gold">
                    <Download size={18} className="mr-2" /> Submit Nomination
                  </Button>
                </Link>
                <Link href="/awards#categories">
                  <Button variant="outline" size="lg" className="rounded-xl px-8 py-4 text-base text-navy border-navy/20 hover:bg-navy/5 backdrop-blur-md">
                    <Award size={18} className="mr-2" /> Explore Categories
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col items-center justify-center relative"
            >
              {/* background aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-luxury-gold/10 rounded-full blur-[80px] opacity-15 pointer-events-none" />

              {/* main badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 group"
              >
                <div className="relative w-72 h-72 rounded-[4rem] bg-white/40 backdrop-blur-3xl border border-white/20 shadow-[0_32px_80px_rgba(18,167,207,0.15)] flex flex-col items-center justify-center gap-4 transition-transform duration-700 group-hover:scale-105">
                  <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-sh-primary rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Award size={48} />
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold tracking-[4px] uppercase text-primary/60 mb-1">Authentic Integrity</div>
                    <div className="text-2xl font-serif font-bold text-navy">Seal of Honour</div>
                  </div>
                </div>

                {/* orbiting accents */}
                <div className="absolute inset-0 border-2 border-dashed border-primary/10 rounded-full animate-spin-slow opacity-40" />
                <div className="absolute -inset-10 border border-primary/5 rounded-full animate-spin-slow-reverse opacity-30" />
              </motion.div>

              {/* floating pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, x: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                className="absolute top-0 -left-12 z-30 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sh-md flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold"><Globe size={16} /></div>
                <div>
                  <div className="text-[9px] font-bold uppercase text-text-subtle tracking-wider">Global Reach</div>
                  <div className="text-sm font-bold text-navy">50+ Countries</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
                className="absolute bottom-10 -right-8 z-30 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sh-md flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Users size={16} /></div>
                <div>
                  <div className="text-[9px] font-bold uppercase text-text-subtle tracking-wider">Validation</div>
                  <div className="text-sm font-bold text-navy">Peer Reviewed</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, x: [15, -15, 15] }}
                transition={{ duration: 7, repeat: Infinity, delay: 0.9, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-16 -translate-y-1/2 z-10 px-4 py-2 rounded-xl bg-navy text-white text-[10px] font-bold tracking-[2px] uppercase shadow-sh-lg border border-white/10"
              >
                Established 2026
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section data-annotate-id="awards-categories-section" className="py-24 bg-white" id="categories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-[10px] font-bold tracking-[2px] uppercase text-luxury-gold mb-6">
              <Star size={12} fill="currentColor" /> Award Categories
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-luxury-ink leading-tight mb-6">
              Recognising Every Form of<br /><span className="italic">Scholarly Excellence</span>
            </h2>
            <div className="w-12 h-0.5 bg-linear-to-r from-luxury-gold to-luxury-gold/50 mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-light border-2 border-border-light rounded-[2rem] overflow-hidden">
            {displayCategories.map((cat, idx) => {
              // Handle tags which may be array (static) or comma-separated string (API)
              const tagsArray = Array.isArray(cat.tags) 
                ? cat.tags 
                : (typeof cat.tags === 'string' ? cat.tags.split(',').map((t: string) => t.trim()) : []);
              
              // Local ID format for dynamic data (e.g., 01, 02)
              const displayId = cat.id?.length === 2 ? cat.id : String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={cat._id || cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative bg-app-bg p-10 hover:bg-luxury-ink transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:bg-luxury-gold/20 group-hover:text-luxury-gold",
                      cat.color === 'gold' ? "bg-luxury-gold/10 text-luxury-gold" :
                        cat.color === 'teal' ? "bg-teal/10 text-teal" :
                          cat.color === 'wine' ? "bg-luxury-wine/10 text-luxury-wine" :
                            "bg-navy/10 text-navy"
                    )}>
                      <Trophy size={28} />
                    </div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase text-text-subtle mb-2 group-hover:text-white/40">Category {displayId}</div>
                    <h3 className="font-serif text-2xl font-bold text-luxury-ink mb-4 group-hover:text-white transition-colors">{cat.title}</h3>
                    <p className="text-base text-text-muted mb-8 group-hover:text-white/60 transition-colors leading-relaxed line-clamp-3">{cat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tagsArray.map((tag: string) => (
                        <span key={tag} className="text-[11px] font-bold px-3 py-1 rounded-full border border-border-light text-text-muted group-hover:border-luxury-gold/40 group-hover:text-luxury-gold transition-all">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jury Section */}
      <section className="py-24 bg-app-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-luxury-ink">The International Jury</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {JURY.map((member, idx) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="group bg-app-bg border border-border-light rounded-[2rem] overflow-hidden hover:shadow-sh-lg transition-all duration-500">
                <div className="h-56 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-luxury-ink mb-1 group-hover:text-luxury-gold transition-colors">{member.name}</h3>
                  <div className="text-[13px] font-bold text-luxury-gold mb-3">{member.title}</div>
                  <div className="flex items-center gap-2 text-[12px] text-text-muted"><MapPin size={12} className="text-luxury-gold" /> {member.inst}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Winners Showcase */}
      <section className="py-24 bg-app-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-luxury-ink">Previous Laureates</h2>
          </div>
          <div className="flex justify-center gap-3 mb-12">
            {(['y2025', 'y2024', 'y2023'] as const).map(year => (
              <button key={year} onClick={() => setActiveYear(year)} className={cn("px-6 py-2.5 rounded-full text-[13px] font-bold border-1.5 transition-all duration-300", activeYear === year ? "bg-luxury-ink border-luxury-ink text-white shadow-sh-md" : "bg-transparent border-border-light text-text-muted hover:border-luxury-ink hover:text-luxury-ink")}>
                {year.replace('y', '')}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WINNERS_DATA[activeYear].map((winner, idx) => (
              <motion.div key={winner.name + idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group bg-app-bg border border-border-light rounded-3xl overflow-hidden hover:shadow-sh-lg transition-all duration-500">
                <div className="h-48 overflow-hidden relative">
                  <img src={winner.image} alt={winner.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold text-luxury-ink mb-1 group-hover:text-luxury-gold transition-colors">{winner.name}</h3>
                  <div className="text-sm text-text-muted mb-3">{winner.inst}</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold text-[10px] font-bold uppercase tracking-wider">{winner.award}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-app-bg">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-luxury-ink text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem q="Who is eligible to nominate for Acadivate Excellence Awards?" a="Any academic professional, researcher, PhD scholar, faculty member, or institution worldwide may submit a nomination." isOpen={openFaq === 0} onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} />
            <FaqItem q="Is there a nomination fee, and are fee waivers available?" a="Yes, a nominal nomination fee covers jury evaluation. Fee waivers are available for researchers from low-income countries." isOpen={openFaq === 1} onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} />
            <FaqItem q="How does the jury evaluation process work?" a="Each submission is evaluated independently by a minimum of 3 jury members with expertise in the relevant discipline." isOpen={openFaq === 2} onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-white mb-8">Ready to Recognise Excellence?</h2>
          <Link href="/nomination-form"><Button variant="gold" size="lg" className="rounded-2xl px-12 py-5 text-xl">Submit Nomination Now</Button></Link>
        </div>
      </section>
    </div>
  );
}

const FaqItem = ({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) => (
  <div className={cn("bg-app-bg border border-border-light rounded-2xl overflow-hidden transition-all duration-300", isOpen && "border-gold/30 shadow-sh-sm")}>
    <button onClick={onClick} className="w-full flex items-center justify-between p-6 text-left group">
      <span className="text-base font-bold text-luxury-ink group-hover:text-luxury-gold transition-colors">{q}</span>
      <ArrowRight className={cn("text-text-muted transition-transform duration-300", isOpen ? "rotate-90 text-gold" : "")} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <div className="px-6 pb-6 text-[15px] text-text-muted leading-relaxed border-t border-border-light pt-4">{a}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
