"use client";
import { useDialogStore } from "@/components/dialog/store";
import { useNavigator } from "@/hooks/useNavigator";
import { Challenge, Milestone } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { useClerk } from "@clerk/nextjs";
import { compareDesc, parseISO } from "date-fns";

export function CreateTeamButton({
  challenge,
  lng,
}: {
  challenge: Challenge;
  lng: string;
}) {
  const showDialog = useDialogStore((s) => s.open);
  const navigator = useNavigator(lng);
  const addToast = useToastStore((s) => s.add);

  let submissionEndTime: string = "2099-01-01";
  for (const it of challenge.milestones) {
    if ("Project Submission" === it.stageName) {
      submissionEndTime = it.dueDate;
      break;
    }
  }

  const disabled = !(compareDesc(parseISO(submissionEndTime), new Date()) < 0);

  const clerk = useClerk();
  const onClick = () => {
    if (!clerk.user) {
      // navigator.goToConnectWallet();
      clerk.redirectToSignIn();
      return;
    }
    if (challenge.id == "134") {
      window.open("https://forms.gle/xKdUoNv3Z6PfEyV17", "_blank");
    } else {
      showDialog("team_create", { challenge });
    }
  };

  return (
    <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {challenge.id == "134" ? "Submit a team" : "Create a team"}
    </button>
  );
}
