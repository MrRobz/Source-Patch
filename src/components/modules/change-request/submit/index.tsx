import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { H1 } from "components/ui/typography";
import { ChangeRequestApi } from "data/change-request/api";
import { PullRequestInfo } from "data/change-request/types";
import { DomainConfigApi } from "data/domain-config/api";
import { WebsiteConfig } from "data/domain-config/types";
import { GithubApi } from "data/github/api";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBox } from "./error-box";
import { LoadingBox } from "./loading-box";
import { PrInfoBox } from "./pr-info-box";

export const SubmitChangeRequest = (): ReactElement => {
  const navigate = useNavigate();
  const { domain, id } = useParams() as { domain: string; id: string };

  const [domainConfig, setDomainConfig] = useState<WebsiteConfig>();
  const [loadingStatus, setLoadingStatus] = useState<"loading" | "error" | "loaded">("loading");
  const [error, setError] = useState<any>();
  const [prInfo, setPrInfo] = useState<PullRequestInfo>();

  const onBack = () => {
    navigate(`/domain/${domain}`);
  };

  useEffect(() => {
    DomainConfigApi.get(domain)
      .then((data) => data && setDomainConfig(data))
      .catch(() => {});
  }, [domain]);

  useEffect(() => {
    setLoadingStatus("loading");

    ChangeRequestApi.get(Number(id))
      .then(async (changeRequest) => {
        if (changeRequest) {
          try {
            const response = await GithubApi.submitPR({ domain, changeRequest });
            if (response) {
              const prInfo = {
                id: response.number,
                url: response.html_url,
                branchName: response.head.ref,
              };
              setPrInfo(prInfo);
              setLoadingStatus("loaded");

              await ChangeRequestApi.set(Number(id), {
                ...changeRequest,
                pullRequest: prInfo,
              });
            }
          } catch (error: any) {
            setError(error?.message || error?.response?.data);
            setLoadingStatus("error");
          }
        }
      })
      .catch(() => {
        setLoadingStatus("error");
      });
  }, [id]);

  return (
    <div className="w-ful h-full">
      <H1 className="flex items-center">
        <BackIcon className="mb-3 mr-2 cursor-pointer hover:text-primary-700" onClick={onBack} />
      </H1>

      <div className="mt-8 flex items-center justify-center">
        {loadingStatus === "loading" && <LoadingBox />}
        {loadingStatus === "error" && <ErrorBox error={error} />}
        {loadingStatus === "loaded" && <PrInfoBox domainConfig={domainConfig} prInfo={prInfo} />}
      </div>
    </div>
  );
};
