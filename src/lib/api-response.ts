import { NextResponse } from "next/server";

interface ApiResponseOptions {
  status?: number;
  dev_message?: string;
  url?: string;
  pagination?: any;
}

export function createApiResponse<T>(
  data: T,
  options: ApiResponseOptions = {}
) {
  const {
    status = 200,
    dev_message,
    url,
    pagination
  } = options;

  const response = {
    status_code: status,
    timestamp: new Date().toISOString(),
    request_path: url,
    dev_message,
    status: status >= 200 && status < 300 ? 'SUCCESS' : 'ERROR',
    data: data,
    pagination
  };

  return NextResponse.json(response, { status });
}

export function createErrorResponse(
  error: string | { error: string },
  status: number = 400,
  options: Omit<ApiResponseOptions, 'status'> = {}
) {
  const errorData = typeof error === 'string' ? { error } : error;
  return createApiResponse(errorData, { ...options, status });
}

export function createSuccessResponse<T>(
  data: T,
  options: Omit<ApiResponseOptions, 'status'> = {}
) {
  return createApiResponse(data, { ...options, status: 200 });
} 