import { DomainConfigApi } from "data/domain-config/api";
import { WebsiteConfig } from "data/domain-config/types";
import localforage from "localforage";
import { ChangeRequest } from "./types";

export const ChangeRequestApi = {
  create: async (id: number) => {
    return await localforage.setItem<ChangeRequest>(`change-request-${id}`, {
      id,
      title: `Change request - ${new Date(id).toLocaleDateString()}`,
      fileChanges: {},
    });
  },
  get: async (id: number) => {
    return await localforage.getItem<ChangeRequest>(`change-request-${id}`);
  },
  set: async (id: number, form: ChangeRequest) => {
    return await localforage.setItem(`change-request-${id}`, form);
  },
  delete: async (domain: string, id: number) => {
    const domainCong = (await DomainConfigApi.get(domain)) as WebsiteConfig;

    await localforage.removeItem(`change-request-${id}`);

    const updatedChangeRequestIds = (domainCong?.changeRequestIds ?? []).filter((no) => no !== id);

    await DomainConfigApi.set(domain, {
      ...domainCong,
      changeRequestIds: updatedChangeRequestIds,
    });
  },
};
