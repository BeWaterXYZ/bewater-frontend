import { getChallenges } from '@/services/challenge';
import { ChallengeList } from './challenge-list';

async function getChallengesByStatus() {
  let challenges = await getChallenges();

  return {
    active: challenges.filter((c) => c.status === 'ACTIVE'),
    upcoming: challenges.filter((c) => c.status === 'DRAFT'),
    completed: challenges.filter((c) => c.status === 'COMPLETED'),
  };
}

export default async function ChallengePage() {
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
          <ChallengeList challenges={active} />
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

          <ChallengeList challenges={upcoming} />
        </div>
      )}
      {/* todo , fixme  */}
      {/* {completed.length > 0 && (
        <div className="border-b py-4">
          <h2 className="heading-5">Completed</h2>
          <ChallengeList challenges={completed} />
        </div>
      )} */}
    </div>
  );
}

export const revalidate = 60;
