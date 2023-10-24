import { segmentSchema } from "../../../segment-params";
import { getChallengeTProjects } from "@/services/project"
import { getShortlistByChallenge } from "@/services/challenge";
import { Project } from "@/services/types";
import { ProjectList } from './project-list';

export default async function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  let projects: Project[] = await getChallengeTProjects(challengeId);
  const shortlist   = await getShortlistByChallenge(challengeId);

  projects = projects.map((it) => {
    if (shortlist.ids.some((projectId) => projectId === it.id)) {
      it.promoted = true;
    }
    return it;
  })

  projects.sort((a: any, b: any) => {
    return a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1;
  })

  return (
    <ProjectList challengeId={challengeId} projects={projects} />
  )
}
