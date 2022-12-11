export interface WebsiteConfig {
  domain: string;
  githubRepoUrl: string;
  isGithubRepoPrivate: boolean;
  githubPat?: string;
  isSpecificFileForTranslations: boolean;
  translationsFilePath?: string;
  changeRequestIds: number[];
}
