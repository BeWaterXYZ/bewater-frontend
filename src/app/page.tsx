import { Metadata } from 'next';
import { redirect } from 'next/navigation';
export default async function Home() {
  return redirect('/challenges');
}
export const metadata: Metadata = {
  title: 'Home',
  description:
    'BeWater is the ultimate builder community based on the SOP management system we built for open innovation challenges including hackathon, design contest, demo day and more. It serves cutting-edge fields and also connects traditional industries. BeWater engages builders with different skill sets to build a better future together.',
};
