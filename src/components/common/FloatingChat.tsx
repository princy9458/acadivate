'use client';

import * as React from 'react';
import { MessageCircle, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export function FloatingChat() {
  return (
    <motion.div 
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      className="fixed bottom-8 right-8 z-[9999] flex items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 1 }}
    >
      <div className="relative group">
        {/* Pulse effect */}
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        
        {/* Main Button */}
        <div className="relative flex items-center gap-2 overflow-hidden rounded-full border border-border-light bg-white/10 p-1 pr-4 backdrop-blur-xl transition-all hover:bg-white/20 shadow-sh-md">
          {/* Drag Handle */}
          <div className="flex h-10 w-6 cursor-grab active:cursor-grabbing items-center justify-center text-text-subtle/50 hover:text-text-muted">
            <GripVertical size={16} />
          </div>
          
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-gold-soft shadow-sh-gold animate-bounce-subtle">
            <MessageCircle size={20} fill="currentColor" className="opacity-80" />
          </div>
          
          <span className="text-xs font-black uppercase tracking-widest text-[#0c2d27]">
            Support
          </span>
          
          {/* Indicator */}
          <div className="absolute top-2 right-4 h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
        </div>
      </div>
    </motion.div>
  );
}
