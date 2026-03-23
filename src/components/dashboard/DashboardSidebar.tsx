'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { miniCards, sidebarGroups } from './dashboardData';

export function DashboardSidebar() {
  return (
    <aside className="w-full border-b border-border-light bg-white px-5 py-6 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary-dark via-primary to-gold text-white shadow-sh-md">
          <span className="text-lg font-extrabold">A</span>
        </div>
        <div>
          <p className="text-lg font-bold text-navy">Acadivate</p>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-text-muted">Admin Desk</p>
        </div>
      </div>

      <div className="mt-8 space-y-7">
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-text-subtle">
              {group.title}
            </p>
            <div className="space-y-2">
              {group.links.map((link) => (
                <button
                  key={link.label}
                  className={cn(
                    'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all',
                    link.active
                      ? 'bg-linear-to-r from-primary-deep via-primary-dark to-primary text-white shadow-sh-md'
                      : 'text-navy hover:bg-bg-soft'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <link.icon size={18} className={link.active ? 'text-gold-3' : 'text-primary-dark'} />
                    <span className="text-sm font-semibold">{link.label}</span>
                  </span>
                  {link.badge ? (
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-[10px] font-bold',
                        link.active ? 'bg-white/15 text-white' : 'bg-gold-pale text-gold'
                      )}
                    >
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronDown size={15} className={link.active ? 'rotate-[-90deg] text-white/70' : 'rotate-[-90deg] text-text-subtle'} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border border-primary-dark/10 bg-linear-to-br from-navy via-primary-deep to-primary-dark p-5 text-white shadow-sh-lg">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold-3/80">Quarter Focus</p>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight">Research momentum, awards visibility, and partner growth.</h3>
        <div className="mt-5 grid gap-3">
          {miniCards.map((card) => (
            <div key={card.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <div>
                <p className="text-xs text-white/65">{card.label}</p>
                <p className="text-lg font-bold">{card.value}</p>
              </div>
              <card.icon size={18} className="text-gold-3" />
            </div>
          ))}
        </div>
        <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-white transition hover:bg-gold-2">
          View roadmap <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}
