export const setLastViewedDomainChangeId = (domain: string, changeId: string) => {
  localStorage.setItem("last-viewed-domain", domain);
  localStorage.setItem("last-viewed-changeId", changeId);
};

export const clearLastViewedDomainChangeId = () => {
  localStorage.removeItem("last-viewed-domain");
  localStorage.removeItem("last-viewed-changeId");
};

export const getLastViewedDomainChangeId = () => {
  const domain = localStorage.getItem("last-viewed-domain");
  const changeId = localStorage.getItem("last-viewed-changeId");

  return [domain, changeId];
};
