import { getChallengeById } from '@/services/challenge';
import Challenge1 from './challenges/challenge-1';
import Challenge5 from './challenges/challenge-5';
import Challenge29 from './challenges/challenge-29';
import './style.css';

// todo refactor

const regexNumber = /^\d+$/;
const resultMap = new Map();
resultMap.set('1', Challenge1);
resultMap.set('5', Challenge5);
resultMap.set('29', Challenge29);

export default async function Page({ params }: any) {
  let { challengeId } = params || {};
  if (!regexNumber.test(challengeId)) {
    const challenge = await getChallengeById(challengeId);
    challengeId = challenge?.id;
  }
  const ChallengeResult = resultMap.get(challengeId);
  if (ChallengeResult) {
    return <ChallengeResult {...params} />
  }
}
