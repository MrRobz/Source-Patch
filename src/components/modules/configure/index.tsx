import { ReactElement, useEffect, useState } from "react";
import { getDomainFromUrl } from "../../../utils";
import { Button, Input } from "../../ui";
import { H1, SubTitle } from "../../ui/typography";
import { checkIfFormValid } from "./utils/check-if-form-valid";
import { useNavigate } from "react-router-dom";
import { WebsiteConfig } from "data/domain-config/types";
import { DomainConfigApi } from "data/domain-config/api";
import { useClearLastViewedStore } from "utils/hooks";

export const ConfigurePage = (): ReactElement => {
  const navigate = useNavigate();
  const [form, setForm] = useState<WebsiteConfig>({
    githubPat: localStorage.getItem("git-pat-prev") ?? "",
  } as WebsiteConfig);

  const onSubmit = async () => {
    if (!checkIfFormValid(form)) {
      alert("Please fill in all form fields.");
    }

    const domain = form.domain;
    form.changeRequestIds = form.changeRequestIds || [];

    localStorage.setItem("git-pat-prev", form.githubPat);
    await DomainConfigApi.set(domain, form);

    navigate(`/domain/${domain}`);
  };

  useClearLastViewedStore();

  useEffect(() => {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        const url = tabs[0].url;
        if (url) {
          const domain = getDomainFromUrl(url);
          setForm((prev) => ({ ...prev, domain }));

          DomainConfigApi.get(domain)
            .then((data) => {
              if (data) {
                setForm(data);
              }
            })
            .catch(() => setForm({} as WebsiteConfig));
        }
      })
      .catch(() => alert("no domain found"));
  }, []);

  return (
    <>
      <div className="h-full w-full text-neutral-800">
        <div>
          <H1>Configuration</H1>
          <SubTitle>Link your github repo to this website to make code changes.</SubTitle>
        </div>

        <div className="mt-4 rounded bg-white p-6 shadow-sm">
          <div>
            <label className="text-lg font-semibold" htmlFor="github-url">
              Enter the url of the github repo where <span className="text-primary-700">{form.domain}</span>’s source
              code is present.
            </label>
            <div className="mt-4">
              <Input
                placeholder="Enter github repo url"
                className="w-full"
                name="github-url"
                value={form.githubRepoUrl}
                onChange={({ target: { value } }) => setForm((prev) => ({ ...prev, githubRepoUrl: value }))}
              />
            </div>

            <div className="mt-9">
              <label className="text-lg font-semibold">Enter your Github personal access token</label>
              <div className="text-sm">
                Click{" "}
                <a
                  className="cursor-pointer text-blue-700 hover:text-blue-900"
                  href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{" "}
                to learn how to generate one.
              </div>

              <div className="mt-4">
                <Input
                  placeholder="Enter github PAT"
                  name="github-pat"
                  className="w-full"
                  value={form.githubPat}
                  onChange={({ target: { value } }) => setForm((prev) => ({ ...prev, githubPat: value }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="primary" onClick={onSubmit}>
          save
        </Button>
      </div>
    </>
  );
};
