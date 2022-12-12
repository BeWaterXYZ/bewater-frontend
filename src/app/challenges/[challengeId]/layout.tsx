import { ChallengeHero } from '@/features/challenges/hero';
import { ChallengeNav } from '@/features/challenges/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ChallengeHero />
      <div className="container">
        <ChallengeNav />
        {children}
      </div>
    </div>
  );
}
