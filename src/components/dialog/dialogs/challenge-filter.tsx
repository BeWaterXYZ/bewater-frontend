

import { ChallengeFilter } from "@/app/[lng]/campaigns/challenge-filter";
import { Dialogs } from "../store";
import { useQueryBuilder } from "@/app/[lng]/projects/query";

interface ChallengePageFilterDialogProps {
  data: NonNullable<Dialogs["challenge_page_filter"]>;
  close: () => void;
}

export default function ChallengePageFilterDialog({
  data,
  close,
}: ChallengePageFilterDialogProps) {
  const { clear } = useQueryBuilder();

  return (
    <div className="w-[80vw] h-[80vh] flex flex-col">
      <ChallengeFilter tagOptions={data.tagOptions} selectedTags={data.selectedTags} setSelectedTags={data.setSelectedTags} />
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