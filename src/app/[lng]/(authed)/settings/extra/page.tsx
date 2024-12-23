"use client";
import {
  useLoadingStoreAction,
  useLoadingWhen,
} from "@/components/loading/store";
import { getOAuthUrl } from "@/services/auth";
import {
  useFetchUser,
  useFetchUserSocialConnections,
} from "@/services/user.query";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { FormUserSettings } from "./form/form-settings";
import { useDialogStore } from "@/components/dialog/store";
import { useEffect, useState } from "react";
import { GithubRepo, Project } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { ProjectItem } from "@/app/[lng]/projects/project-item";
import { unsplash } from "@/utils/unsplash";
import { Aspect } from "@/components/aspect";
import { TagProjectTag } from "@/components/tag/project-tag";
import Link from "next/link";
import { TeamAvatarRow } from "@/components/molecules/team-avatar-row";
import GithubProjectItem from "./component/github-project-item";
import { useRouter } from "next/navigation";
import ProfilePreview from "./component/profile-preview";
import { User } from "@clerk/nextjs/dist/types/server";

export default function Page() {
  const user = useClerk().user;
  const { data: userProfile, isLoading } = useFetchUser(user?.id);
  const { data: socialConnections, isLoading: isLoading2 } = useFetchUserSocialConnections(user?.id);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const addToast = useToastStore((s) => s.add);

  useLoadingWhen(isLoading || isLoading2);

  if (isLoading || isLoading2) return null;
  if (!userProfile) return null;

  const handleShare = () => {
    if (userProfile) {
      const profileUrl = `${window.location.origin}/en/profile/${userProfile.id}`;
      navigator.clipboard.writeText(profileUrl).then(() => {
        addToast({
          type: "success",
          title: "Link Copied",
          description: "Profile link has been copied to clipboard",
        });
      });
    }
  };

  return (
    <div className="container">
      {isPreviewMode ? (
        <ProfilePreview
          user={user as unknown as User}
          userProfile={userProfile}
          onBack={() => setIsPreviewMode(false)}
        />
      ) : (
        <>
          <div className="flex justify-end gap-3 mb-6">
            <button 
              className="btn btn-secondary"
              onClick={() => setIsPreviewMode(true)}
            >
              Preview
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleShare}
            >
              Share
            </button>
          </div>

          <FormUserSettings 
            data={userProfile}
            user={user as unknown as User}
            socialConnections={socialConnections}
          />
        </>
      )}
    </div>
  );
}
