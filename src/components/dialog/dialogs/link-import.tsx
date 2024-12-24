import { Input, TextArea } from "@/components/form/control";
import { Dialogs } from "../store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Image from "next/image";

const schema = z.object({
  icon: z.string().optional(),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().max(100, "Description cannot exceed 100 characters").optional(),
});

type Inputs = z.infer<typeof schema>;

interface LinkImportDialogProps {
  data: NonNullable<Dialogs["link_import"]>;
  close: () => void;
}

export default function LinkImportDialog({
  data,
  close,
}: LinkImportDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      icon: data.initialData?.icon || '',
      url: data.initialData?.url || '',
      description: data.initialData?.description || '',
    }
  });

  const [selectedIcon, setSelectedIcon] = useState<string | null>(
    data.initialData?.icon || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleIconSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      window.alert("Icon size should be less than 3MB");
      e.target.value = "";
      return;
    }

    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedIcon(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (formData: Inputs) => {
    data.onLinkAdd({
      icon: selectedIcon || '',
      url: formData.url,
      description: formData.description || '',
    });
    close();
  };

  return (
    <div className="w-[80vw] max-w-md">
      <p className="font-secondary text-base text-gray-200 leading-[30px] mb-4">
        {data.editMode ? 'Edit Link' : 'Add Link'}
      </p>

      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            label="URL"
            placeholder="Enter your link URL (e.g., https://example.com)"
            error={errors["url"]}
            {...register("url")}
          />
        </div>

        <div className="mb-4">
          <TextArea
            label="Description (Optional)"
            placeholder="Enter a description for this link (max 100 characters)"
            error={errors["description"]}
            {...register("description")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[12px] mb-2 text-grey-500 font-bold">
            Icon
          </label>
          <div className="flex items-center gap-4">
            {selectedIcon ? (
              <div className="relative w-12 h-12 bg-night rounded overflow-hidden">
                <Image
                  src={selectedIcon}
                  alt="Selected icon"
                  fill
                  className="object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-day text-xs">Uploading...</span>
                  </div>
                )}
              </div>
            ) : null}
            <label
              htmlFor="icon-upload"
              className="cursor-pointer flex items-center gap-2 px-3 py-2 text-day hover:text-day/80 transition-colors duration-200"
            >
              <PlusIcon className="w-3 h-3" />
              {selectedIcon ? 'Change Icon' : 'Add Icon'}
              <input
                type="file"
                id="icon-upload"
                className="hidden"
                accept="image/*"
                onChange={handleIconSelect}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PNG or JPG, max 3MB
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={close}
          >
            Cancel
          </button>
          <button className="btn btn-primary" disabled={isUploading}>
            {data.editMode ? 'Save' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
} 