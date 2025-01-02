import { Dialogs } from "../store";
import ProfilePreview from "@/app/[lng]/(authed)/settings/extra/component/profile-preview";

interface ProfilePreviewDialogProps {
  data: NonNullable<Dialogs["profile_preview"]>;
  close: () => void;
}

export default function ProfilePreviewDialog({
  data,
  close,
}: ProfilePreviewDialogProps) {
  const { userProfile, user, onExport } = data;

  return (
    <div className="p-6 relative font-secondary max-h-[90vh] flex flex-col">
      <h2 className="text-xl text-white mb-4">Preview Profile</h2>
      <div className="flex-1 overflow-y-auto mb-4">
        <ProfilePreview 
          userProfile={userProfile} 
          user={user} 
        />
      </div>
      <div className="flex justify-end gap-4 mt-auto">
        <button
          onClick={close}
          className="px-4 py-2 text-white bg-transparent border border-white/20 rounded hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          onClick={onExport}
          className="px-4 py-2 text-white bg-primary rounded hover:opacity-90"
        >
          Export
        </button>
      </div>
    </div>
  );
} 