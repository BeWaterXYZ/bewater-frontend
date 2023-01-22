import { getChallenges } from '@/services/challenge';

export default function Challenges() {
  return <div className="body-1 text-center">challenges</div>;
}
export async function generateStaticParams() {
  const challenges = await getChallenges();
  return challenges.map((c) => ({
    challengeId: c.id.toString(),
  }));
}
