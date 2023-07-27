import { CONFIGS } from '@/config';
import { getChallengeById } from '@/services/challenge';
import { Metadata } from 'next';
import { segmentSchema } from '../param-schema';

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  return {
    title: 'BeWater - ' + challenge.title,
    description: challenge.description,
    twitter: {
      site: 'BeWater',
      card: 'summary_large_image',
      title: 'BeWater - ' + challenge.title,
      description: challenge.description,
      images: CONFIGS.HOME_URL + `/challenge/og/${challengeId}.png`,
    },
    openGraph: {
      type: 'website',
      title: 'BeWater - ' + challenge.title,
      description: challenge.description,
      images: CONFIGS.HOME_URL + `/challenge/og/${challengeId}.png`,
    },
  };
}
