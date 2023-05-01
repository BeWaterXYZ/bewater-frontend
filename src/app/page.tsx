import { getChallenges } from '@/services/challenge';
import { redirect } from 'next/navigation';
export default async function Home() {
  let challenges = await getChallenges();
  let active = challenges.filter((c) => c.status === 'ACTIVE');
  if (active.length === 1) {
    // return redirect(`/challenges/${active[0].id}`);
    return redirect(`/challenges/bewater-web3-zh`);
  }
  return redirect('/challenges');
}
