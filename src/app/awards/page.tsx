import { getSEO } from '@/src/lib/seo';
import RewardsClient from './RewardsClient';

export async function generateMetadata() {
  const seo = await getSEO('awards');

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default function Page() {
  return <RewardsClient />;
}
