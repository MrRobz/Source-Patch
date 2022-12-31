import { Octokit } from "@octokit/rest";
import { DomainConfigApi } from "data/domain-config/api";
import { WebsiteConfig } from "data/domain-config/types";
import { CodeSearchResultItem, GithubFileContents } from "./types";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { ChangeRequest } from "data/change-request/types";
import { extractOwnerRepoNameFromUrl } from "utils";
import { getSearchPreferenceLS } from "components/modules/change-request/show/search-preference-modal/utils";
import { constructGithubSearchFilterQuery } from "./utils/construct-github-search-filter-query";

const MyOctokit = Octokit.plugin(createPullRequest);

const initializeOctokit = async (domainConfig: WebsiteConfig | null) => {
  const config = domainConfig?.githubPat ? { auth: domainConfig?.githubPat } : {};

  return new MyOctokit(config);
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

    const fileQuery = constructGithubSearchFilterQuery();

    const results = await octokit.rest.search.code({
      headers: {
        Accept: "application/vnd.github.text-match+json",
      },
      q: `${searchText} repo:${repoName} ${fileQuery}`.trim(),
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

  submitPR: async ({ domain, changeRequest }: { domain: string; changeRequest: ChangeRequest }) => {
    const domainConfig = await DomainConfigApi.get(domain);

    if (!domainConfig) {
      return;
    }

    const octokit = await initializeOctokit(domainConfig);
    const [owner, name] = extractOwnerRepoNameFromUrl(domainConfig.githubRepoUrl);

    const commitChange: { [path: string]: { content: string; encoding: "utf-8" | "base64" } } = {};
    for (const key in changeRequest.fileChanges) {
      const fileChange = changeRequest.fileChanges[key];
      commitChange[fileChange.filePath] = {
        content: fileChange.toText,
        encoding: "utf-8",
      };
    }

    const response = await octokit.createPullRequest({
      owner,
      repo: name,
      title: changeRequest.title,
      body: changeRequest.desc ?? "pull request description",
      head: changeRequest.pullRequest?.branchName ?? `source-patch/${new Date().valueOf()}`,
      update: true,
      changes: { files: commitChange, commit: changeRequest.title || "updating code" },
    });

    return response?.data;
  },
};
