import { WebsiteConfig } from "data/domain-config/types";

export const checkIfFormValid = (form: WebsiteConfig): boolean => {
  if (!form.domain || !form.githubRepoUrl) {
    return false;
  }

  if (!form.githubPat) {
    return false;
  }

  return true;
};
