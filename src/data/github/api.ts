import { Octokit } from "@octokit/rest";
import { DomainConfigApi } from "data/domain-config/api";
import { WebsiteConfig } from "data/domain-config/types";
import { CodeSearchResultItem, GithubFileContents } from "./types";

const initializeOctokit = async (domainConfig: WebsiteConfig | null) => {
  const config = domainConfig?.githubPat ? { auth: domainConfig?.githubPat } : {};

  return new Octokit(config);
};

const extractOwnerRepoNameFromUrl = (url: string): [string, string] => {
  const urlSplit = url.split("/");
  const name = urlSplit.at(-1) ?? "";
  const owner = urlSplit.at(-2) ?? "";

  return [owner, name];
};

export const GithubApi = {
  search: async ({ domain, searchText }: { domain: string; searchText: string }) => {
    const domainConfig = await DomainConfigApi.get(domain);

    if (!domainConfig) {
      return;
    }

    const octokit = await initializeOctokit(domainConfig);
    const [owner, name] = extractOwnerRepoNameFromUrl(domainConfig.githubRepoUrl);
    const repoName = `${owner}/${name}`;

    let fileQuery = "";
    if (domainConfig.isSpecificFileForTranslations && domainConfig.translationsFilePath) {
      const path = domainConfig.translationsFilePath.replace(/^\//, "").split("/");
      const filename = path.pop() ?? "";

      fileQuery = `filename:${filename} path:${path.join("/")} `;
    }

    const results = await octokit.rest.search.code({
      headers: {
        Accept: "application/vnd.github.text-match+json",
      },
      q: `${searchText} repo:${repoName} in:file ${fileQuery}`.trim(),
    });

    return results.data.items as CodeSearchResultItem[];
  },

  getFileContents: async ({ domain, path }: { domain: string; path: string }) => {
    const domainConfig = await DomainConfigApi.get(domain);
    if (!domainConfig) {
      return;
    }

    const octokit = await initializeOctokit(domainConfig);

    const [owner, repo] = extractOwnerRepoNameFromUrl(domainConfig.githubRepoUrl);

    const result = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    return result.data as GithubFileContents;
  },
};
