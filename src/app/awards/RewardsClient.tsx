'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Awards = dynamic(() => import('@/src/pages/Awards'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-app-bg" />
});

export default function RewardsClient() {
  return <Awards />;
}
