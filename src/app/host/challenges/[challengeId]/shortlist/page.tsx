import { segmentSchema } from "../../../segment-params";
import { getChallengeTProjects } from "@/services/project"
import { getChallengeById } from "@/services/challenge"
import { Project } from "@/services/types";
import { ProjectList } from './project-list';

export default async function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  let projects: Project[] = await getChallengeTProjects(challengeId);
  const challenge = await getChallengeById(challengeId);

  projects.sort((a: any, b: any) => {
    return a['name'].toLowerCase() > b['name'].toLowerCase() ? 1 : -1;
  })

  return (
    <ProjectList challengeId={challengeId} projects={projects} challenge={challenge}  />
  )
}
