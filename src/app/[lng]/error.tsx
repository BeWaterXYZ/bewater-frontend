"use client";

import React, { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.log("from error page");
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <p className="heading-5">Something went wrong!</p>
      {/* <button className="btn btn-primary" onClick={() => reset()}>
        Reset error boundary
      </button> */}
    </div>
  );
}
