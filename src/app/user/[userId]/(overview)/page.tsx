import { Aspect } from '@/components/aspect';
import { getUserProfileFull } from '@/services/user';
import { unsplash } from '@/utils/unsplash';
import Image from 'next/image';
import Link from 'next/link';
import { uniqBy } from 'remeda';
import { userSchema } from '../param-schema';
import { TeamCard } from './team-card';

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
        {uniqTeamMembers.length > 0 ? (
          <div className="flex flex-wrap gap-4 my-4">
            {uniqTeamMembers.map((tm) => {
              return (
                <div
                  key={tm.id}
                  className="w-full lg:w-1/2 rounded bg-[#0B0C24] border border-[#24254E] overflow-hidden "
                >
                  <Link
                    href={`/challenges/${tm.team?.challengeId}`}
                    className="block"
                  >
                    <Aspect ratio={2}>
                      <Image
                        src={tm.team?.challenge?.bannerUrl ?? unsplash('event')}
                        width={640}
                        height={320}
                        alt={tm.team?.challenge?.description ?? ''}
                      />
                    </Aspect>
                    <div className="p-4 ">
                      <p className="body-2 font-bold pb-2">
                        {tm.team?.challenge?.title}
                      </p>
                      <p className="body-3">
                        {tm.team?.challenge?.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded border border-[#24254E] bg-[#0B0C24] p-4 my-3 body-2 text-grey-600">
            Not in any challenges yet.
          </div>
        )}
      </div>

      <div>
        <p className="body-2 text-grey-500 font-bold">Teamwork</p>
        {profile.teamMembers.length > 0 ? (
          <div className="flex flex-wrap gap-4  my-4">
            {profile.teamMembers.map((tm) => {
              return <TeamCard member={tm} key={tm.id} />;
            })}
          </div>
        ) : (
          <div className="rounded border border-[#24254E] bg-[#0B0C24] p-4 my-3 body-2 text-grey-600">
            Not in any teams yet.
          </div>
        )}
      </div>
    </div>
  );
}
