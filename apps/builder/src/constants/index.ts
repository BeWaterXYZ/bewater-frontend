export { isBrowser } from './isBrowser';

export enum LOCATION {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    MIXED = "MIXED",
  }
  
  export enum CAMPAIGN_TYPE {
    HACKATHON = "HACKATHON",
    DEMODAY = "DEMODAY",
    WORKSHOP = "WORKSHOP",
    OTHERS = "OTHERS",
  }
  
  
  

export const isDEV = process.env.NODE_ENV === 'development';
