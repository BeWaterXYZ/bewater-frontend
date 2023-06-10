"use client";
import { LoadingContainer } from "@/components/loading";
import { useLoadingStore } from "@/components/loading/store";
import { ToastContainer } from "@/components/toast";
import { useToastStore } from "@/components/toast/store";

export function Dumpster() {
  const toasts = useToastStore((s) => s.toasts);
  const loading = useLoadingStore((s) => s.loading);

  return (
    <>
      <ToastContainer toasts={toasts} />
      <LoadingContainer loading={loading} />
    </>
  );
}
