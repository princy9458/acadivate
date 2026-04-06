'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const UpcomingEvents = dynamic(() => import('@/src/pages/UpcomingEvents').then(mod => mod.UpcomingEvents), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-app-bg flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
});

export default function EventsClient() {
  return <UpcomingEvents />;
}
