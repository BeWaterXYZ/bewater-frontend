import { Avatar } from '@/components/avatar/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { getUserProfileFull } from '@/services/user';
import { maskWalletAddress } from '@/utils/wallet-adress';
import { userSchema } from './param-schema';
import { Nav } from './nav';
export default async function page({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { userId } = userSchema.parse(params);
  const profile = await getUserProfileFull(userId);
  if (!profile) return null;

  return (
    <div className="container my-4 pt-24 lg:pt-20 ">
      <div className="flex flex-wrap gap-10">
        <div className="w-full lg:w-[200px]">
          <div className="flex flex-row lg:flex-col gap-4">
            <Avatar
              className="w-20 h-20 lg:w-48 lg:h-48"
              src={profile.avatarURI}
              walletAddress={profile.walletAddress}
            />
            <div className="mt-0 lg:mt-6">
              <p className="body-2 font-bold">{profile.fullName}</p>
              <p className="body-4 text-grey-400">@{profile.userName}</p>
              <p className="body-4 text-grey-400">
                {maskWalletAddress(profile.walletAddress)}
              </p>
              <p className="body-4 py-4">{profile.bio}</p>
            </div>
          </div>

          <div className="border-b border-b-grey-800 my-2 py-4 ">
            <p className="body-4 font-bold mb-3">Roles</p>
            <div className="flex gap-2 flex-wrap">
              {profile.roles.map((role) => (
                <TagRole label={role} key={role} />
              ))}
            </div>
          </div>
          <div className="border-b border-b-grey-800 my-2 py-4">
            <p className="body-4 font-bold mb-3">Skills</p>
            <div className="flex gap-2 flex-wrap">
              {profile.skills.map((skill) => (
                <TagSkill label={skill} key={skill} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto flex-1">
          {/* <Nav userId={userId} /> */}
          {children}
        </div>
      </div>
    </div>
  );
}
