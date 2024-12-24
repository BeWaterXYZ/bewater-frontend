import { Project, UserProfile } from "@/services/types";
import Image from "next/image";
import GithubProjectItem from "./github-project-item";
import { User } from "@clerk/nextjs/server";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { styleMap } from "@/constants/options/role";
import type { RoleUnion } from "@/constants/options/role";

interface ProfilePreviewProps {
  user: User | null | undefined;
  userProfile: UserProfile;
  onBack: () => void;
}

export default function ProfilePreview({ 
  user, 
  userProfile, 
  onBack 
}: ProfilePreviewProps) {
  return (
    <div className="bg-[#04051B]">
      <div className="flex items-center gap-3 my-2">
        <button 
          className="btn btn-ghost border-none text-white"
          onClick={onBack}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>
      
      <div className="border border-[#1E293B] rounded-lg p-6 bg-[#04051B]">
        <div className="flex gap-8">
          {/* Left Column - Fixed width sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="flex flex-col items-center">
              <Image 
                src={user?.imageUrl || '/default-avatar.png'} 
                alt="Profile" 
                className="w-[205px] h-[205px] rounded-full mb-4"
                width={205}
                height={205}
              />
              <h2 className="text-2xl font-bold mb-2 text-white">{user?.username}</h2>
              
              {/* Contact Info */}
              {userProfile?.telegramLink && (
                <div className="mb-4 text-center">
                  <p className="text-gray-400">Telegram: {userProfile.telegramLink}</p>
                </div>
              )}
              
              {/* Roles */}
              {userProfile?.roles && userProfile.roles.length > 0 && (
                <div className="mb-4 w-full">
                  <h3 className="text-sm font-semibold text-white mb-2">Roles</h3>
                  <div className="flex flex-col gap-2">
                    {userProfile.roles.map((role, index) => (
                      <span 
                        key={index} 
                        className={`px-2 py-1 max-w-fit rounded-[2px] text-sm text-white text-center ${styleMap[role as RoleUnion]}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Skills */}
              {userProfile?.skills && userProfile.skills.length > 0 && (
                <div className="w-full">
                  <h3 className="text-sm font-semibold text-white mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-[#1E293B] text-gray-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex-1 space-y-6">
            {/* About Me */}
            {userProfile?.bio && (
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">About Me</h3>
                <p className="text-gray-300">{userProfile?.bio}</p>
              </div>
            )}

            {/* Challenges */}
            {userProfile?.showChallenges && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Challenges</h3>
                <div className="text-gray-300">
                  {/* Add challenges content here */}
                </div>
              </div>
            )}

            {/* Pinned Projects */}
            {userProfile?.showPinnedProjects && userProfile?.projects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-4">Pinned Projects</h3>
                <div className="space-y-4">
                  {userProfile.projects.map((project) => (
                    <div 
                      key={project.id}
                      className="relative h-[144px] rounded-[4px] overflow-hidden p-4"
                      style={{
                        background: 'linear-gradient(180deg, #242667 0%, #080827 100%)',
                      }}
                    >
                      {/* Gradient Border Overlay */}
                      <div 
                        className="absolute inset-0 rounded-[4px] pointer-events-none"
                        style={{
                          padding: '1px',
                          background: 'radial-gradient(100% 100% at 50% 0%, #474ABD 0%, #1F2177 100%)',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
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
                  ))}
                </div>
              </div>
            )}

            {/* Pinned Links */}
            {userProfile?.showPinnedLinks && userProfile?.links?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Pinned Links</h3>
                <div className="space-y-2">
                  {userProfile.links.filter(link => link.pinned).map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-300">{link.icon}</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-400 hover:text-blue-300 hover:underline">
                        {link.description || link.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {userProfile?.showAdditionalInfo && userProfile?.additionalInfo && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Additional Info</h3>
                <p className="text-gray-300">{userProfile.additionalInfo}</p>
              </div>
            )}

            {/* Teamwork */}
            {userProfile?.showTeamwork && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Teamwork</h3>
                <div className="text-gray-300">
                  {/* Add teamwork content here */}
                </div>
              </div>
            )}

            {/* Stats */}
            {userProfile?.showStats && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Stats</h3>
                <div className="text-gray-300">
                  {/* Add stats content here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 