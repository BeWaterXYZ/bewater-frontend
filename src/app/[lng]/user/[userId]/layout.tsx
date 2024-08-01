import { redirect } from "next/navigation";
import { Avatar } from "@/components/avatar/avatar";
import { TagRole, TagSkill } from "@/components/tag";
import { SocialAuth } from "@/services/types";
import { getUserProfileFull } from "@/services/user";
import { RegexDigit } from "@/utils/regular";
import { maskWalletAddress } from "@/utils/wallet-adress";
import Image from "next/image";
import Link from "next/link";
import { userSchema } from "./param-schema";

function getSocialConnectLink(con: SocialAuth) {
  if (con.platform.toLowerCase() === "github")
    return `https://github.com/${con.handle}`;
  if (con.platform.toLowerCase() === "figma")
    return `https://figma.com/@${con.handle}`;
  return "";
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { userId } = userSchema.parse(params);
  const profile = await getUserProfileFull(userId);
  if (!profile) return null;

  if (profile.externalNa) {
    if (RegexDigit.test(userId) || profile.externalNa !== userId) {
      return redirect(`/${params.lng}/user/${profile.externalNa}`);
    }
  }

  return (
    <div className="container my-4 pt-24 lg:pt-20 ">
      <div className="flex flex-wrap gap-10">
        <div className="w-full lg:w-[200px]">
          <div className="flex flex-row lg:flex-col gap-4 border-b border-b-grey-800 pb-6">
            <Avatar
              className="w-20 h-20 lg:w-48 lg:h-48"
              src={profile.avatarURI}
            />
            <div className="mt-0 lg:mt-6">
              <p className="body-2 font-bold">{profile.userName}</p>
              <p className="body-4 text-grey-400">
                {profile.firstName ? `@${profile.firstName}` : ""}
              </p>
              <p className="body-4 text-grey-400">
                {maskWalletAddress(profile.walletAddress)}
              </p>
              <p className="body-4 py-4">{profile.bio}</p>
              <div className="flex gap-3">
                {profile.socialAuths
                  .filter((con) => con.authStatus === "AUTHORIZED")
                  .filter((con) => con.platform !== "Figma")
                  .map((con) => (
                    <Link href={getSocialConnectLink(con)} key={con.platform}>
                      <Image
                        src={`/icons/${con.platform.toLowerCase()}.svg`}
                        alt={con.platform}
                        height={20}
                        width={20}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="border-b border-b-grey-800 my-2 py-6 ">
            <p className="body-4 font-bold mb-3">Roles</p>
            <div className="flex gap-2 flex-wrap">
              {profile.roles.map((role) => (
                <TagRole label={role} key={role} />
              ))}
            </div>
          </div>
          <div className="border-b border-b-grey-800 my-2 py-6">
            <p className="body-4 font-bold mb-3">Skills</p>
            <div className="flex gap-2 flex-wrap">
              {profile.skills.map((skill) => (
                <TagSkill label={skill} key={skill} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
