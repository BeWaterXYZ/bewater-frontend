import { getChallenges } from '@/services/challenge';

// on why we have this file https://github.com/vercel/next.js/issues/42840#issuecomment-1352105907
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

export async function generateStaticParams() {
  const challenges = await getChallenges();
  return challenges.map((c) => ({
    challengeId: c.id.toString(),
  }));
}
