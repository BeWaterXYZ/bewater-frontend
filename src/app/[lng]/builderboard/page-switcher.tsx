import { useState } from "react";
import clsx from "clsx";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

const chevron = "p-3 text-[#F8FAFC] cursor-pointer";
const chevronDisabled = `${chevron} !text-[#475569]`;
const pageNum =
  "w-8 h-8 flex items-center justify-center text-[#64748B] rounded-full cursor-pointer text-base hover:bg-[#1E293B] transition-colors";
const currentPageNum = `${pageNum} !bg-[#00FFFF] !text-[#1E293B] hover:bg-[#00FFFF]`;

export default function PageSwitcher(props: {
  currentPage: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}) {
  const { currentPage, rowsPerPage, totalRows, onPageChange } = props;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const pageOptions = [1, 2, 3, 4, 5].map(
    (num) =>
      num + Math.min(Math.max(currentPage - 3, 0), Math.max(totalPages - 5, 0))
  );
  
  if (totalRows === 0) return null;
  
  return (
    <div className="mt-12 flex text-base items-center justify-center">
      <div className="flex gap-6 items-center">
        <div
          className={clsx({
            [chevronDisabled]: currentPage === 1,
            [chevron]: currentPage !== 1,
          })}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          <ChevronLeftIcon className="w-5 h-5" />
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
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
} 