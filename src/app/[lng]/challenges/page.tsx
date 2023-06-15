import { getChallenges } from '@/services/challenge';
import { Metadata } from 'next';
import { ChallengeList } from './challenge-list';
import { useTranslation } from '@/app/i18n';

async function getChallengesByStatus() {
  let challenges = await getChallenges();
  return {
    active: challenges.filter((c) => c.status === 'ACTIVE'),
    upcoming: challenges.filter((c) => c.status === 'DRAFT'),
    completed: challenges.filter((c) => c.status === 'COMPLETED'),
  };
}

export default async function ChallengePage({
  params,
}: {
  params: { lng: string };
}) {
  const { lng = 'en' } = params || {};
  const { active, upcoming, completed } = await getChallengesByStatus();
  return (
    <div className="container my-4 pt-20">
      {active.length > 0 && (
        <div className=" py-4">
          <div className="flex gap-2 items-center">
            <h2 className="body-1 text-[24px] uppercase">Happening</h2>
            <div className="w-5 h-4 body-5 bg-day text-night rounded-full text-center leading-4">
              {active.length}
            </div>
          </div>
          <ChallengeList challenges={active} lng={lng} />
        </div>
      )}
      {upcoming.length > 0 && (
        <div className=" py-4">
          <div className="flex gap-2 items-center">
            <h2 className="body-1 text-[24px] uppercase">Up Next</h2>
            <div className="w-5 h-4 body-5 bg-day text-night rounded-full text-center leading-4">
              {active.length}
            </div>
          </div>
          <ChallengeList challenges={upcoming} lng={lng} />
        </div>
      )}
      {/* todo , fixme  */}
      {completed.length > 0 && (
        <div className="pt-4 pb-8">
          <h2 className="heading-5">Completed</h2>
          <ChallengeList challenges={completed} lng={lng} />
        </div>
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
      'BeWater is the ultimate builder community based on the SOP management system we built for open innovation challenges including hackathon, design contest, demo day and more. It serves cutting-edge fields and also connects traditional industries. BeWater engages builders with different skill sets to build a better future together.',
  };
}
