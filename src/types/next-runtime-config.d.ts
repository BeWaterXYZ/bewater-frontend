export interface NextRuntimeConfig {
  publicRuntimeConfig: {
    basePath: string;
    environment: string;
    mockMode: boolean;
    apiHost: string;
    PROVIDER_INFURA_KEY: string;
    PROVIDER_ALCHEMY_KEY: string;
  };
}
