import localforage from "localforage";
import { WebsiteConfig } from "./types";

export const DomainConfigApi = {
  get: async (domain: string) => {
    return await localforage.getItem<WebsiteConfig>(`config-${domain}`);
  },
  set: async (domain: string, form: WebsiteConfig) => {
    return await localforage.setItem(`config-${domain}`, form);
  },
};
