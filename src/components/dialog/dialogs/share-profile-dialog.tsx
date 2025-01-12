import { Dialog } from "../dialog";
import { UserProfileFull } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { maskWalletAddress } from "@/utils/wallet-adress";
import { calculateMostPlayedRole, formatDate } from "@/utils/common";
import ProfilePreview from "@/app/[lng]/(authed)/settings/extra/component/profile-preview";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useDialogStore } from "../store";
import { User } from "@clerk/nextjs/server";
import { isDEV } from "@/constants";

interface ShareProfileDialogProps {
  data: {
    userProfile: UserProfileFull;
  };
  close: () => void;
}


export async function hashUserId(userId: string): Promise<string> {
  if (userId === 'anonymous') return userId;

  // 将字符串转换为 Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(userId);

  // 使用 SHA-256 进行哈希
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // 将 buffer 转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // 返回前32位
  return hashHex.slice(0, 32);
}

// 埋点函数
const trackShareAction = async (actionType: 'copy_link' | 'download_picture' | 'copy_markdown', userId: string) => {
  const hashedUserId = await hashUserId(userId);
  
  // @ts-ignore
  window.gtag('event', 'share_complete', {
    event_category: 'Share Flow',
    event_label: `Share Method Selected - ${actionType}`,
    flow_step: 'complete',
    share_method: actionType,
    user_hash: hashedUserId,
    environment: isDEV ? 'development' : 'production',
    is_production: !isDEV,
  });
};

export default function ShareProfileDialog({
  data,
  close,
}: ShareProfileDialogProps) {
  const addToast = useToastStore((s) => s.add);
  const { userProfile } = data;
  const { user } = useUser();
  const { open } = useDialogStore((s) => s);

  const handleCopyLink = async () => {
    const userId = user?.id || 'anonymous';
    await trackShareAction('copy_link', userId);
    const profileUrl = `${window.location.origin}/en/user/${userProfile.id}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      addToast({
        type: "success",
        title: "Link Copied",
        description: "Profile link has been copied to clipboard",
      });
      close();
    });
  };

  const handleShowPreview = async () => {
    const userId = user?.id || 'anonymous';
    await trackShareAction('download_picture', userId);
    open("profile_preview", {
      userProfile,
      user: user as unknown as User,
      onExport: () => {
        addToast({
          type: "success",
          title: "Download Complete",
          description: "Profile image has been downloaded to your device",
        });
      },
    });
  };

  const handleCopyMarkdown = async () => {
    const userId = user?.id || 'anonymous';
    await trackShareAction('copy_markdown', userId);
    const profileUrl = `${window.location.origin}/en/user/${userProfile.id}`;
    const mostPlayedRole = calculateMostPlayedRole(userProfile.teamMembers);

    // Generate markdown content based on profile data
    const markdown = [
      `\n## Basic Info`,
      `- 👤 Username: ${user?.username || "N/A"}`,
      `- 🔗 Wallet: ${maskWalletAddress(userProfile.walletAddress)}`,
      `- 📅 Member Since: ${formatDate(userProfile.createdAt)}`,
      `- 👥 Teammates: ${userProfile.teamMembers?.length || 0}`,
      `- 🎯 Most Played Role: ${mostPlayedRole}`,
    ];

    // Add social media connections
    const authorizedSocials = userProfile.socialAuths
      .filter((con) => con.authStatus === "AUTHORIZED")
      .filter((con) => con.platform !== "Figma");

    if (authorizedSocials.length > 0 || userProfile.telegramLink) {
      markdown.push("\n## Social Media");
      authorizedSocials.forEach((con) => {
        markdown.push(`- ${con.platform}: @${con.handle}`);
      });
      if (userProfile.telegramLink) {
        markdown.push(`- Telegram: @${userProfile.telegramLink}`);
      }
    }

    markdown.push(
      `\n## Roles`,
      userProfile.roles.map((role) => `- ${role}`).join("\n"),
      `\n## Skills`,
      userProfile.skills.map((skill) => `- ${skill}`).join("\n"),
    );

    // Add bio if exists
    if (userProfile.bio) {
      markdown.push(`\n## About Me`, userProfile.bio);
    }

    // Add pinned projects if exists
    if (userProfile.showPinnedProjects && userProfile.projects.length > 0) {
      markdown.push(`\n## Pinned Projects`);
      userProfile.projects
        .filter((project) => project.isPinned)
        .forEach((project) => {
          markdown.push(
            `\n### ${project.name}`,
            project.description || "",
            project.tags?.length ? `Tags: ${project.tags.join(", ")}` : "",
          );
        });
    }

    // Add profile link at the bottom
    markdown.push(`\n---\n[View Full Profile](${profileUrl})`);

    navigator.clipboard.writeText(markdown.join("\n")).then(() => {
      addToast({
        type: "success",
        title: "Markdown Copied",
        description: "Profile markdown has been copied to clipboard",
      });
      close();
    });
  };

  return (
    <div className="p-6 font-secondary flex flex-col justify-center items-center w-[436px]">
      <h2 className="self-start text-xl text-white my-4">Share</h2>
      <div className="flex justify-center gap-8">
        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-transparent rounded-lg">
            <Image
              src="/icons/copy-link.svg"
              alt="Copy Link"
              width={36}
              height={36}
            />
          </div>
          <span className="text-base text-white">Copy Link</span>
        </button>

        <button
          onClick={handleShowPreview}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-transparent rounded-lg">
            <Image
              src="/icons/download-pic.svg"
              alt="Download Picture"
              width={36}
              height={36}
            />
          </div>
          <span className="text-base text-white">Download Picture</span>
        </button>
      </div>
      <h2 className="self-start text-xl text-white my-4">More</h2>
      <div className="flex justify-center gap-8">
        <button
          onClick={handleCopyMarkdown}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-transparent rounded-lg">
            <Image
              src="/icons/markdown.svg"
              alt="Markdown"
              width={36}
              height={36}
            />
          </div>
          <span className="text-base text-white">Markdown</span>
        </button>
      </div>
    </div>
  );
}
