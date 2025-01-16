import {
  Challenge,
  ChallengeID,
  GithubRepo,
  Project,
  Team,
  TeamID,
  UserProfile,
  UserProfileFull,
} from "@/services/types";
import { create } from "zustand";
import { User } from "@clerk/nextjs/server";

export interface Dialogs {
  share_profile?: {
    userProfile: UserProfileFull;
  };
  profile_preview?: {
    userProfile: UserProfileFull;
    user: User | null | undefined;
    onExport: () => void;
  };
  metamask_not_support?: boolean;
  team_join?: Team;
  team_create?: { challenge?: Challenge; team?: Team & Project };
  team_created?: { challenge: Challenge; teamId: TeamID };
  team_manage_member?: Team;
  team_invite_member?: Team;
  team_filter?: Team[];
  email_change?: boolean;
  project_filter?: { challenge: Challenge; projects: Project[] };
  project_page_filter?: {
    filterTags: string[];
    titles: string[];
    githubTags: string[];
  };
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
  github_repo_import?: {
    githubOwnerName: string;
    onRepoImport?: (repoInfo: Project) => void;
    onRepoDelete?: (repoId: string) => void;
    repo?: Project;
  };
  add_challenge_tag?: {
    onAdd: (tag: string) => void;
  };
  challenge_page_filter?: {
    tagOptions: string[];
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  };
  link_import?: {
    onLinkAdd: (linkInfo: {
      icon: string;
      url: string;
      description: string;
    }) => void;
    editMode?: boolean;
    initialData?: {
      icon: string;
      url: string;
      description?: string;
    };
  };
  builderboard_import?: {};
}

type State = {
  dialogs: Dialogs;
};

export type DialogsKeys = keyof Dialogs;
export type CloseDialogFunc = <T extends DialogsKeys>(name: T) => void;

type Actions = {
  open: <T extends DialogsKeys>(
    name: T,
    data: Dialogs[T] | ((v: Dialogs[T]) => Dialogs[T]),
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
