import { WebsiteConfigForm } from "../types";

export const checkIfFormValid = (form: WebsiteConfigForm): boolean => {
  if (!form.domain || !form.githubRepoUrl) {
    return false;
  }

  if (form.isGithubRepoPrivate && !form.githubPat) {
    return false;
  }

  if (form.isSpecificFileForTranslations && !form.translationsFilePath) {
    return false;
  }

  return true;
};
