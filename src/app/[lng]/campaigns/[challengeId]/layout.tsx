import { CONFIGS } from '@/config';
import { getChallengeById } from '@/services/challenge';
import { Metadata } from 'next';
import { ChallengeHero } from './hero';
import { ChallengeNav } from './nav';
import { segmentSchema } from './param-schema';
import { useTranslation } from '@/app/i18n';
import { isWorkshop } from './utils';

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
  // eslint-disable-next-line
  const { t } = await useTranslation(lng, 'translation');

  return (
    <div>
      <ChallengeHero challenge={challenge} lng={lng} t={t} />
      { !isWorkshop(challenge) ? (
        <ChallengeNav challenge={challenge} lng={lng} />
      ) : null}
      <div>{children}</div>
    </div>
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { lng } = segmentSchema.lng.parse(params);
  const challenge = await getChallengeById(challengeId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'translation');

  if (challenge.yotadata?.title) {
    challenge.title = lng === 'zh' ? (challenge.yotadata.title.zh ?? challenge.yotadata.title.en) : (challenge.yotadata.title.en ?? challenge.yotadata.title.zh);
  }

  if (challenge.yotadata?.description) {
    challenge.description = lng === 'zh' ? (challenge.yotadata.description.zh ?? challenge.yotadata.description.en) : (challenge.yotadata.description.en ?? challenge.yotadata.description.zh);
  }

  return {
    title: t('bewater') + ' - ' + challenge.title,
    description: challenge.description,
    twitter: {
      site: 'BeWater',
      card: 'summary_large_image',
      title: 'BeWater - ' + challenge.title,
      description: challenge.description,
      images: `/api/og?challengeId=${challenge.id}`,
    },
    openGraph: {
      type: 'website',
      title: 'BeWater - ' + challenge.title,
      description: challenge.description,
      images: `/api/og?challengeId=${challenge.id}`,
    },
  };
}
