"use client";

import { useState } from "react";
import { icons } from "./icons";
import clsx from "clsx";

const chevron = "p-2 text-[#F8FAFC] cursor-pointer";
const chevronDisabled = `${chevron} !text-[#475569]`;
const pageNum =
  "w-5 h-5 py-[2px] text-[#64748B] text-center rounded-full cursor-pointer";
const currentPageNum = `${pageNum} bg-[#00FFFF] text-[#1E293B]`;

const rowsPerPageOptions = [
  { value: 10, label: "10 rows" },
  { value: 25, label: "25 rows" },
  { value: 50, label: "50 rows" },
  { value: 100, label: "100 rows" },
];

export default function PageSwitcher(props: {
  currentPage: number;
  rowsPerPage: 10 | 25 | 50 | 100;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: 10 | 25 | 50 | 100) => void;
}) {
  const {
    currentPage,
    rowsPerPage,
    totalRows,
    onPageChange,
    onRowsPerPageChange,
  } = props;
  const [showRowsMenu, setShowRowsMenu] = useState(false);
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  console.log(totalPages, currentPage, rowsPerPage, totalRows);
  const pageOptions = [1, 2, 3, 4, 5].map(
    (num) =>
      num + Math.min(Math.max(currentPage - 3, 0), Math.max(totalPages - 5, 0))
  );
  if (totalRows === 0) return null;
  return (
    <>
      <div className="mt-8 flex text-xs items-center justify-end">
        <div className="flex gap-4 items-center mr-8">
          <div
            className={clsx({
              [chevronDisabled]: currentPage === 1,
              [chevron]: currentPage !== 1,
            })}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            {icons.chevronLeft}
          </div>
          <div className="flex gap-4">
            {pageOptions.map((num) => (
              <div
                key={num}
                className={clsx(
                  num === currentPage ? currentPageNum : pageNum,
                  {
                    hidden: num > totalPages,
                  }
                )}
                onClick={() => onPageChange(num)}
              >
                {num}
              </div>
            ))}
          </div>
          <div
            className={clsx({
              [chevronDisabled]: currentPage === totalPages,
              [chevron]: currentPage !== totalPages,
            })}
            onClick={() =>
              currentPage !== totalPages && onPageChange(currentPage + 1)
            }
          >
            {icons.chevronRight}
          </div>
        </div>
        <div
          className="flex items-center select-none cursor-pointer"
          onClick={() => setShowRowsMenu(!showRowsMenu)}
        >
          <p className="text-gray-50 mr-2">Show:</p>
          <div className="flex items-center justify-between w-[12ch] rounded-sm border border-gray-200 py-1 px-2 bg-white text-xs text-gray-700">
            <p className="mr-1">{rowsPerPage} rows</p>
            <div>{icons.chevronDown}</div>
          </div>
        </div>
      </div>
      {showRowsMenu && (
        <div className="float-right w-[12ch] rounded-sm border border-gray-200 bg-white text-xs text-gray-700">
          {rowsPerPageOptions.map((option) => (
            <p
              key={option.value}
              className="py-1 px-2 select-none cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => {
                onRowsPerPageChange(option.value as 10 | 25 | 50 | 100);
                onPageChange(1);
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
