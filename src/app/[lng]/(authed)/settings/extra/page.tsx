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
import { UserProfile, UserProfileFull } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import ProfilePreview from "./component/profile-preview";
import { User } from "@clerk/nextjs/dist/types/server";
import { useDialogStore } from "@/components/dialog/store";
import { isDEV } from "@/constants";
import { hashUserId } from "@/components/dialog/dialogs/share-profile-dialog";

export default function Page() {
  const user = useClerk().user;
  const { data: userProfile, isLoading } = useFetchUser(user?.id);
  const { data: socialConnections, isLoading: isLoading2 } = useFetchUserSocialConnections(user?.id);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<UserProfileFull | null>(null);
  const addToast = useToastStore((s) => s.add);

  // 当获取到初始数据时设置表单数据
  useEffect(() => {
    if (userProfile && !formData) {
      setFormData(userProfile);
    }
  }, [formData, userProfile]);

  const handleFormChange = (data: UserProfileFull) => {
    setFormData(data);
  };

  useLoadingWhen(isLoading || isLoading2);

  if (isLoading || isLoading2) return null;
  if (!userProfile) return null;


  const handleShare = async () => {
    const pageName = 'Settings Page';
    const userId = user?.id || 'anonymous';
    const hashedUserId = await hashUserId(userId);

    // 记录主分享按钮点击事件
    // @ts-ignore
    window.gtag('event', 'share_initiate', {
      event_category: 'Share Flow',
      event_label: `Share Dialog Open - ${pageName}`,
      flow_step: 'initiate',
      user_hash: hashedUserId,  // 使用哈希后的用户标识
      environment: isDEV ? 'development' : 'production',
      is_production: !isDEV,
    });

    if (userProfile) {
      useDialogStore.getState().open("share_profile", {
        userProfile: formData || userProfile,
      });
    }
  };

  const handlePreview = () => {
    setIsPreviewMode(true);
  };
  if (!user) {
    return null;
  }

  return (
    <div className="container font-secondary">
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
