export interface NextRuntimeConfig {
  serverRuntimeConfig: {
    moralisAppDomain: string;
    moralisAPIKey: string;
    nextAuthURL: string;
    nextAuthSecret: string;
  };
  publicRuntimeConfig: {
    basePath: string;
    environment: string;
    authRequired: boolean;
    apiHost: string;
    mockMode: boolean;
  };
}
