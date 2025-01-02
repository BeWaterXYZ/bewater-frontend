"use client";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { getOAuthUrl } from "@/services/auth";
import { 
  useFetchUserSocialConnections,
  useMutationDisconnectSocialConnection,
  useMutationUpdateUserProfile,
  useFetchUser
} from "@/services/user.query";
import { useLoadingStoreAction, useLoadingWhen } from "@/components/loading/store";
import { useState, useEffect } from "react";
import { Input } from "@/components/form/control";
import { useToastStore } from "@/components/toast/store";

export default function Page() {
  const user = useClerk().user;
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const mutation = useMutationDisconnectSocialConnection();
  const updateProfileMutation = useMutationUpdateUserProfile();
  const { data: socialConnections, isLoading } = useFetchUserSocialConnections(user?.id);
  const { data: userProfile } = useFetchUser(user?.id);
  const [telegramId, setTelegramId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const addToast = useToastStore((s) => s.add);

  useEffect(() => {
    if (userProfile?.telegramLink) {
      setTelegramId(userProfile.telegramLink);
    }
    if (userProfile?.twitterLink) {
      setTwitterId(userProfile.twitterLink);
    }
  }, [userProfile?.telegramLink, userProfile?.twitterLink]);

  useLoadingWhen(isLoading);

  const connect = async (platform: string) => {
    showLoading();
    let data = await getOAuthUrl({
      platform: platform,
      redirectURI: window.location.href,
    });
    window.location.href = data.oauthURL;
  };

  const disconnect = async (platform: string) => {
    showLoading();
    try {
      await mutation.mutateAsync(platform);
    } finally {
      dismissLoading();
    }
  };

  const updateTelegram = async () => {
    showLoading();
    try {
      await updateProfileMutation.mutateAsync({
        telegramLink: telegramId
      });
      addToast({
        title: "Telegram ID updated successfully",
        type: "success"
      });
    } catch (error) {
      addToast({
        title: "Failed to update Telegram ID",
        type: "error"
      });
    } finally {
      dismissLoading();
    }
  };

  const updateTwitter = async () => {
    showLoading();
    try {
      await updateProfileMutation.mutateAsync({
        twitterLink: twitterId
      });
      addToast({
        title: "Twitter ID updated successfully",
        type: "success"
      });
    } catch (error) {
      addToast({
        title: "Failed to update Twitter ID",
        type: "error"
      });
    } finally {
      dismissLoading();
    }
  };

  return (
    <div className="pt-8 font-secondary">
      <UserProfile
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: "#00ffff" },
          elements: {
            rootBox: "font-secondary",
            formButtonPrimary:
              "bg-day text-night hover:bg-[#00cccc] active:bg-[#009999] rounded-sm focus:shadow-none",
            card: "bg-night text-white p-0 gap-10",
            headerSubtitle: "text-gray-500",
            socialButtons: "hidden",
            dividerRow: "hidden",
            formFieldInput:
              "bg-night text-white border-gray-800 rounded-sm placeholder-gray-600",
            formFieldLabel: "text-gray-500 hidden",
            formFieldLabelRow: "mb-2",
            footer: "hidden",
            header: "text-xl gap-2",
            identityPreviewEditButton: "text-gray-500",
            formResendCodeLink:
              "text-day hover:text-[#00cccc] active:text-[#009999] rounded-none focus:shadow-none",
            navbar: "hidden",
          },
        }}
      />

      <div className="w-full max-w-[640px] mt-10">
        <h3 className="text-xl mb-6 text-white">Connected accounts</h3>
        <div className="flex flex-col gap-4">
          {["GitHub", "Figma"].map((platform) => {
            let connection = socialConnections?.find(
              (c) => c.platform.toLowerCase() === platform.toLowerCase()
            );
            return (
              <div
                key={platform}
                className="rounded-md p-4 border border-gray-800 bg-night flex items-center gap-4"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-latenight">
                  <Image
                    src={`/icons/${platform.toLowerCase()}.svg`}
                    width={24}
                    height={24}
                    alt={platform}
                  />
                </div>
                <div className="flex-1">
                  {connection ? (
                    <>
                      <p className="text-sm font-medium text-white capitalize">
                        {platform}
                      </p>
                      <p className="text-sm text-gray-400">{connection?.handle}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Connect your <span className="capitalize">{platform}</span> account
                    </p>
                  )}
                </div>
                <div>
                  {connection ? (
                    <button
                      className="btn btn-secondary-invert"
                      onClick={() => disconnect(platform)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => connect(platform)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Telegram Section */}
          <div className="rounded-md p-4 border border-gray-800 bg-night flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-latenight">
              <Image
                src="/icons/telegram.svg"
                width={24}
                height={24}
                alt="Telegram"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Telegram</p>
              <div className="mt-1">
                <Input
                  placeholder="Enter your telegram id"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="bg-night text-white border-gray-800 rounded-sm placeholder-gray-600"
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-secondary"
                onClick={updateTelegram}
                disabled={!telegramId || telegramId === userProfile?.telegramLink}
              >
                Save
              </button>
            </div>
          </div>

          {/* Twitter Section */}
          <div className="rounded-md p-4 border border-gray-800 bg-night flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-latenight">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/icons/twitter.svg"
                  width={16}
                  height={16}
                  alt="Twitter"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Twitter</p>
              <div className="mt-1">
                <Input
                  placeholder="Enter your twitter handle"
                  value={twitterId}
                  onChange={(e) => setTwitterId(e.target.value)}
                  className="bg-night text-white border-gray-800 rounded-sm placeholder-gray-600"
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-secondary"
                onClick={updateTwitter}
                disabled={!twitterId || twitterId === userProfile?.twitterLink}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
