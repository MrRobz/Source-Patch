import { PullRequestInfo } from "data/change-request/types";
import { GithubApi } from "data/github/api";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  prData: PullRequestInfo;
}

export const PullRequestStatus = ({ prData }: Props): ReactElement => {
  const { domain } = useParams() as { domain: string; id: string };
  const [status, setStatus] = useState<"merged" | "open" | "closed" | null>(null);

  let tagClass = "";
  if (status === "merged") {
    tagClass = "bg-purple-600";
  } else if (status === "open") {
    tagClass = "bg-green-600";
  } else if (status === "closed") {
    tagClass = "bg-red-600";
  }

  useEffect(() => {
    GithubApi.getPrDetails({ domain, pullNumber: prData.pullNumber })
      .then((data) => {
        if (data?.merged) {
          setStatus("merged");
        } else if (data?.state) {
          setStatus(data?.state);
        }
      })
      .catch(() => {});
  }, [prData.pullNumber]);

  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      <div className="font-bold">Pull request given:</div>
      <a
        href={prData.url}
        className="font-semibold text-primary-600 hover:text-primary-700"
        target={"_blank"}
        rel="noreferrer"
      >
        {prData.pullNumber}
      </a>
      -{" "}
      {status && (
        <span className={`rounded-full px-4 py-2 text-xs font-semibold capitalize text-white ${tagClass}`}>
          {status}
        </span>
      )}
    </div>
  );
};
