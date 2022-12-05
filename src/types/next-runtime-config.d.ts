export interface NextRuntimeConfig {
  serverRuntimeConfig: {
    nextAuthURL: string;
    nextAuthSecret: string;
  };
  publicRuntimeConfig: {
    basePath: string;
    environment: string;
    authRequired: boolean;
    mockMode: boolean;
    apiHost: string;
  };
}
