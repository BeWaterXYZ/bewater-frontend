"use client";
import { getStorageUpload } from "@/services/storage";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";

interface UploaderProps {
  max: number;
  urls: string[];
  title: string;
  subTitlte: string;
  onChange: (urls: string[]) => void;
}

async function upload(file: File) {
  let data = await getStorageUpload();
  let res = await fetch(data.presignedURL, {
    method: "PUT",
    body: file,
  });
  if (res.status !== 200) {
    throw new Error("upload file not OK 200");
  }
  return data.mediaURL;
}

export function Uploader({
  max,
  onChange,
  urls,
  title,
  subTitlte,
}: UploaderProps) {
  let [uploadingList, uploadingListSet] = useState<File[]>([]);
  let canUploadMore = max > urls.length + uploadingList.length;

  let onFileSelect: ChangeEventHandler<HTMLInputElement> = async (e) => {
    let filesPicked = Array.from(e.target.files ?? []);
    uploadingListSet((list) => list.concat(filesPicked));

    filesPicked.forEach(async (file) => {
      try {
        let url = await upload(file);
        onChange([...urls, url]);
      } catch (err) {
      } finally {
        uploadingListSet((uploading) =>
          uploading.filter((f) => f.name !== file.name)
        );
      }
    });
  };
  let onRemove = (url: string) => {
    onChange(urls.filter((u) => u !== url));
  };

  return (
    <div className="bg-night h-40 flex flex-wrap gap-3">
      {/* existing */}
      {urls.map((url) => {
        return (
          <div key={url} className="relative h-40 w-60">
            <Image src={url} fill alt="img"></Image>
            <Cross1Icon
              onClick={(e) => {
                e.stopPropagation();
                onRemove(url);
              }}
              className=" cursor-pointer text-white/75 absolute top-[8px] right-[8px]"
              height={16}
              width={16}
            />
          </div>
        );
      })}
      {/* uploading */}
      {uploadingList.map((file) => {
        return (
          <div key={file.name} className="relative h-40 w-60">
            <Image src={URL.createObjectURL(file)} fill alt="img"></Image>
          </div>
        );
      })}
      {/* file picker  */}
      {canUploadMore ? (
        <label
          htmlFor="upload"
          className="h-full cursor-pointer rounded border border-dashed border-[#475569] flex flex-col justify-center items-center"
        >
          <PlusIcon className="text-white" height={32} width={32} />
          <span className="text-[16px] text-grey-300 my-1" aria-hidden="true">
            {title}
          </span>
          <span className="text-[14px] text-grey-500" aria-hidden="true">
            {subTitlte}
          </span>
          <input
            type="file"
            id="upload"
            name="avatar"
            className="hidden"
            accept="image/*"
            //   multiple
            onChange={onFileSelect}
          />
        </label>
      ) : null}
    </div>
  );
}
