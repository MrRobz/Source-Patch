import localforage from "localforage";

export const setupLocalForage = () => {
  localforage.config({
    driver: localforage.INDEXEDDB,
    name: "code-text-updater",
    version: 1.0,
  });
};
