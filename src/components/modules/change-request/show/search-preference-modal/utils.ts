interface SearchPreference {
  includeFileContent: boolean;
  includePath: boolean;
  extensions?: string;
  path?: string;
  file?: string;
}

const defaultSearchPreference = {
  includeFileContent: true,
  includePath: false,
};

export const getSearchPreferenceLS = (): SearchPreference => {
  const value = localStorage.getItem("search-preference");
  let formattedValue = defaultSearchPreference;

  try {
    if (value) {
      formattedValue = JSON.parse(value);
    }
  } catch {
    formattedValue = defaultSearchPreference;
  }

  return formattedValue;
};

export const setSearchPreferenceLS = (val: SearchPreference) => {
  localStorage.setItem("search-preference", JSON.stringify(val));
};
