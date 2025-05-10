export const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://businessyds.csb.gov.tr/api";

export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

export const CURRENT_ENVIRONMENT = process.env.NODE_ENV as Environment;
