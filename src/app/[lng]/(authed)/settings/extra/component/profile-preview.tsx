import { Project, UserProfile, UserProfileFull } from "@/services/types";
import Image from "next/image";
import GithubProjectItem from "./github-project-item";
import { User } from "@clerk/nextjs/server";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { styleMap } from "@/constants/options/role";
import type { RoleUnion } from "@/constants/options/role";
import { uniqBy } from "lodash";
import { unsplash } from "@/utils/unsplash";
import Link from "next/link";
import { TeamCard } from "@/app/[lng]/user/[userId]/team-card";
import { maskWalletAddress } from "@/utils/wallet-adress";
import { calculateMostPlayedRole, formatDate, getSocialConnectLink } from "@/utils/common";
import { TagRole, TagSkill } from "@/components/tag";

interface ProfilePreviewProps {
  user: User | null | undefined;
  userProfile: UserProfileFull;
  onBack?: () => void;
}

export default function ProfilePreview({
  user,
  userProfile,
  onBack,
}: ProfilePreviewProps) {
  const uniqTeamMembers = uniqBy(
    userProfile.teamMembers,
    (tm) => tm.team?.challengeId
  );
  const mostPlayedRole = calculateMostPlayedRole(userProfile?.teamMembers);
  return (
    <div className="bg-[#04051B] font-secondary">
      {onBack && (
        <div className="flex items-center gap-3 my-2">
          <button
            className="btn btn-ghost border-none text-white"
            onClick={onBack}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back
          </button>
        </div>
      )}

      <div className="border border-[#1E293B] rounded-lg p-6 bg-[#04051B]">
        <div className="flex gap-5 w-full">
          {/* Left Column - Fixed width sidebar */}
          <div className="w-[21.35%] flex-shrink-0">
            <div className="flex flex-col items-center">
              <Image
                src={user?.imageUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-[180px] h-[180px] rounded-full mb-4"
                width={180}
                height={180}
              />
              <div className="w-full border-b border-b-grey-800 mb-2 pb-3 ">
                <p className="body-2 font-bold mb-5">{user?.username}</p>
                <p className="body-4 text-grey-400">
                  {maskWalletAddress(userProfile.walletAddress)}
                </p>
                <div className="flex gap-3 flex-col">
                  {userProfile.socialAuths
                    .filter((con) => con.authStatus === "AUTHORIZED")
                    .filter((con) => con.platform !== "Figma")
                    .map((con) => (
                      <Link
                        className="flex items-center gap-2"
                        href={getSocialConnectLink(con)}
                        key={con.platform}
                      >
                        <Image
                          src={`/icons/${con.platform.toLowerCase()}.svg`}
                          alt={con.platform}
                          height={20}
                          width={20}
                        />
                        <p className="body-4 text-grey-400">@{con.handle}</p>
                      </Link>
                    ))}
                  {userProfile.telegramLink && (
                    <div
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={`/icons/telegram.svg`}
                        height={20}
                        width={20}
                        alt={""}
                      />
                      <p className="body-4 text-grey-400">
                        @{userProfile.telegramLink}
                      </p>
                    </div>
                  )}
                  {userProfile.twitterLink && (
                     <div
                     className="flex items-center gap-2"
                   >
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Image
                        src={`/icons/twitter.svg`}
                        height={12}
                        width={12}
                        alt={""}
                      />
                    </div>
                      <p className="body-4 text-grey-400">
                        @{userProfile.twitterLink}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full border-b border-b-grey-800 mb-2 pb-3 ">
                <p className="body-4 font-bold mb-3">Roles</p>
                <div className="flex gap-2 flex-wrap">
                  {userProfile.roles.map((role) => (
                    <TagRole label={role} key={role} />
                  ))}
                </div>
              </div>
              <div className="w-full border-b border-b-grey-800 mb-2 pb-3">
                <p className="body-4 font-bold mb-3">Skills</p>
                <div className="flex gap-2 flex-wrap">
                  {userProfile.skills.map((skill) => (
                    <TagSkill label={skill} key={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-[78.65%] space-y-6">
            {/* About Me */}
            {userProfile?.bio && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  About Me
                </h3>
                <p className="text-gray-300 text-sm">{userProfile?.bio}</p>
              </div>
            )}

            {/* Challenges */}
            {userProfile?.showChallenges && (
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
                            href={`/en/campaigns/${tm.team?.challengeId}`}
                            className="flex justify-start"
                          >
                            <div className="ml-5 my-2 w-[48px] h-[48px]">
                              <Image
                                src={
                                  tm.team?.challenge?.bannerUrl ??
                                  unsplash("event")
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
                                {formatDate(tm.team?.challenge?.startTime)}{" "}
                                {"->"} {formatDate(tm.team?.challenge?.endTime)}
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
            {userProfile?.showPinnedProjects &&
              userProfile?.projects.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-4">
                    Pinned Projects
                  </h3>
                  <div className="space-y-4">
                    {userProfile.projects.map((project) => {
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
            {userProfile?.showPinnedLinks && userProfile?.links?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  Pinned Links
                </h3>
                <div className="flex flex-wrap gap-4">
                  {userProfile.links
                    .filter((link) => link.pinned)
                    .map((link,index) => (
                      <div
                        key={link.url + index}
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
            {userProfile?.showAdditionalInfo && userProfile?.additionalInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  Additional Info
                </h3>
                <p className="text-gray-300 text-sm">{userProfile.additionalInfo}</p>
              </div>
            )}

            {/* Teamwork */}
            {userProfile?.showTeamwork && (
              <div>
                <p className="body-2 text-grey-500 font-bold">Teamwork</p>
                {userProfile.teamMembers.length > 0 ? (
                  <div className="flex flex-wrap gap-4  my-4">
                    {userProfile.teamMembers.map((tm) => {
                      if (tm.team?.challenge?.title == "General") {
                        return;
                      }
                      return <TeamCard member={tm} key={tm.id} lng={"en"} />;
                    })}
                  </div>
                ) : (
                  <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
                    Not in any teams yet.
                  </div>
                )}
              </div>
            )}

            {/* Stats */}
            {userProfile?.showStats && (
              <div className="mt-5">
                <h3 className="text-lg mt-5 font-semibold text-gray-400 mb-2">
                  Stats
                </h3>
                <div className="flex gap-4 mb-8">
                  <div className="w-[219.75px] h-[76px] p-4 rounded-[2px] border border-[#1E293B] bg-[#0B0C24] flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-base text-white">
                      {formatDate(userProfile?.createdAt) || "N/A"}
                    </p>
                  </div>
                  <div className="w-[219.75px] h-[76px] p-4 rounded-[2px] border border-[#1E293B] bg-[#0B0C24] flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Teammates</p>
                    <p className="text-base text-white">
                      {userProfile?.teamMembers?.length || 0}
                    </p>
                  </div>
                  <div className="w-[219.75px] h-[76px] p-4 rounded-[2px] border border-[#1E293B] bg-[#0B0C24] flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Most Played Role</p>
                    <p className="text-base text-white">{mostPlayedRole}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
