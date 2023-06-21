import { CONFIGS } from '@/config';
import { getChallengeById } from '@/services/challenge';
import { Metadata } from 'next';
import { ChallengeHero } from './hero';
import { ChallengeNav } from './nav';
import { segmentSchema } from './param-schema';
import { useTranslation } from '@/app/i18n';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { challengeId: string; lng: string };
}) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const challenge = await getChallengeById(challengeId);
  const { lng } = segmentSchema.lng.parse(params);
  const { t } = await useTranslation(lng);

  if (challenge.id === '2') {
    if (lng === 'en') {
      challenge.title = "A Midsummer CryptoArt's Dream";
      challenge.location = 'Online Event';
    }
  }

  return (
    <div>
      <ChallengeHero challenge={challenge} lng={lng} t={t} />
      <ChallengeNav challenge={challenge} lng={lng} />
      <div>{children}</div>
    </div>
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { lng } = segmentSchema.lng.parse(params);
  const challenge = await getChallengeById(challengeId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  return {
    title: t('bewater') + ' - ' + challenge.title,
    description: challenge.description,
    twitter: {
      site: 'BeWater',
      card: 'summary_large_image',
      title: 'BeWater - ' + challenge.title,
      description: challenge.description,
      images: CONFIGS.HOME_URL + `/challenge/og/${challengeId}.png?random`,
    },
    openGraph: {
      type: 'website',
      title: 'BeWater - ' + challenge.title,
      description: challenge.description,
      images: CONFIGS.HOME_URL + `/challenge/og/${challengeId}.png?random`,
    },
  };
}
