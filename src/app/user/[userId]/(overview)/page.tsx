import { Avatar } from '@/components/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { getUserProfileFull } from '@/services/user';
import { maskWalletAddress } from '@/utils/wallet-adress';
import { userSchema } from '../param-schema';
import { TeamCard } from './team-card';

export default async function Page({ params }: any) {
  const { userId } = userSchema.parse(params);
  const profile = await getUserProfileFull(userId);
  if (!profile) return null;
  return (
    <div>
      <p className="body-2 text-grey-500 font-bold">Teamwork</p>

      <div className="flex gap-4 flex-wrap my-4">
        {profile.teamMembers.map((tm) => {
          return <TeamCard member={tm} key={tm.id} />;
        })}
      </div>
    </div>
  );
}
