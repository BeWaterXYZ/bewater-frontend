import { getChallenges } from '@/services/challenge';
import { Metadata } from 'next';
import { ChallengeList } from './challenge-list';
import { useTranslation } from '@/app/i18n';

async function getChallengesByStatus() {
  let challenges = await getChallenges();
  challenges = challenges.sort((a, b) => Number(b.id) - Number(a.id));
  return {
    active: challenges.filter((c) => c.status === 'ACTIVE'),
    completed: challenges.filter((c) => c.status === 'COMPLETED'),
    paused: challenges.filter((c) => c.status === 'PAUSED'),
  };
}

export default async function ChallengePage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng = 'en' } = params || {};
  const { active, completed, paused } = await getChallengesByStatus();

  return (
    <div className="container my-4 pt-20 min-h-[calc(100vh-120px)]">
      {(active.length > 0 || completed.length > 0) && (
        <ChallengeList
          challenges={[...active, ...paused, ...completed]}
          lng={lng}
        />
      )}
    </div>
  );
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { lng = 'en' } = params || {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'translation');

  return {
    title: t('title'),
    description:
      'BeWater is the ultimate builder community based on the SOP management system we built for open innovation campaigns including hackathon, design contest, demo day and more. It serves cutting-edge fields and also connects traditional industries. BeWater engages builders with different skill sets to build a better future together.',
  };
}
