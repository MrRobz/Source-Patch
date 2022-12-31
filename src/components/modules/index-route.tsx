import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDomainFromUrl } from "../../utils";
import localforage from "localforage";
import { WebsiteConfig } from "data/domain-config/types";
import { getLastViewedDomainChangeId } from "utils/last-viewed-items";

export const IndexRoute = (): ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        const url = tabs[0].url;
        if (url) {
          const domain = getDomainFromUrl(url);

          localforage
            .getItem<WebsiteConfig>(`config-${domain}`)
            .then((data) => {
              if (data) {
                const [lastViewDomain, lastViewedChangeId] = getLastViewedDomainChangeId();

                if (lastViewDomain === domain && lastViewedChangeId) {
                  navigate(`/domain/${data.domain}/change-request/${lastViewedChangeId}`);
                } else {
                  navigate(`domain/${data.domain}`);
                }
              } else {
                navigate("/configure");
              }
            })
            .catch(() => navigate("/configure"));
        }
      })
      .catch(() => alert("no domain found"));
  }, []);

  return <></>;
};
