import { Aspect } from '@/components/aspect';
import { TagProjectTag } from '@/components/tag/project-tag';
import { Project } from '@/services/types';
import Image from 'next/image';
import Link from 'next/link';
import { TeamAvatarRow } from '@/components/molecules/team-avatar-row';

export function ProjectItem({ project }: { project: Project }) {
  let url =
    'https://source.unsplash.com/random/?Cryptocurrency&' + Math.random();
  return (
    <Link
      href={`challenges/${project.team.challengeId}/projects/${project.id}`}
    >
      <div className="rounded border border-[#24254E] relative max-w-[450px]">
        <Aspect ratio={3 / 2}>
          <Image fill src={url} alt="crypto" className="object-cover" />
        </Aspect>
        <div className="absolute top-[16px] right-[16px]">
          {project.tags.map((tag) => (
            <TagProjectTag label={tag} key={tag} />
          ))}
        </div>
        <div className="p-4 bg-white/5 ">
          <h2 className="heading-6 mb-2">{project.name}</h2>
          <p className="body-3 text-gray-400 text-left">
            {project.description}
          </p>

          <div className="h-[20px] invisible">_</div>
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
            {/* <div className="body-3">stats</div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
