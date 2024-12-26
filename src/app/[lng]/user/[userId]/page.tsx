import { Aspect } from "@/components/aspect";
import { getUserProfileFull } from "@/services/user";
import { unsplash } from "@/utils/unsplash";
import Image from "next/image";
import Link from "next/link";
import { uniqBy } from "remeda";
import { userSchema } from "./param-schema";
import { TeamCard } from "./team-card";
import { Project, TeamMember } from "@/services/types";

export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "/");
};

export const calculateMostPlayedRole = (teamMembers: TeamMember[] = []) => {
  if (!teamMembers.length) return 'N/A';

  
  
  const roleCount: Record<string, number> = {};
  
  
  for (const tm of teamMembers) {
    // console.log('Team Member:', tm);
    // 只有当 role 存在且不为空时才计数
    if (tm.teamRole && typeof tm.teamRole === 'string' && tm.team?.challenge?.title !== 'General') {
      const role = tm.teamRole;
      // console.log('Role:', role);
      roleCount[role] = (roleCount[role] || 0) + 1;
    }
  }

  // console.log('Role Count:', roleCount);

  let maxCount = 0;
  let mostPlayedRole = 'N/A';
  
  // 找出出现次数最多的角色
  for (const [role, count] of Object.entries(roleCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostPlayedRole = role;
    }
  }

  // 如果没有有效的角色记录，返回 N/A
  if (maxCount === 0) {
    return 'N/A';
  }

  return mostPlayedRole;
};

export default async function Page({ params }: any) {
  const { userId } = userSchema.parse(params);
  const profile = await getUserProfileFull(userId);
  // console.log(profile);
  if (!profile) return null;
  const uniqTeamMembers = uniqBy(
    profile.teamMembers,
    (tm) => tm.team?.challengeId
  );

  const { lng = "en" } = params || {};

  const mostPlayedRole = calculateMostPlayedRole(profile?.teamMembers);

  return (
    <div>
      {/* About Me */}
      {profile?.bio && (
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-2">About Me</h3>
          <p className="text-gray-300">{profile?.bio}</p>
        </div>
      )}
      {profile?.showChallenges && (
        <div className="my-8">
          <p className="body-2 text-grey-500 font-bold">Campaigns</p>
          {uniqTeamMembers.length > 0 ? (
            <div className="flex flex-wrap gap-4 my-4">
              {uniqTeamMembers.map((tm) => {
                if (tm.team?.challenge?.title == "General") {
                  return;
                }
                return (
                  <div
                    key={tm.id}
                    className="w-full h-[68px] bg-latenight border-b border-gray-600 overflow-hidden "
                  >
                    <Link
                      href={`/${lng}/campaigns/${tm.team?.challengeId}`}
                      className="flex justify-start"
                    >
                      <div className="ml-5 my-2 w-[48px] h-[48px]">
                        <Image
                          src={
                            tm.team?.challenge?.bannerUrl ?? unsplash("event")
                          }
                          width={48}
                          height={48}
                          objectFit="contain"
                          alt={tm.team?.challenge?.description ?? ""}
                        />
                      </div>

                      <div className="ml-5 my-2 h-[48px]">
                        <p className="text-sm text-white">
                          {tm.team?.challenge?.title}
                        </p>
                        <p className="mt-2 text-sm text-[#64748B]">
                          {formatDate(tm.team?.challenge?.startTime)} {"->"}{" "}
                          {formatDate(tm.team?.challenge?.endTime)}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
              Not in any campaigns yet.
            </div>
          )}
        </div>
      )}
      {/* Pinned Projects */}
      {profile?.showPinnedProjects && profile?.projects?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-400 mb-4">
            Pinned Projects
          </h3>
          <div className="space-y-4">
            {profile?.projects.map((projectItem) => {
              const project = (projectItem as any).project as Project;
              if (!project.isPinned) return null;
              return (
                <div
                  key={project.id}
                  className="relative h-[144px] rounded-[4px] overflow-hidden p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, #242667 0%, #080827 100%)",
                  }}
                >
                  {/* Gradient Border Overlay */}
                  <div
                    className="absolute inset-0 rounded-[4px] pointer-events-none"
                    style={{
                      padding: "1px",
                      background:
                        "radial-gradient(100% 100% at 50% 0%, #474ABD 0%, #1F2177 100%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                    }}
                  />

                  {/* Project Content */}
                  <div className="relative h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Topics */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-1 border border-[#94A3B8] h-4 bg-transparent text-[#94A3B8] rounded-[3px] text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pinned Links */}
      {profile?.showPinnedLinks && profile?.links?.length > 0 && (
        <div>
          <h3 className="text-lg mt-5 font-semibold text-gray-400 mb-2">
            Pinned Links
          </h3>
          <div className="flex flex-wrap gap-4">
            {profile.links
              .filter((link) => link.pinned)
              .map((link, index) => (
                <div
                  key={index}
                  className="w-[302px] rounded-[4px] pt-5 bg-[#1E293B] px-3 h-[132px] flex flex-col justify-start items-start"
                >
                  <div className="flex mx-1 justify-start items-center">
                    <div className="flex mr-2 items-center gap-2 min-w-0">
                      {link.icon && (
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Image
                            src={link.icon}
                            alt={`Icon for ${link.url}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-gray-300 truncate text-base flex-1">
                      <Link
                        href={link.url}
                        className="text-gray-300 truncate text-base flex-1"
                      >
                        {link.url}
                      </Link>
                    </div>
                  </div>

                  <div className="text-gray-500 h-10 flex justify-start items-center truncate text-sm">
                    {link.description}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      {profile?.showAdditionalInfo && profile?.additionalInfo && (
        <div>
          <h3 className="text-lg mt-5 font-semibold text-gray-400 mb-2">
            Additional Info
          </h3>
          <p className="text-gray-300">{profile.additionalInfo}</p>
        </div>
      )}
      {profile?.showTeamwork && (
        <div>
          <p className="body-2 mt-5 text-grey-500 font-bold">Teamwork</p>
          {profile.teamMembers.length > 0 ? (
            <div className="flex flex-wrap gap-4  my-4">
              {profile.teamMembers.map((tm) => {
                if (tm.team?.challenge?.title == "General") {
                  return;
                }
                return <TeamCard member={tm} key={tm.id} lng={lng} />;
              })}
            </div>
          ) : (
            <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
              Not in any teams yet.
            </div>
          )}
        </div>
      )}

      {profile?.showStats && (
        <div className="mt-5">
          <h3 className="text-lg mt-5 font-semibold text-gray-400 mb-2">
            Stats
          </h3>
          <div className="flex gap-4 mb-8">
            <div className="w-[219.75px] h-[76px] p-4 rounded-[2px] border border-[#1E293B] bg-[#0B0C24] flex flex-col gap-2">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-base text-white">
                {formatDate(profile?.createdAt) || "N/A"}
              </p>
            </div>
            <div className="w-[219.75px] h-[76px] p-4 rounded-[2px] border border-[#1E293B] bg-[#0B0C24] flex flex-col gap-2">
              <p className="text-sm text-gray-500">Teammates</p>
              <p className="text-base text-white">
                {profile?.teamMembers?.length || 0}
              </p>
            </div>
            <div className="w-[219.75px] h-[76px] p-4 rounded-[2px] border border-[#1E293B] bg-[#0B0C24] flex flex-col gap-2">
              <p className="text-sm text-gray-500">Most Played Role</p>
              <p className="text-base text-white">
                {mostPlayedRole}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
