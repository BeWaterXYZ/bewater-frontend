import { Dialog } from "../dialog";
import { UserProfileFull } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { maskWalletAddress } from "@/utils/wallet-adress";
import { calculateMostPlayedRole, formatDate } from "@/utils/common";
import ProfilePreview from "@/app/[lng]/(authed)/settings/extra/component/profile-preview";
import { useClerk } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

interface ShareProfileDialogProps {
  data: {
    userProfile: UserProfileFull;
  };
  close: () => void;
}

export default function ShareProfileDialog({
  data,
  close,
}: ShareProfileDialogProps) {
  const addToast = useToastStore((s) => s.add);
  const { userProfile } = data;
  const user = useClerk().user;
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCopyLink = () => {
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

  const handleDownloadPicture = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      if (!previewRef.current) return;

      // 预加载所有图片
      // const images = Array.from(previewRef.current.getElementsByTagName('img'));
      // await Promise.all(
      //   images.map(
      //     (img) =>
      //       new Promise((resolve) => {
      //         if (img.complete) {
      //           resolve(null);
      //         } else {
      //           img.onload = () => resolve(null);
      //           img.onerror = () => resolve(null);
      //         }
      //       })
      //   )
      // );

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#04051B",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(previewRef.current?.id || '');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.width = '1200px';
            clonedElement.style.height = 'auto';
          }
        }
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${userProfile.userName || userProfile.id}-profile.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);

          addToast({
            type: "success",
            title: "Picture Downloaded",
            description: "Profile picture has been downloaded",
          });

          close();
        }
      }, 'image/png');
    } catch (error) {
      console.error("Error details:", error);
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to generate profile picture",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [userProfile.userName, userProfile.id, addToast, close, isGenerating]);

  const handleCopyMarkdown = () => {
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
    <div className="p-6 relative font-secondary flex justify-center items-center w-[436px] h-[236px]">
      <h2 className="text-xl absolute top-5 left-5 text-white mb-4">Share</h2>
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

        {/* <button 
          onClick={handleDownloadPicture}
          disabled={isGenerating}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-[#1E293B] rounded-lg">
            <Image
              src="/icons/picture.svg"
              alt="Download Picture"
              width={24}
              height={24}
            />
          </div>
          <span className="text-sm text-[#94A3B8]">{isGenerating ? 'Generating...' : 'Download Picture'}</span>
        </button> */}
      </div>
    </div>
  );
}
