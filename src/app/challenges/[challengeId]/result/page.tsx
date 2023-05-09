import Image from 'next/image';
import { segmentSchema } from '../param-schema';
import Link from 'next/link';
export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  return (
    <div className="container flex flex-col items-center justify-center gap-4 my-20">
      <Image
        src="/icons/no-result.svg"
        height={180}
        width={270}
        alt="no teams"
      />
      <p className="body-1 text-[20px] text-center">Results Coming Soon!</p>
      <p className="body-2 text-grey-500 text-center">
        Results announced after challenge ends and judging.
      </p>
      <Link
        prefetch={false}
        className="btn btn-primary"
        href={`/challenges/${challengeId}/projects`}
      >
        Back to Projects
      </Link>
    </div>
  );
}
