import { useEffect, useState } from "react";
import { Project } from "@/services/types";
import { useDialogStore } from "@/components/dialog/store";
import { useToastStore } from "@/components/toast/store";
import { useFetchProjectsByUser } from "@/services/user.query";
import GithubProjectItem from "./github-project-item";
import { User } from "@clerk/nextjs/dist/types/server";
import { useRouter } from "next/navigation";
import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Select } from "@/components/form/control";
import { Control } from "react-hook-form";
import { OptionItem } from "@/constants/options/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/form/switch";

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
  control: Control<any>;
  setValue: UseFormSetValue<any>;
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
  register,
  control,
  setValue,
}: Props) => {
  const projectOptions: OptionItem<string>[] = githubRepo.map(project => ({
    value: project.id,
    label: project.name,
    classes: {
      container: "bg-midnight text-gray-300",
      text: "text-gray-300"
    }
  }));

  return (
    <div className="mt-6">
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        {/* Pinned Projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-semibold text-white">
              Pinned Projects
            </h4>
            <Switch
              name="showPinnedProjects"
              control={control}
              onValueChange={(value) => setValue('showPinnedProjects', value)}
            />
          </div>
          
          <div className="mb-4">
            <Select
              name="projectSelect"
              control={control}
              options={projectOptions}
              isSingle
              maxSelections={1}
              usHandler={(values) => {
                if (values.length > 0) {
                  onPinProject(values[0]);
                }
              }}
              hideError={true}
              placeholder="Select a project to pin"
              alwaysShowPlaceholder={true}
              isOptionDisabled={(option) => !!pinnedProjects.find(p => p.id === option.value)}
            />
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
            <div className="flex flex-wrap gap-3">
              {pinnedProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="relative h-10 w-[234px] bg-[#0B0C24] rounded flex items-center px-3"
                >
                  <span className="text-gray-300 truncate pr-8">
                    {project.name}
                  </span>
                  <button
                    type="button"
                    className="absolute right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => onUnpinProject(project.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No pinned projects yet. Select projects to pin them to your profile.
            </p>
          )}

          <div className="mt-6">
            <button 
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-day hover:text-day/80 transition-colors duration-200"
              onClick={onShowImportDialog}
            >
              <PlusIcon className="w-3 h-3" />
              Add New Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 