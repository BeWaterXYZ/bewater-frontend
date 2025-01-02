import { Dialogs } from "../store";
import ProfilePreview from "@/app/[lng]/(authed)/settings/extra/component/profile-preview";
import { useRef, useState } from "react";
import { toPng } from 'html-to-image';
import { useToastStore } from "@/components/toast/store";

interface ProfilePreviewDialogProps {
  data: NonNullable<Dialogs["profile_preview"]>;
  close: () => void;
}

export default function ProfilePreviewDialog({
  data,
  close,
}: ProfilePreviewDialogProps) {
  const { userProfile, user, onExport } = data;
  const previewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const addToast = useToastStore((s) => s.add);

  const handleExport = async () => {
    if (!contentRef.current) return;
    
    try {
      setIsCapturing(true);

      // 等待所有图片加载完成
      const images = Array.from(contentRef.current.getElementsByTagName('img'));
      await Promise.all(
        images.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve(null);
              } else {
                img.onload = () => resolve(null);
                img.onerror = () => resolve(null);
              }
            })
        )
      );

      // 设置图片的 crossOrigin
      images.forEach(img => {
        img.crossOrigin = 'anonymous';
        // 如果是 S3 图片，添加时间戳来避免缓存
        if (img.src.includes('s3.ap-southeast-1.amazonaws.com')) {
          img.src = `${img.src}?t=${Date.now()}`;
        }
      });

      // 等待一下以确保 DOM 更新完成
      await new Promise(resolve => setTimeout(resolve, 500));

      // 保存原始滚动位置
      const scrollContainer = previewRef.current;
      const originalScrollTop = scrollContainer?.scrollTop || 0;
      
      if (scrollContainer) {
        // 临时移除滚动，使整个内容可见
        scrollContainer.style.overflow = 'visible';
        scrollContainer.style.height = 'auto';
      }
      
      const dataUrl = await toPng(contentRef.current, {
        quality: 1.0,
        backgroundColor: '#04051B',
        style: {
          transform: 'none',
        },
        skipAutoScale: true,
        pixelRatio: 2,
        cacheBust: true,
        includeQueryParams: true,
      });

      // 恢复滚动
      if (scrollContainer) {
        scrollContainer.style.overflow = 'auto';
        scrollContainer.style.height = '100%';
        scrollContainer.scrollTop = originalScrollTop;
      }

      // Create download link
      const link = document.createElement('a');
      link.download = `builder-profile.png`;
      link.href = dataUrl;
      link.click();
      
      onExport();
      close();
    } catch (error) {
      console.error("Export failed:", error);
      addToast({
        type: "error",
        title: "Export failed",
        description: "Please try again",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="p-6 relative font-secondary max-h-[90vh] flex flex-col">
      <h2 className="text-xl text-white mb-4">Profile Preview</h2>
      <div className="flex-1 overflow-y-auto mb-4" ref={previewRef}>
        <div ref={contentRef}>
          <ProfilePreview 
            userProfile={userProfile} 
            user={user} 
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-auto">
        <button
          onClick={close}
          className="px-4 py-2 text-white bg-transparent border border-white/20 rounded hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          disabled={isCapturing}
          className="px-4 py-2 text-white bg-primary rounded hover:opacity-90 disabled:opacity-50"
        >
          {isCapturing ? 'Downloading...' : 'Download Image'}
        </button>
      </div>
    </div>
  );
} 