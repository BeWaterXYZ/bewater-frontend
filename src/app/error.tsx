'use client';

import React, { useEffect } from 'react';
// import * as Sentry from '@sentry/nextjs';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    // Sentry.captureException(error);
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
