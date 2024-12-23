"use client";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { getOAuthUrl } from "@/services/auth";
import { 
  useFetchUserSocialConnections,
  useMutationDisconnectSocialConnection 
} from "@/services/user.query";
import { useLoadingStoreAction, useLoadingWhen } from "@/components/loading/store";

export default function Page() {
  const user = useClerk().user;
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const mutation = useMutationDisconnectSocialConnection();
  const { data: socialConnections, isLoading } = useFetchUserSocialConnections(user?.id);

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

  return (
    <div className="pt-8">
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
        </div>
      </div>
    </div>
  );
}
