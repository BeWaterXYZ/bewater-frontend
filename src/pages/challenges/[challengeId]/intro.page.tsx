// import { Loading } from '@/components/loading/loading';

import { ChallengeNav } from '@/features/challenges/nav';
import type { NextPage } from 'next';
import { ChallengeHero } from '../../../features/challenges/hero';

const PageChallenges: NextPage = () => {
  return (
    <div className="heading-1 flex flex-col  justify-center items-center">
      <ChallengeHero />
      <div className="container">
        <ChallengeNav />
        <p className="body-1">intro</p>
      </div>
    </div>
  );
};

export default PageChallenges;
