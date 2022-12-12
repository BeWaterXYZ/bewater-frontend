import { ChallengeHero } from '@/features/challenges/hero';
import { ChallengeNav } from '@/features/challenges/nav';
import type { NextPage } from 'next';
const PageChallenges: NextPage = () => {
  return (
    <div className=" flex flex-col  justify-center items-center">
      <ChallengeHero />
      <div className="container">
        <ChallengeNav />
        <p className="body-1">teams</p>
      </div>
    </div>
  );
};

export default PageChallenges;
