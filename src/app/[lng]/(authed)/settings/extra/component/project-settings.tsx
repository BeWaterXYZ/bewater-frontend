import { useEffect, useState } from "react";
import { Project } from "@/services/types";
import { useDialogStore } from "@/components/dialog/store";
import { useToastStore } from "@/components/toast/store";
import { useFetchProjectsByUser } from "@/services/user.query";
import GithubProjectItem from "./github-project-item";
import { User } from "@clerk/nextjs/dist/types/server";
import { useRouter } from "next/navigation";
import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

interface Props {
  user?: User;
  socialConnections?: Array<{platform: string; handle: string}>;
  githubRepo: Project[];
  pinnedProjects: Project[];
  onPinProject: (projectId: string) => void;
  onUnpinProject: (projectId: string) => void;
  onEditProject: (project: Project) => void;
  onShowImportDialog: () => void;
  register: UseFormRegister<any>;
}

export const ProjectSettings = ({ 
  user, 
  socialConnections = [], 
  githubRepo,
  pinnedProjects,
  onPinProject,
  onUnpinProject,
  onEditProject,
  onShowImportDialog,
  register 
}: Props) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-500">
          Your Projects
        </h3>
        <button 
          type="button"
          className="btn btn-primary" 
          onClick={onShowImportDialog}
        >
          Create New Project
        </button>
      </div>

      {/* Pinned Projects */}
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-3 text-gray-500">
          Pinned Projects
        </h4>
        
        <div className="mb-4">
          <select 
            className="select select-bordered w-full"
            onChange={(e) => onPinProject(e.target.value)}
            value=""
          >
            <option value="" disabled>Select a project to pin</option>
            {githubRepo.map((project) => (
              <option 
                key={project.id} 
                value={project.id}
                disabled={!!pinnedProjects.find(p => p.id === project.id)}
              >
                {project.name}
              </option>
            ))}
          </select>
          {pinnedProjects.length >= 3 && (
            <p className="text-sm text-gray-500 mt-1">
              You can pin up to 3 projects
            </p>
          )}
        </div>

        <input 
          type="hidden" 
          {...register('pinnedProjects')}
        />

        {pinnedProjects.length > 0 ? (
          <div>
            {pinnedProjects.map((project) => (
              <div key={project.id} className="mb-4 relative">
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => onUnpinProject(project.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <GithubProjectItem
                  project={project}
                  onEdit={onEditProject}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No pinned projects yet. Select projects to pin them to your profile.
          </p>
        )}
      </div>
    </div>
  );
}; 