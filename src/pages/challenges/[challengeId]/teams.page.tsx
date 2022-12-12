// import { Loading } from '@/components/loading/loading';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
// Pass client to React Context Provider
const PageChallenges: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div className="heading-1 flex flex-col  justify-center items-center">
      Challenges teams Page
    </div>
  );
};

export default PageChallenges;
