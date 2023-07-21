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


export const isBrowser = typeof window !== 'undefined';
