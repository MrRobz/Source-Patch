import { PullRequestInfo } from "data/change-request/types";
import { WebsiteConfig } from "data/domain-config/types";
import { ReactElement } from "react";
import { extractOwnerRepoNameFromUrl } from "utils";

interface Props {
  prInfo?: PullRequestInfo;
  domainConfig?: WebsiteConfig;
}

export const PrInfoBox = ({ prInfo, domainConfig }: Props): ReactElement => {
  const [, repoName] = extractOwnerRepoNameFromUrl(domainConfig?.githubRepoUrl ?? "");

  return (
    <div className="m-4 flex w-full flex-col  justify-center rounded bg-white py-8 px-6 shadow-sm">
      <div className="flex items-center justify-center text-4xl">🎉</div>

      <div className="mt-4 flex items-center justify-center text-center text-lg font-semibold text-neutral-900">
        We have made a pull request to {repoName} with your changes.
      </div>
      <div>
        <a
          href="https://github.com/DrivetrainAi/drive-frontend/pull/3975"
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex w-full justify-center text-primary-600 hover:text-primary-700"
        >
          {prInfo?.url}
        </a>
      </div>
    </div>
  );
};
