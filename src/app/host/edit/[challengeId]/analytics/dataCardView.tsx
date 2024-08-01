"use client";

import { format } from "date-fns";
import { useState } from "react";
import Placeholder from "react-select/dist/declarations/src/components/Placeholder";

export default function DataCardView(props: {
  source: {
    title: string;
    secondary: string;
    histogram: boolean;
    data: {
      name: string;
      num?: number;
      lastUpdated?: string;
    }[];
    dataType?: string;
  };
  placeholder?: string;
}) {
  const { source, placeholder } = props;
  const [windowView, setWindowView] = useState(false);
  const openWindowView = () => setWindowView(true);
  const closeWindowView = () => setWindowView(false);
  const resortData = source.data.sort((a, b) => {
    return (b.num as number) - (a.num as number);
  });
  const filterTop6 = resortData.slice(0, 6);
  const maxBarNum = Math.max(
    ...source.data.map((items) => items.num as number)
  );
  const percent = (value: number) => {
    return `${(value / maxBarNum) * 100}%`;
  };

  const dataCard =
    "bg-[#0B0C24] border-[1px] border-[#24254E] rounded-[4px] mb-[28px] flex flex-col";
  const dataCardWindow =
    "bg-[#141527] border-[1px] border-[#1E293B] rounded-[4px] flex flex-col w-[540px] h-[80vh] shadow-[0_16px_24px_0_#00000026] overflow-hidden";
  const dataCardHeader =
    "border-b-[1px] border-b-[#24254E] mb-[4px] py-[14px] px-5 flex justify-between";
  const dataCardWindowHeader = "px-6 py-6 flex justify-between";
  const dataCardTitle = "font-secondary text-lg font-bold text-white";
  const dataCardSecondary =
    "font-secondary text-[14px] leading-[28px] text-[#64748B]";
  const dataCardMain = "my-[7px] flex-1 min-h-[241px]";
  const dataCardItemContainer = "mt-[7px] mx-[14px] relative";
  const histogramBar = "bg-[#1E293BB3] rounded-[4px] h-8";
  const noHistogram = "h-8";
  const dataCardItemLabel =
    "h-8 px-[6px] flex items-center justify-between w-[100%] absolute top-0";
  const dataCardItemName = "font-secondary text-sm text-[#CBD5E1] truncate";
  const dataCardItemValue =
    "font-secondary text-[14px] leading-[28px] pl-2 text-[#CBD5E1]";
  const dataCardButton =
    "bg-[#2F3153] border-[1px] border-[#2F3153] rounded-[2px] w-fit py-2 px-4 flex gap-2 items-center font-secondary text-sm text-white";
  const doneButton =
    "bg-[#00FFFF] rounded-[2px] w-fit py-2 px-4 font-secondary text-sm text-[#003333]";
  const placeholderStyle =
    "font-secondary text-sm text-[#64748B] h-full flex justify-center items-center";
  const arrowExpand = (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 2.5C2.75 2.22386 2.97386 2 3.25 2H6.25C6.52614 2 6.75 2.22386 6.75 2.5C6.75 2.77614 6.52614 3 6.25 3H4.45711L7.10358 5.64643C7.29884 5.84169 7.29884 6.15828 7.10358 6.35354C6.90831 6.5488 6.59173 6.5488 6.39647 6.35354L3.75 3.7071V5.5C3.75 5.77614 3.52614 6 3.25 6C2.97386 6 2.75 5.77614 2.75 5.5V2.5ZM14.25 2C14.5261 2 14.75 2.22386 14.75 2.5V5.5C14.75 5.77614 14.5261 6 14.25 6C13.9739 6 13.75 5.77614 13.75 5.5V3.70711L11.1036 6.35358C10.9083 6.54884 10.5917 6.54884 10.3965 6.35358C10.2012 6.15831 10.2012 5.84173 10.3965 5.64647L13.0429 3L11.25 3C10.9739 3 10.75 2.77614 10.75 2.5C10.75 2.22386 10.9739 2 11.25 2H14.25ZM14.25 14C14.5261 14 14.75 13.7761 14.75 13.5V10.5C14.75 10.2239 14.5261 10 14.25 10C13.9739 10 13.75 10.2239 13.75 10.5V12.2929L11.1035 9.64646C10.9083 9.4512 10.5917 9.4512 10.3964 9.64646C10.2012 9.84172 10.2012 10.1583 10.3964 10.3536L13.0429 13H11.25C10.9739 13 10.75 13.2239 10.75 13.5C10.75 13.7761 10.9739 14 11.25 14H14.25ZM3.25 14C2.97386 14 2.75 13.7761 2.75 13.5V10.5C2.75 10.2239 2.97386 10 3.25 10C3.52614 10 3.75 10.2239 3.75 10.5L3.75 12.2929L6.39643 9.64642C6.5917 9.45116 6.90828 9.45116 7.10354 9.64642C7.2988 9.84169 7.2988 10.1583 7.10354 10.3535L4.4571 13H6.25C6.52614 13 6.75 13.2239 6.75 13.5C6.75 13.7761 6.52614 14 6.25 14H3.25Z"
        fill="white"
      />
    </svg>
  );
  const closeWindow = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.583333"
        y="0.583333"
        width="26.8333"
        height="26.8333"
        rx="13.4167"
        fill="#141527"
      />
      <rect
        x="0.583333"
        y="0.583333"
        width="26.8333"
        height="26.8333"
        rx="13.4167"
        stroke="#334155"
        strokeWidth="1.16667"
      />
      <path
        d="M17.0625 10.9375L10.9375 17.0625"
        stroke="#E2E8F0"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9375 10.9375L17.0625 17.0625"
        stroke="#E2E8F0"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const dataCardContent = (
    <div className={dataCard}>
      <div className={dataCardHeader}>
        <div className={dataCardTitle}>{source.title}</div>
        <div className={dataCardSecondary}>{source.secondary}</div>
      </div>
      <div className={dataCardMain}>
        {filterTop6.length === 0 ? (
          <div className={placeholderStyle}>{placeholder}</div>
        ) : (
          filterTop6.map((items) => (
            <div className={dataCardItemContainer} key={items.name}>
              <div
                className={
                  source.histogram === true ? histogramBar : noHistogram
                }
                style={{
                  width:
                    source.histogram === true
                      ? `${percent(items.num as number)}`
                      : "",
                }}
              ></div>
              <div className={dataCardItemLabel}>
                <div className={dataCardItemName}>{items.name}</div>
                <div className={dataCardItemValue}>
                  {source.dataType === "date"
                    ? format(new Date(items.lastUpdated!), "yyyy/MM/dd")
                    : items.num}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pt-3 pb-4 flex justify-center">
        <button className={dataCardButton} onClick={openWindowView}>
          <div>{arrowExpand}</div>
          <div>Explore</div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {windowView === true ? (
        <>
          {dataCardContent}
          <div className="bg-[#04051B80] fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center z-10">
            <div className={dataCardWindow}>
              <div className={dataCardWindowHeader}>
                <div className={dataCardTitle}>{source.title}</div>
                <button onClick={closeWindowView}>{closeWindow}</button>
              </div>
              <div className="px-[10px] flex-1 overflow-y-auto">
                <div
                  className={dataCardMain}
                  style={{ height: "calc(100% - 14px)" }}
                >
                  {source.data.length === 0 ? (
                    <div className={placeholderStyle}>{placeholder}</div>
                  ) : (
                    source.data.map((items) => (
                      <div className={dataCardItemContainer} key={items.name}>
                        <div
                          className={
                            source.histogram === true
                              ? histogramBar
                              : noHistogram
                          }
                          style={{
                            width:
                              source.histogram === true
                                ? `${percent(items.num as number)}`
                                : "",
                          }}
                        ></div>
                        <div className={dataCardItemLabel}>
                          <div className={dataCardItemName}>{items.name}</div>
                          <div className={dataCardItemValue}>
                            {source.dataType === "date"
                              ? format(
                                  new Date(items.lastUpdated!),
                                  "yyyy/MM/dd"
                                )
                              : items.num}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="pt-3 pr-6 pb-4 flex justify-end">
                <button className={doneButton} onClick={closeWindowView}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{dataCardContent}</>
      )}
    </>
  );
}
