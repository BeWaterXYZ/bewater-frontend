export { isBrowser } from "./isBrowser";

export enum LOCATION {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  MIXED = "MIXED",
}

export const CampaignType = ["CHALLENGE", "WORKSHOP", "OTHERS"] as const;

export type CAMPAIGN_TYPE = (typeof CampaignType)[number];

export const isDEV = process.env.NODE_ENV === "development";
