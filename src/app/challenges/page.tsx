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
    <div className="container pt-[88px] lg:px-[13.8%]">
      {active.length > 0 && (
        <div className="pt-16">
          <h2 className="heading-5 pb-4">Happening Now</h2>
          <ChallengeList challenges={active} />
        </div>
      )}
      {upcoming.length > 0 && (
        <div className="pt-16">
          <h2 className="heading-5 pb-4">Up Next</h2>
          <ChallengeList challenges={upcoming} />
        </div>
      )}

      {completed.length > 0 && (
        <div className="pt-16">
          <h2 className="heading-5 pb-4">Completed</h2>
          <ChallengeList challenges={completed} />
        </div>
      )}
    </div>
  );
}
