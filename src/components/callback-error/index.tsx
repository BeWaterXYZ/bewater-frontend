"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useToastStore } from "../toast/store";
import { z } from "zod";
import { isDEV } from "@/constants";

let errorCodeScheme = z.enum([
  "GITHUB_ACCOUNT_USED",
  "FIGMA_ACCOUNT_USED",
  "NOT_QUALIFIED_NEW_ACCOUNT",
]);

type ErrorCode = z.infer<typeof errorCodeScheme>;

let msgs: Record<ErrorCode, string> = {
  GITHUB_ACCOUNT_USED:
    "GitHub account has been used for other account connection",
  FIGMA_ACCOUNT_USED:
    "Figma account has been used for other account connection",
  NOT_QUALIFIED_NEW_ACCOUNT: "Your account is not qualified",
};

export function CallbackErrorHandler() {
  const addToast = useToastStore((s) => s.add);
  const searchParams = useSearchParams();
  let error: ErrorCode | null = null;
  try {
    error = errorCodeScheme.parse(searchParams!.get("error"));
  } catch (err) {}
  let isMountedRef = useRef(false);

  useEffect(() => {
    // hack1
    if (!isMountedRef.current && isDEV) {
      isMountedRef.current = true;
      return undefined;
    }

    if (error) {
      // hack2
      setTimeout(() => {
        window.history.replaceState(
          undefined,
          "",
          window.location.origin + window.location.pathname
        );
      }, 1000);

      addToast({
        title: "Oops",
        type: "error",
        description: msgs[error],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return null;
}
