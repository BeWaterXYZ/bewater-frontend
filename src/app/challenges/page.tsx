import Link from 'next/link';

export default function ChallengePage() {
  return (
    <div className="body-1 text-center">
      <Link href="/challenges/123/intro">go to challenge#123</Link>
    </div>
  );
}
