export interface WebsiteConfigForm {
  domain: string;
  githubRepoUrl: string;
  isGithubRepoPrivate: boolean;
  githubPat?: string;
  isSpecificFileForTranslations: boolean;
  translationsFilePath?: string;
}
