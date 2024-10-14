"use client";
import { useAlert } from "@/components/alert/store";
import { SwitchRaw } from "@/components/form/switch";
import { useToastStore } from "@/components/toast/store";
import { deleteChallenge, updateChallenge } from "@/services/challenge";
import { Challenge } from "@/services/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditSettings({ challenge }: { challenge: Challenge }) {
  let addToast = useToastStore((s) => s.add);

  const { confirm } = useAlert();
  const router = useRouter();
  const [hideTeamProfile, setHideTeamProfile] = useState(
    challenge.yotadata?.hideTeamProfile ?? false
  );

  const onDelete = async () => {
    let confirmed = await confirm({
      title: "Are you sure?",
      description: "You are going to delete the campaign",
      okCopy: "Confirm",
      cancelCopy: "Cancel",
    });
    if (!confirmed) return;
    await deleteChallenge(challenge.id);

    addToast({
      type: "success",
      title: "Deleted",
    });

    router.push("/host");
  };

  const onHide = async () => {
    await updateChallenge({
      id: challenge.id,
      yotadata: {
        ...challenge.yotadata,
        hideTeamProfile,
      },
    });

    addToast({
      type: "success",
      title: "Updated",
    });
  };

  return (
    <div className="font-secondary z-30 h-full w-full p-8 overflow-y-auto">
      <div className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
        General
      </div>
      <p className="body-3 py-4">Campaign Type</p>
      <p className="heading-5 bg-white/[0.08] p-4 rounded border-white/10">
        {challenge.type === "CHALLENGE" ? (
          <div className="flex flex-col md:flex-row items-center gap-2 text-grey-300">
            <Image
              src="/assets/hackathon.png"
              width={64}
              height={64}
              alt="hackathon"
            />
            Hackathon
          </div>
        ) : challenge.type === "WORKSHOP" ? (
          <div className="flex flex-col md:flex-row items-center gap-2 text-grey-300">
            <Image
              src="/assets/workshop.png"
              width={64}
              height={64}
              alt="workshop"
            />
            Workshop
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-2 text-grey-300">
            <Image
              src="/assets/demoday.png"
              width={64}
              height={64}
              alt="demoday"
            />
            Others
          </div>
        )}
      </p>
      <p className="body-3 py-4">Privacy Settings</p>
      <p className="text-grey-300 pb-4">
        <SwitchRaw
          label="Hide Team Profile"
          onCheckedChange={(v) => setHideTeamProfile(v)}
          checked={hideTeamProfile}
        />
      </p>
      <p>
        <button className="btn btn-primary" onClick={onHide}>
          {" "}
          Save
        </button>
      </p>

      <div className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
        Danger Zone
      </div>
      <p className="body-3 py-4">Delete</p>
      <p className="body-3 text-grey-600 py-4">
        If you want to permanently delete this campaign, all of its data will
        remove.
      </p>

      <button className="btn btn-danger" onClick={onDelete}>
        {" "}
        Delete this campaign
      </button>
    </div>
  );
}
