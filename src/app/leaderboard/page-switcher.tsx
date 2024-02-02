"use client";

import { useState } from "react";
import { icons } from "./icons";

const chevron = "p-2 text-[#F8FAFC] cursor-pointer";
const chevronDisabled = `${chevron} text-[#475569]`;
const pageNum = "w-5 h-5 py-[2px] text-[#64748B] text-center rounded-full cursor-pointer";
const currentPageNum = `${pageNum} bg-[#00FFFF] text-[#1E293B]`;

const rowsPerPageOptions = [
  { value: 10, label: "10 rows" },
  { value: 25, label: "25 rows" },
  { value: 50, label: "50 rows" },
  { value: 100, label: "100 rows" },
];

export default function PageSwitcher() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showRowsMenu, setShowRowsMenu] = useState(false);

  return (
    <>
      <div className="mt-8 flex text-xs items-center justify-end">
        <div className="flex gap-4 items-center mr-8">
          <div className={chevronDisabled}>{icons.chevronLeft}</div>
          <div className="flex gap-4">
            <p className={currentPageNum}>1</p>
            <p className={pageNum}>2</p>
            <p className={pageNum}>3</p>
            <p className={pageNum}>4</p>
            <p className={pageNum}>5</p>
          </div>
          <div className={chevron}>{icons.chevronRight}</div>
        </div>
        <div className="flex items-center select-none cursor-pointer" onClick={() => setShowRowsMenu(!showRowsMenu)}>
          <p className="text-gray-50 mr-2">Show:</p>
          <div
            className="flex items-center justify-between w-[12ch] rounded-sm border border-gray-200 py-1 px-2 bg-white text-xs text-gray-700"
          >
            <p className="mr-1">{rowsPerPage}</p>
            <div>{icons.chevronDown}</div>
          </div>
        </div>
      </div>
      {showRowsMenu && (
        <div className="float-right w-[12ch] rounded-sm border border-gray-200 bg-white text-xs text-gray-700">
          {rowsPerPageOptions.map(option => (
            <p
              key={option.value}
              className="py-1 px-2 select-none cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => {
                setRowsPerPage(option.value);
                setShowRowsMenu(false);
              }}
              >
                {option.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
}