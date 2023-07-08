"use client";
import { getStorageUpload } from "@/services/storage";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEventHandler, useId, useRef, useState } from "react";
import { Loading } from "../loading/loading";

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
export interface UploaderProps {
  max: number;
  urls: string[];
  title: string;
  subTitlte: string;
  height: number;
  width: number;
  onChange: (urls: string[]) => void;
}
export function Uploader({
  max,
  onChange,
  urls,
  title,
  subTitlte,
  height,
  width,
}: UploaderProps) {
  let id = useId();
  let [uploadingList, uploadingListSet] = useState<File[]>([]);
  let canUploadMore = max > urls.length + uploadingList.length;
  // prevent closure reading staled `urls`
  let onChangeRef = useRef<((url: string) => void) | undefined>(undefined);
  onChangeRef.current = (url: string) => {
    onChange([...urls, url]);
  };

  let onFileSelect: ChangeEventHandler<HTMLInputElement> = async (e) => {
    let filesPicked = Array.from(e.target.files ?? []);
    uploadingListSet((list) => list.concat(filesPicked));

    filesPicked.forEach(async (file) => {
      try {
        let url = await upload(file);
        onChangeRef.current?.(url);
      } catch (err) {
        console.error("uploading error", err);
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
    <div className="  flex flex-wrap gap-3" style={{}}>
      {/* existing */}
      {urls.map((url) => {
        return (
          <div
            key={url}
            className="bg-night relative  "
            style={{ height, width }}
          >
            <Image src={url} fill alt="img"></Image>
            <Cross1Icon
              onClick={(e) => {
                e.stopPropagation();
                onRemove(url);
              }}
              className=" cursor-pointer text-grey-500 absolute top-[8px] right-[8px]"
              height={16}
              width={16}
            />
          </div>
        );
      })}
      {/* uploading */}
      {uploadingList.map((file) => {
        return (
          <div key={file.name} className="relative " style={{ height, width }}>
            <Image src={URL.createObjectURL(file)} fill alt="img"></Image>
            <Loading cover={false} />
          </div>
        );
      })}
      {/* file picker  */}
      {canUploadMore ? (
        <label
          style={{ height, width }}
          htmlFor={`upload-input-${id}`}
          className=" bg-night h-full w-full cursor-pointer rounded    flex flex-col justify-center items-center"
        >
          <PlusIcon className="text-white" height={32} width={32} />
          <span
            className="text-[16px] text-grey-300 my-1 text-center"
            aria-hidden="true"
          >
            {title}
          </span>
          <span
            className="text-[14px] text-grey-500 text-center"
            aria-hidden="true"
          >
            {subTitlte}
          </span>
          <input
            type="file"
            id={`upload-input-${id}`}
            name="avatar"
            className="hidden"
            accept="image/*"
            multiple={max !== 1}
            onChange={onFileSelect}
          />
        </label>
      ) : null}
    </div>
  );
}
