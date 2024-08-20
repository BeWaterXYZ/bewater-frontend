import { ProjectFilter } from "@/app/[lng]/projects/project-filter";
import { useQueryBuilder } from "@/app/[lng]/campaigns/[challengeId]/query";
import { Dialogs } from "../store";

interface ProjectPageFilterDialogProps {
  data: NonNullable<Dialogs["project_page_filter"]>;
  close: () => void;
}
export default function ProjectPageFilterDialog({
  data,
  close,
}: ProjectPageFilterDialogProps) {
  const { clear } = useQueryBuilder();

  return (
    <div className="w-[80vw] h-[80vh] flex flex-col">
      <ProjectFilter tags={data.tags} />
      <div className="flex-1"></div>
      <div className="w-full flex gap-2">
        <button className="flex-1 btn btn-secondary" onClick={clear}>
          Clear All
        </button>
        <button className="flex-1 btn btn-primary" onClick={close}>
          Done
        </button>
      </div>
    </div>
  );
}
