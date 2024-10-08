import { useState } from "react";
import { Input } from "@/components/form/input";

interface AddChallengeTagDialogProps {
  data: {
    onAdd: (tag: string) => void;
  };
  close: () => void;
}

export default function AddChallengeTagDialog({
  data,
  close,
}: AddChallengeTagDialogProps) {
  const [tag, setTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim()) {
      data.onAdd(tag.trim());
      close();
    }
  };

  return (
    <div className="w-[80vw] max-w-md">
      <h2 className="text-xl mb-4 text-white">Add Challenge Tag</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter a new tag"
        />
        <div className="flex justify-end mt-4">
          <button type="button" onClick={close} className="btn btn-secondary mr-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}