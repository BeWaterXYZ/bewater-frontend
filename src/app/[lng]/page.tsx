import { getChallenges } from '@/services/challenge';
import { redirect } from 'next/navigation';
import { languages, fallbackLng } from '../i18n/settings';
import { Challenge } from '@/services/types';

export default async function Home({ params }: { params: { lng: string } }) {
  let challenges = await getChallenges();
  let active: Challenge[] = challenges.filter((c) => c.status === 'ACTIVE');
  let { lng = 'en' } = params || {};

  if (languages.indexOf(lng) < 0) {
    lng = fallbackLng;
  }
  if (active.length === 1) {
    return redirect(`/${lng}/challenges/${active[0].id}`);
  }
  return redirect(`/${lng}/challenges`);
}
