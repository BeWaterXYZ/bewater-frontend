import React from 'react';
import Link from 'next/link';
import { TagProjectTag } from '@/components/tag/project-tag';
import { TeamAvatarRow } from '@/components/molecules/team-avatar-row';
import { Project } from '@/services/types';

interface GithubProjectItemProps {
  project: Project;
  onEdit?: (project: Project) => void;
}

const GithubProjectItem: React.FC<GithubProjectItemProps> = ({ project, onEdit }) => {
  return (
    <div
      key={project.id}
      className="rounded border border-[#24254E] relative max-w-[450px] overflow-hidden flex flex-col"
    >
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <div
              key={tag}
              className="inline h-6 rounded  gap-1 bg-[rgba(0,_0,_0,_0.3)] backdrop-blur-[2px]"
            >
              <TagProjectTag
                label={tag}
                className="border-none relative -top-[2px] "
              />
            </div>
          ))}
        </div>
      <div className="p-4 bg-white/5 flex-1 flex flex-col">
        <TagProjectTag
          label={project.team.challenge?.title || ""}
          className="border-none relative -top-[2px] "
        />
        <h2 className="heading-6 mb-2">{project.name}</h2>
        <p className="body-3 text-gray-400 text-left ">
          {project.description.length > 80
            ? project.description.substring(0, 80) + "..."
            : project.description}
        </p>
        <div className="h-[20px] invisible flex-1">_</div>
        {!project.userId && (
          <div className="body-3 text-left mb-2 text-ellipsis truncate">
            {project.team.name}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="body-3">
            <TeamAvatarRow teamMembers={project.team.teamMembers} lng="en" />
          </div>
          <button
            onClick={() => onEdit && onEdit(project)}
            className="btn btn-secondary"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GithubProjectItem;