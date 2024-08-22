import {
  Challenge,
  ChallengeID,
  Project,
  Team,
  TeamID,
} from "@/services/types";
import { create } from "zustand";

export type Dialogs = {
  metamask_not_support?: boolean;
  team_join?: Team;
  team_create?: { challenge?: Challenge; team?: Team & Project };
  team_created?: { challenge: Challenge; teamId: TeamID };
  team_manage_member?: Team;
  team_invite_member?: Team;
  team_filter?: Team[];
  email_change?: boolean;
  project_filter?: { challenge: Challenge; projects: Project[] };
  project_page_filter?: { tags: string[]; };
  project_edit?: Project;
  project_rating?: {
    project: Project;
    rating: { label: string; rate: number }[];
  };
  rating_dimensions?: {
    challenge: Challenge;
  };
  rating_judge_invite?: {
    challengeId: ChallengeID;
  };
};

type State = {
  dialogs: Dialogs;
};

export type DialogsKeys = keyof Dialogs;
export type CloseDialogFunc = <T extends DialogsKeys>(name: T) => void;

type Actions = {
  open: <T extends DialogsKeys>(
    name: T,
    data: Dialogs[T] | ((v: Dialogs[T]) => Dialogs[T])
  ) => void;
  close: CloseDialogFunc;
};

export const useDialogStore = create<State & Actions>((set) => ({
  dialogs: {},
  open: (name, data) =>
    set((old) => ({
      dialogs: {
        ...old.dialogs,
        [name]: typeof data === "function" ? data(old.dialogs[name]) : data,
      },
    })),

  close: (name) =>
    set((old) => ({ dialogs: { ...old.dialogs, [name]: undefined } })),
}));
