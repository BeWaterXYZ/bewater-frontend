import { Project } from "@/services/types";
import Image from "next/image";
import GithubProjectItem from "./github-project-item";
import { User } from "@clerk/nextjs/server";

interface ProfilePreviewProps {
  user: User | null | undefined;
  bio?: string;
  projects: Project[];
  onBack: () => void;
}

export default function ProfilePreview({ 
  user, 
  bio, 
  projects, 
  onBack 
}: ProfilePreviewProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button 
          className="btn btn-secondary"
          onClick={onBack}
        >
          ← Back to Edit
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
            <p className="text-gray-600">{bio}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-500">Projects</h3>
          {projects && projects.map((project) => (
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