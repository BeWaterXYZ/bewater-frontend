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
import { FormUserSettings } from "./form/form-settings";
import { useEffect, useState } from "react";
import { UserProfile } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import ProfilePreview from "./component/profile-preview";
import { User } from "@clerk/nextjs/dist/types/server";

export default function Page() {
  const user = useClerk().user;
  const { data: userProfile, isLoading } = useFetchUser(user?.id);
  const { data: socialConnections, isLoading: isLoading2 } = useFetchUserSocialConnections(user?.id);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const addToast = useToastStore((s) => s.add);

  // 当获取到初始数据时设置表单数据
  useEffect(() => {
    if (userProfile && !formData) {
      setFormData(userProfile);
    }
  }, [formData, userProfile]);

  const handleFormChange = (data: UserProfile) => {
    setFormData(data);
  };

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

  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  return (
    <div className="container">
      {isPreviewMode ? (
        <ProfilePreview
          user={user as unknown as User}
          userProfile={formData || userProfile}
          onBack={() => setIsPreviewMode(false)}
        />
      ) : (
        <>
          <div className="flex justify-start gap-3 my-2">
            <button 
              className="btn btn-secondary"
              onClick={handlePreview}
            >
              Preview
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleShare}
            >
              Share
            </button>
          </div>

          <FormUserSettings 
            data={formData || userProfile}
            user={user as unknown as User}
            socialConnections={socialConnections}
            onFormChange={handleFormChange}
          />
        </>
      )}
    </div>
  );
}
