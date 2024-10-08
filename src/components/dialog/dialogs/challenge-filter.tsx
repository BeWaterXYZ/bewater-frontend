import { useState } from "react";
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
  const [selectedTags, setSelectedTags] = useState(data.selectedTags);
  const clear = () => {
    setSelectedTags([]);
  };
  const handleClose = () => {
    data.setSelectedTags(selectedTags);
    close();
  };

  return (
    <div className="w-[80vw] h-[80vh] flex flex-col">
      <ChallengeFilter
        tagOptions={data.tagOptions}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <div className="flex-1"></div>
      <div className="w-full flex gap-2">
        <button className="flex-1 btn btn-secondary" onClick={clear}>
          Clear All
        </button>
        <button className="flex-1 btn btn-primary" onClick={handleClose}>
          Done
        </button>
      </div>
    </div>
  );
}
