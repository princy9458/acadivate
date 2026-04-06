'use client';

import * as React from 'react';
import { MessageSquare, MessageSquareOff } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAnnotatorStore } from './store';

type CommentToggleButtonProps = {
  variant?: 'compact' | 'floating' | 'circular';
  className?: string;
};

export const CommentToggleButton: React.FC<CommentToggleButtonProps> = ({
  variant = 'floating',
  className,
}) => {
  const { annotations, isCommentModeActive, toggleCommentMode } = useAnnotatorStore();

  return (
    <button
      type="button"
      data-annotator-ui="true"
      onClick={(e) => {
        e.stopPropagation();
        toggleCommentMode();
      }}
      aria-pressed={isCommentModeActive}
      aria-label={isCommentModeActive ? 'Hide comments' : 'Show comments'}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300',
        variant === 'circular' 
          ? 'w-12 h-12 rounded-full p-0' 
          : 'rounded-full px-4 py-3 text-sm',
        variant === 'compact' && 'px-3 py-1.5 text-[11px] leading-none',
        isCommentModeActive
          ? 'bg-slate-900 text-white shadow-lg ring-4 ring-slate-200'
          : 'bg-[#1a1a1a] text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-black hover:-translate-y-0.5 border border-white/10 ring-4 ring-gold/50 animate-pulse',
        className
      )}
    >
      {isCommentModeActive ? (
        <MessageSquareOff size={variant === 'circular' ? 20 : 16} />
      ) : (
        <MessageSquare size={variant === 'circular' ? 20 : 16} />
      )}
      {variant !== 'circular' && (
        <span>{isCommentModeActive ? 'Hide Comments' : `Show Comments (${annotations.length})`}</span>
      )}
      
      {/* Tooltip-like count indicator for circular mode */}
      {variant === 'circular' && !isCommentModeActive && annotations.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-white">
          {annotations.length}
        </span>
      )}
    </button>
  );
};
