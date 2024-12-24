import { Project, UserProfile } from "@/services/types";
import Image from "next/image";
import GithubProjectItem from "./github-project-item";
import { User } from "@clerk/nextjs/server";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

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
    <div>
      <div className="flex items-center gap-3 my-2">
        <button 
          className="btn btn-ghost border-none"
          onClick={onBack}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>
      
      <div className="border rounded-lg p-6 bg-white">
        <div className="flex items-center gap-4 mb-6">
          <Image 
            src={user?.imageUrl || '/default-avatar.png'} 
            alt="Profile" 
            className="w-20 h-20 rounded-full"
            width={80}
            height={80}
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-gray-600">{userProfile?.bio}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-500">Projects</h3>
          {userProfile?.showPinnedProjects && userProfile?.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <GithubProjectItem
                project={project}
                onEdit={undefined}
                isPreview={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 