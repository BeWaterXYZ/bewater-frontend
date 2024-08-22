"use client";
import { Aspect } from "@/components/aspect";
import { useLoadingWhen } from "@/components/loading/store";
import { TeamMember } from "@/components/molecules/team-member";
import { TagProjectTag } from "@/components/tag/project-tag";
import { useFetchChallengeById } from "@/services/challenge.query";
import { useFetchProject } from "@/services/project.query";
import { unsplash } from "@/utils/unsplash";
import { formatDistance, parseISO } from "date-fns";
import dynamicLoad from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { segmentSchema } from "../param-schema";
import { ProjectAssets } from "./project-assets";
import { GithubStats } from "./project-github";
import { Rate } from "./rate";

const ProjectMenu = dynamicLoad(() => import("./project-menu"), {
  ssr: false,
});
const ProjectMedia = dynamicLoad(() => import("./project-media"), {
  ssr: false,
});

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { projectId } = segmentSchema.projectId.parse(params);
  const { data: project, isLoading } = useFetchProject(projectId);
  const { data: challenge } = useFetchChallengeById(challengeId);

  useLoadingWhen(isLoading);

  if (!project || !challenge) return null;

  const { lng } = segmentSchema.lng.parse(params);

  // console.log(project)

  const share = () => {
    if (!window) return;
    let url =
      window.location.origin +
      `/campaigns/${challenge.id}/projects/${project.id}`;

    let usp = new URLSearchParams();
    usp.append(
      "text",
      `快来加入 我在 ${challenge.title} 上发现的 "${project.name}" 项目吧!`
    );

    usp.append("url", url);
    usp.append("hashtags", "BeWaterWeb3Campaign");
    let twitterURL = "http://twitter.com/share?" + usp.toString();
    window!.open(twitterURL, "_blank")!.focus();
  };

  return (
    <div className="container">
      <div className="my-10 flex justify-between">
        <Link
          className="body-3 text-grey-400"
          href={`/${lng}/campaigns/${challengeId}/projects`}
        >
          {"< Project List"}
        </Link>
        <button className="btn btn-secondary" onClick={share}>
          Share
        </button>
      </div>

      <div className="flex flex-wrap rounded border border-[#24254E]">
        <div className="w-full lg:w-[400px]">
          <div className="hidden lg:block h-full relative">
            <Image
              width={450}
              height={300}
              src={project?.mediaURLs?.[0] ?? unsplash("conference")}
              alt="project"
              className="object-cover block h-full absolute w-full top-0 left-0"
            />
          </div>
          <div className="block lg:hidden">
            <Aspect ratio={3 / 2}>
              <Image
                width={450}
                height={300}
                src={project?.mediaURLs?.[0] ?? unsplash("conference")}
                alt="project"
                className="object-cover block w-full h-full"
              />
            </Aspect>
          </div>
        </div>
        <div className="flex-1 p-7">
          <div className="flex justify-between ">
            <p className="heading-6 ">{project.name}</p>
            <ProjectMenu project={project} />
          </div>
          <p className="body-3 text-grey-500 my-3">
            {project.team.name} · Updated{" "}
            {formatDistance(parseISO(project.updatedAt), Date.now())}
          </p>

          <div className="body-3 text-grey-300 my-3">
            {project.description.split("\n").map((s, i) => (
              <p key={i} className="py-2">
                {s}
              </p>
            ))}
          </div>
          <div>
            {project.tags.map((tag) => (
              <TagProjectTag label={tag} key={tag} />
            ))}
          </div>
          <Rate project={project} challenge={challenge} />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="body-3 font-bold text-grey-500">Media</h3>
        <ProjectMedia project={project} challenge={challenge} />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 mb-30">
        <div className="flex-[2] lg:max-w-[400px]">
          <ProjectAssets project={project} challenge={challenge} />
          {/* members */}
          <div className="">
            <h3 className="body-3 font-bold text-grey-500">Members</h3>
            <div className="my-5">
              {project.team.teamMembers.map((m) => (
                <TeamMember member={m} key={m.userProfile.id} lng={lng} />
              ))}
            </div>
            <Link
              className="body-3 text-day uppercase "
              href={`/${lng}/campaigns/${project.team.challengeId}/teams/${project.team.id}`}
            >
              {"CHECK TEAM DETAIL ->"}
            </Link>
          </div>
        </div>
        <div className="flex-[3]">
          <GithubStats project={project} challenge={challenge} />
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
