export const extractOwnerRepoNameFromUrl = (url: string): [string, string] => {
  const urlSplit = url.split("/");
  const comIndex = urlSplit.findIndex((item) => item.endsWith(".com"));

  const owner = urlSplit[comIndex + 1] ?? "";
  const name = urlSplit[comIndex + 2] ?? "";

  return [owner, name];
};
