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
    <div className="container my-4">
      {active.length > 0 && (
        <div className="border-b py-4">
          <h2 className="heading-2">Happening Now</h2>
          <ChallengeList challenges={active} />
        </div>
      )}
      {upcoming.length > 0 && (
        <div className="border-b py-4">
          <h2 className="heading-2">Up Next</h2>
          <ChallengeList challenges={upcoming} />
        </div>
      )}

      {completed.length > 0 && (
        <div className="border-b py-4">
          <h2 className="heading-2">Completed</h2>
          <ChallengeList challenges={completed} />
        </div>
      )}
    </div>
  );
}
