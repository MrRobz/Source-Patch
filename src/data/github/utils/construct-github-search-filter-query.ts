import { getSearchPreferenceLS } from "components/modules/change-request/show/search-preference-modal/utils";

export const constructGithubSearchFilterQuery = (): string => {
  const fileQuery: string[] = [];

  const searchPreference = getSearchPreferenceLS();
  if (searchPreference.includeFileContent && searchPreference.includePath) {
    fileQuery.push("in:file,path");
  } else if (searchPreference.includeFileContent) {
    fileQuery.push("in:file");
  } else if (searchPreference.includePath) {
    fileQuery.push("in:path");
  }

  if (searchPreference.extensions) {
    const list = searchPreference.extensions.split(",");
    list.forEach((item) => {
      fileQuery.push(`extension:${item.trim()}`);
    });
  }

  if (searchPreference.path) {
    fileQuery.push(`path:${searchPreference.path.trim()}`);
  }

  if (searchPreference.file) {
    fileQuery.push(`filename:${searchPreference.file.trim()}`);
  }

  return fileQuery.join(" ");
};
