'use client';

import { MoreVertical } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { campaigns, kpis, trafficRows } from './dashboardData';

function SectionCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-border-light bg-white p-5 shadow-sh-sm lg:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-navy">{title}</h3>
        {action ?? (
          <button className="text-text-muted">
            <MoreVertical size={18} />
          </button>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function DashboardMetrics() {
  return (
    <section className="mt-5 space-y-5">
      <div className="grid gap-5 lg:grid-cols-3">
        {kpis.map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-border-light bg-white p-5 shadow-sh-sm lg:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-muted">{item.title}</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-navy">{item.value}</span>
                  <span
                    className={cn(
                      'mb-1 rounded-full px-2.5 py-1 text-xs font-bold',
                      item.tone === 'negative' ? 'bg-rose-100 text-rose-600' : 'bg-sage-2 text-sage'
                    )}
                  >
                    {item.delta}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text-muted">vs last month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-pale text-gold">
                <item.icon size={21} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.55fr]">
        <SectionCard title="Campaign performance">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.platform}
                className="flex items-center justify-between rounded-2xl border border-border-light bg-bg-soft/70 px-4 py-4"
              >
                <div>
                  <p className="font-bold text-navy">{campaign.platform}</p>
                  <p className="mt-1 text-sm text-text-muted">{campaign.subtitle}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle">{campaign.users}</p>
                </div>
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-bold',
                    campaign.status === 'Running'
                      ? 'bg-sage-2 text-sage'
                      : campaign.status === 'Review'
                        ? 'bg-gold-pale text-gold'
                        : 'bg-rose-100 text-rose-600'
                  )}
                >
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Traffic data"
          action={
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-border-light bg-bg-soft px-4 py-2 text-sm text-text-muted">
                Search...
              </div>
              <button className="text-text-muted">
                <MoreVertical size={18} />
              </button>
            </div>
          }
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-border-light">
            <div className="grid grid-cols-[1.2fr_0.8fr_0.9fr_1fr] gap-4 bg-bg-soft px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-text-subtle">
              <div>Source</div>
              <div>Visits</div>
              <div>Bounce rate</div>
              <div>Goal (%)</div>
            </div>
            <div className="divide-y divide-border-light">
              {trafficRows.map((row) => (
                <div key={row.source} className="grid grid-cols-[1.2fr_0.8fr_0.9fr_1fr] gap-4 px-5 py-4 text-sm">
                  <div className="font-semibold text-navy">{row.source}</div>
                  <div className="text-text-muted">{row.visits}</div>
                  <div className="text-text-muted">{row.bounce}</div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-2">
                      <div className={cn('h-full rounded-full', row.color)} style={{ width: `${row.goal}%` }} />
                    </div>
                    <span className="w-10 text-right font-bold text-navy">{row.goal}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
