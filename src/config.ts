export const CONFIGS = {
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT ?? '',
  PROVIDER_INFURA_KEY: process.env.NEXT_PUBLIC_PROVIDER_INFURA_KEY ?? '',
  PROVIDER_ALCHEMY_KEY: process.env.NEXT_PUBLIC_PROVIDER_ALCHEMY_KEY ?? '',
};

console.log('configs:', JSON.stringify(CONFIGS, null, 2));
