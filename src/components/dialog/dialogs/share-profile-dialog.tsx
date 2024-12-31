import { Dialog } from "../dialog";
import { UserProfileFull } from "@/services/types";
import { useToastStore } from "@/components/toast/store";
import { maskWalletAddress } from "@/utils/wallet-adress";
import { calculateMostPlayedRole, formatDate } from "@/utils/common";
import html2canvas from "html2canvas";
import ProfilePreview from "@/app/[lng]/(authed)/settings/extra/component/profile-preview";
import { useClerk } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

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

  const handleDownloadPicture = async () => {
    try {
      // Create a temporary div to render the profile preview
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1200px'; // Fixed width for better quality
      tempDiv.style.height = 'auto'; // Let height be determined by content
      document.body.appendChild(tempDiv);

      // Render the ProfilePreview component into the temp div
      const previewRoot = document.createElement('div');
      previewRoot.style.backgroundColor = '#04051B';
      previewRoot.style.padding = '20px';
      previewRoot.style.width = '100%';
      previewRoot.style.minHeight = '100%';
      previewRoot.style.display = 'flex';
      previewRoot.style.flexDirection = 'column';
      tempDiv.appendChild(previewRoot);

      // Create a React root and render the ProfilePreview
      const ReactDOM = (await import("react-dom/client")).default;
      const root = ReactDOM.createRoot(previewRoot);
      root.render(
        <ProfilePreview
          user={user as unknown as User}
          userProfile={userProfile}
          onBack={() => {}}
        />,
      );

      // Wait for images and layout to load
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the actual height of the content
      const actualHeight = previewRoot.getBoundingClientRect().height;
      tempDiv.style.height = `${actualHeight}px`;

      // Use html2canvas to capture the preview
      const canvas = await html2canvas(previewRoot, {
        backgroundColor: "#04051B",
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        width: 1200,
        height: actualHeight,
        windowWidth: 1200,
        windowHeight: actualHeight,
      });

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create download link
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${userProfile.userName || userProfile.id}-profile.png`;
          document.body.appendChild(a);
          a.click();

          // Cleanup
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          root.unmount();
          document.body.removeChild(tempDiv);

          addToast({
            type: "success",
            title: "Picture Downloaded",
            description: "Profile picture has been downloaded",
          });
        }
      }, "image/png");

      close();
    } catch (error) {
      console.error("Error generating profile picture:", error);
      addToast({
        type: "error",
        title: "Error",
        description: "Failed to generate profile picture",
      });
    }
  };

  const handleCopyMarkdown = () => {
    const profileUrl = `${window.location.origin}/en/user/${userProfile.id}`;
    const mostPlayedRole = calculateMostPlayedRole(userProfile.teamMembers);

    // Generate markdown content based on profile data
    const markdown = [
      `# ${userProfile.userName || userProfile.id}`,
      `\n## Basic Info`,
      `- 👤 Username: ${userProfile.userName || "N/A"}`,
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
    <div className="p-6 min-w-[300px]">
      <h2 className="text-xl font-semibold mb-4">Share Profile</h2>
      <div className="flex flex-col gap-3">
        <button className="btn btn-primary w-full" onClick={handleCopyLink}>
          Copy Link
        </button>
        <button
          className="btn btn-primary w-full"
          onClick={handleDownloadPicture}
        >
          Download Picture
        </button>
        <button className="btn btn-primary w-full" onClick={handleCopyMarkdown}>
          Copy Markdown
        </button>
      </div>
    </div>
  );
}
