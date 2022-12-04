export const getDomainFromUrl = (url: string): string => {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  return a.hostname.replace(/^www./, "");
};
