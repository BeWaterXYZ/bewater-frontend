import { getChallengeById } from '@/services/challenge';
import { ChallengeHero } from './hero';
import { ChallengeNav } from './nav';
import { challengeSchema } from './param-schema';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { challengeId: string };
}) {
  const { challengeId } = challengeSchema.parse(params);
  const challenge = await getChallengeById(challengeId);
  return (
    <div>
      <ChallengeHero challenge={challenge} />
      <ChallengeNav challengeId={params.challengeId} />
      <div className="container">{children}</div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
