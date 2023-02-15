import { Avatar } from '@/components/avatar/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { getUserProfileFull } from '@/services/user';
import { unsplash } from '@/utils/unsplash';
import { maskWalletAddress } from '@/utils/wallet-adress';
import { userSchema } from '../param-schema';
import { TeamCard } from './team-card';
import Image from 'next/image';
import { Aspect } from '@/components/aspect';
import Link from 'next/link';
import { uniqBy } from 'remeda';

export default async function Page({ params }: any) {
  const { userId } = userSchema.parse(params);
  const profile = await getUserProfileFull(userId);
  if (!profile) return null;
  const uniqTeamMembers = uniqBy(
    profile.teamMembers,
    (tm) => tm.team?.challengeId,
  );
  return (
    <div>
      <div className="mb-8">
        <p className="body-2 text-grey-500 font-bold">Challenges </p>
        <div className="flex gap-4 flex-wrap my-4 flex-col lg:flex-row ">
          {uniqTeamMembers.map((tm) => {
            return (
              <Link
                href={`/challenges/${tm.team?.challengeId}`}
                className="flex-1  rounded bg-[#0B0C24] border border-[#24254E] "
                key={tm.id}
              >
                <Aspect ratio={2}>
                  <Image
                    src={tm.team?.challenge?.bannerUrl ?? unsplash('event')}
                    fill
                    alt={tm.team?.challenge?.description ?? ''}
                  />
                </Aspect>

                <div className="p-4 ">
                  <p className="body-2 font-bold pb-2">
                    {tm.team?.challenge?.title}
                  </p>
                  <p className="mono-3">{tm.team?.challenge?.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <p className="body-2 text-grey-500 font-bold">Teamwork</p>
        <div className="grid grid-cols-300 gap-4  my-4">
          {profile.teamMembers.map((tm) => {
            return <TeamCard member={tm} key={tm.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
