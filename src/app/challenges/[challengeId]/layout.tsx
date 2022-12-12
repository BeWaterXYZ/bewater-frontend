import { ChallengeHero } from '@/features/challenges/hero';
import { ChallengeNav } from '@/features/challenges/nav';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { challengeId: string };
}) {
  console.log({ params });
  return (
    <div>
      <ChallengeHero />
      <div className="container">
        <ChallengeNav challengeId={params.challengeId} />
        {children}
      </div>
    </div>
  );
}
