"use client";
import { segmentSchema } from "@/app/segment-params";
import { TestEdit } from "./edit/test";
import { Uploader } from "@/components/uploader";
import { useState } from "react";

export default function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  let [urls, urlsSet] = useState<string[]>([
    "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ]);
  return (
    <div className="container my-4 pt-20 flex flex-1 ">
      challenge
      <div className="bg-[#141527] p-12">
        <Uploader
          title="Upload the banner image"
          subTitlte="PNG or JPG, 1440*560px"
          max={23}
          urls={urls}
          onChange={(urls) => {
            urlsSet(urls);
          }}
        />
      </div>
      <TestEdit />
    </div>
  );
}
