import { Select } from "@/components/form/control";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PlusIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/form/switch";
import { useDialogStore } from "@/components/dialog/store";
import { OptionItem } from "@/constants/options/types";
import { useState } from "react";
import { getStorageUpload } from "@/services/storage";
import Image from "next/image";

interface Props {
  links: Array<{
    icon: string;
    url: string;
    description?: string;
    pinned: boolean;
  }>;
  onTogglePin: (url: string) => void;
  onAddLink: (newLink: {
    icon: string;
    url: string;
    description: string;
    pinned: boolean;
  }) => void;
  onUpdateLink: (
    oldUrl: string,
    updatedLink: {
      icon: string;
      url: string;
      description?: string;
      pinned: boolean;
    }
  ) => void;
  register: UseFormRegister<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

interface LinkState {
  icon: string | null;
  iconFile?: File;
  url: string;
  description: string;
  pinned: boolean;
  uploadStatus?: "uploading" | "uploaded" | "failed";
}

export const PinnedLinks = ({
  links,
  onTogglePin,
  onAddLink,
  onUpdateLink,
  register,
  control,
  setValue,
}: Props) => {
  const showDialog = useDialogStore((s) => s.open);
  const [uploadingLinks, setUploadingLinks] = useState<LinkState[]>([]);

  const uploadIcon = async (file: File): Promise<string> => {
    try {
      const data = await getStorageUpload();
      const res = await fetch(data.presignedURL, {
        method: "PUT",
        body: file,
      });
      if (res.status !== 200) {
        throw new Error("upload file not OK");
      }
      return data.mediaURL;
    } catch (error) {
      console.error("Failed to upload icon:", error);
      throw error;
    }
  };

  const handleShowAddLinkDialog = () => {
    showDialog("link_import", {
      onLinkAdd: async (linkInfo: {
        icon: string;
        url: string;
        description: string;
      }) => {
        if (linkInfo.icon.startsWith("data:")) {
          // Convert base64 to File
          const response = await fetch(linkInfo.icon);
          const blob = await response.blob();
          const file = new File([blob], "icon.png", { type: blob.type });

          try {
            setUploadingLinks((prev) => [
              ...prev,
              {
                icon: linkInfo.icon,
                iconFile: file,
                url: linkInfo.url,
                description: linkInfo.description,
                pinned: true,
                uploadStatus: "uploading",
              },
            ]);

            const iconUrl = await uploadIcon(file);

            onAddLink({
              icon: iconUrl,
              url: linkInfo.url,
              description: linkInfo.description,
              pinned: true,
            });

            setUploadingLinks((prev) =>
              prev.map((link) =>
                link.url === linkInfo.url
                  ? { ...link, uploadStatus: "uploaded", icon: iconUrl }
                  : link
              )
            );
          } catch (error) {
            setUploadingLinks((prev) =>
              prev.map((link) =>
                link.url === linkInfo.url
                  ? { ...link, uploadStatus: "failed" }
                  : link
              )
            );
            console.error("Failed to upload icon:", error);
          }
        } else {
          onAddLink({
            ...linkInfo,
            pinned: true,
          });
        }
      },
    });
  };

  const handleEditLink = (link: {
    icon: string;
    url: string;
    description?: string;
  }) => {
    showDialog("link_import", {
      editMode: true,
      initialData: link,
      onLinkAdd: async (linkInfo) => {
        if (linkInfo.icon.startsWith("data:")) {
          // 如果有新上传的图标
          const file = await fetch(linkInfo.icon)
            .then((res) => res.blob())
            .then((blob) => new File([blob], "icon.png", { type: blob.type }));
          try {
            setUploadingLinks((prev) => [
              ...prev,
              {
                icon: linkInfo.icon,
                iconFile: file,
                url: linkInfo.url,
                description: linkInfo.description,
                pinned: true,
                uploadStatus: "uploading",
              },
            ]);

            const iconUrl = await uploadIcon(file);

            onUpdateLink(link.url, {
              icon: iconUrl,
              url: linkInfo.url,
              description: linkInfo.description,
              pinned:true
            });

            setUploadingLinks((prev) =>
              prev.map((l) =>
                l.url === linkInfo.url
                  ? { ...l, uploadStatus: "uploaded", icon: iconUrl }
                  : l
              )
            );
          } catch (error) {
            setUploadingLinks((prev) =>
              prev.map((l) =>
                l.url === linkInfo.url ? { ...l, uploadStatus: "failed" } : l
              )
            );
            console.error("Failed to upload icon:", error);
          }
        } else {
          // 如果没有更改图标
          onUpdateLink(link.url, {
            icon: linkInfo.icon,
            url: linkInfo.url,
            description: linkInfo.description,
            pinned:true
          });
        }
      },
    });
  };


  const linkOptions: OptionItem<string>[] = links.map((link) => ({
    value: link.url,
    label: link.url,
    classes: {
      container: "bg-midnight text-gray-300",
      text: "text-gray-300",
    },
  }));

  return (
    <div className="mt-6">
      <div className="border border-[#1E293B] bg-[#0B0C24] p-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-semibold text-white">Project Links</h4>
            <Switch
              name="showPinnedLinks"
              control={control}
              onValueChange={(value) => setValue("showPinnedLinks", value)}
            />
          </div>

          <div className="mb-4">
            <Select
              name="linkSelect"
              control={control}
              options={linkOptions}
              isSingle
              maxSelections={1}
              usHandler={(values) => {
                if (values.length > 0) {
                  onTogglePin(values[0]);
                }
              }}
              hideError={true}
              placeholder="Select links (Up to 3)"
              alwaysShowPlaceholder={true}
              isOptionDisabled={(option) =>
                !!links.find((l) => l.url === option.value && l.pinned)
              }
            />
            {links.filter((l) => l.pinned).length >= 3 && (
              <p className="text-sm text-gray-500 mt-1">
                You can pin up to 3 links
              </p>
            )}
          </div>

          <input type="hidden" {...register("links")} />

          {links.filter((l) => l.pinned).length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {links
                .filter((l) => l.pinned)
                .map((link) => {
                  const uploadingLink = uploadingLinks.find(
                    (ul) => ul.url === link.url
                  );
                  return (
                    <div
                      key={link.url}
                      className="relative h-[132px] w-[234px] bg-[#0B0C24] rounded flex flex-col justify-between px-3 py-2"
                    >
                      {uploadingLink?.uploadStatus === "uploading" && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-day text-sm">
                            Uploading icon...
                          </span>
                        </div>
                      )}
                      {uploadingLink?.uploadStatus === "failed" && (
                        <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                          <span className="text-red-500 text-sm">
                            Upload failed
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 min-w-0">
                        {link.icon && (
                          <div className="relative w-6 h-6 flex-shrink-0">
                            <Image
                              src={link.icon}
                              alt={`Icon for ${link.url}`}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="text-gray-300 truncate text-sm flex-1">
                          {link.url}
                        </div>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => onTogglePin(link.url)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="text-gray-500 h-10 truncate text-sm">
                        {link.description}
                      </div>

                      <div className="flex justify-start">
                        <button
                          type="button"
                          className="text-day hover:text-day/80 text-sm"
                          onClick={() => handleEditLink(link)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No pinned links yet. Select links to pin them to your profile.
            </p>
          )}

          <div className="mt-6">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-day hover:text-day/80 transition-colors duration-200"
              onClick={handleShowAddLinkDialog}
            >
              <PlusIcon className="w-3 h-3" />
              <span className="text-sm">Add Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
