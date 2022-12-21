import { getChallengeById } from '@/services/challenge';
import { ChallengeHero } from './hero';
import { ChallengeNav } from './nav';
import { paramSchema } from './param-schema';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { challengeId: string };
}) {
  const { challengeId } = paramSchema.parse(params);
  const challenge = await getChallengeById(challengeId);
  return (
    <div>
      <ChallengeHero challenge={challenge} />
      <div className="container">
        <ChallengeNav challengeId={params.challengeId} />
        {children}
      </div>
    </div>
  );
}
