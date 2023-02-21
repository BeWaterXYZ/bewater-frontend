import { Aspect } from '@/components/aspect';
import { TagProjectTag } from '@/components/tag/project-tag';
import { Project } from '@/services/types';
import Image from 'next/image';
import Link from 'next/link';
import { TeamAvatarRow } from '@/components/molecules/team-avatar-row';
import { unsplash } from '@/utils/unsplash';

export function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="rounded border border-[#24254E] relative max-w-[450px] overflow-hidden flex flex-col">
      <Link
        href={`challenges/${project.team.challengeId}/projects/${project.id}`}
      >
        <Aspect ratio={3 / 2}>
          <Image
            width={450}
            height={300}
            src={project.mediaURLs[0] ?? unsplash('project')}
            alt={project.description}
          />
        </Aspect>
        <div className="absolute top-[8px] right-[8px] flex gap-2">
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
      </Link>
      <div className="p-4 bg-white/5 flex-1 flex flex-col">
        <Link
          href={`challenges/${project.team.challengeId}/projects/${project.id}`}
        >
          <h2 className="heading-6 mb-2">{project.name}</h2>
          <p className="body-3 text-gray-400 text-left ">
            {project.description}
          </p>
        </Link>
        <div className="h-[20px] invisible flex-1">_</div>
        <Link
          href={`challenges/${project.team.challengeId}/teams/${project.teamId}`}
          className="body-3 text-left mb-2"
        >
          {project.team.name}
        </Link>
        <div className="flex justify-between">
          <div className="body-3">
            <TeamAvatarRow teamMembers={project.team.teamMembers} />
          </div>
        </div>
      </div>
    </div>
  );
}
