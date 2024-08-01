"use client";

import { Team } from "@/services/types";
import { useNavigator } from "@/hooks/useNavigator";
import { useDialogStore } from "@/components/dialog/store";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";

export let TeamStatus = ({ team, lng }: { team: Team; lng: string }) => {
  const clerk = useClerk();
  const user = useClerk().user;
  const showDialog = useDialogStore((s) => s.open);
  const navigator = useNavigator(lng);
  const isMyTeam = team.teamMembers.some(
    (m) => m.userProfile.clerkId === user?.id
  );
  const requestJoin = () => {
    if (!clerk.user) {
      clerk.redirectToSignIn();
      return;
    }
    showDialog("team_join", team);
  };

  if (!!clerk.user && isMyTeam) {
    return (
      <div className="flex items-center">
        <Image
          src="/challenge/assets/star.svg"
          height={16}
          width={16}
          alt="star"
          className="mx-2"
        />
        <p className="body-2">My Team</p>
      </div>
    );
  }
  return (
    <button className="btn btn-secondary w-28" onClick={requestJoin}>
      JOIN
    </button>
  );
};
