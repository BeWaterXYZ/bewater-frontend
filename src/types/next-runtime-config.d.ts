export interface NextRuntimeConfig {
  publicRuntimeConfig: {
    basePath: string;
    environment: string;
    mockMode: boolean;
    apiHost: string;
  };
}
