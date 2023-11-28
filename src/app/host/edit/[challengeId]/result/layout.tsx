import { segmentSchema } from "@/app/host/segment-params";
import { getChallengeTProjects } from "@/services/project";
import { CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const projects = await getChallengeTProjects(challengeId);
  return (
    <div className="container my-8">
      <div className="flex gap-4">
        <div className="flex-1 h-24 p-4 bg-[#11111B] border border-[#323232] flex items-center justify-between gap-2">
          <div>
            <p className="body-1">Shortlist</p>
            <p className="body-3 text-grey-400">
              Shortlisted projects and participate in the judges’ scoring
            </p>
          </div>
          <div className="body-2 whitespace-nowrap">
            {projects.length} Projects
          </div>
          <Link
            className="p-4"
            href={`/host/edit/${challengeId}/result/shortlist`}
          >
            <CaretRightIcon className="text-white/30" />
          </Link>
        </div>
        <div className="flex-1 h-24 p-4 bg-[#11111B] border border-[#323232] flex items-center justify-between gap-2">
          <div>
            <p className="body-1">Final Result</p>
            <p className="body-3 text-grey-400">
              The projects that finally won the competition prize
            </p>
          </div>
          <div className="body-2 whitespace-nowrap">
            {projects.length} Waiting for editing
          </div>
          <Link className="p-4" href={`/host/edit/${challengeId}/result/final`}>
            <CaretRightIcon className="text-white/30" />
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
