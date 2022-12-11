import { ReactElement, useEffect, useState } from "react";
import { getDomainFromUrl } from "../../../utils";
import { Button, Input, Segmented } from "../../ui";
import { H1, SubTitle } from "../../ui/typography";
import { WebsiteConfigForm } from "./types";
import localforage from "localforage";
import { checkIfFormValid } from "./utils/check-if-form-valid";
import { useNavigate } from "react-router-dom";

const yesNoOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const ConfigurePage = (): ReactElement => {
  const navigate = useNavigate();
  const [form, setForm] = useState<WebsiteConfigForm>({} as WebsiteConfigForm);

  useEffect(() => {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        const url = tabs[0].url;
        if (url) {
          const domain = getDomainFromUrl(url);
          setForm((prev) => ({ ...prev, domain }));

          localforage
            .getItem<WebsiteConfigForm>(`config-${domain}`)
            .then((data) => {
              if (data) {
                setForm(data);
              }
            })
            .catch(() => setForm({} as WebsiteConfigForm));
        }
      })
      .catch(() => alert("no domain found"));
  }, []);

  const onSumbit = async () => {
    if (!checkIfFormValid(form)) {
      alert("Please fill in all form fields.");
    }

    const domain = form.domain;
    await localforage.setItem(`config-${domain}`, form);

    navigate(`/domain/${domain}`);
  };

  return (
    <>
      <div className="h-full w-full text-neutral-800">
        <div>
          <H1>Configuration</H1>
          <SubTitle>Link your github repo to the website to make text changes.</SubTitle>
        </div>

        <div className="mt-4 rounded bg-white p-6 shadow-sm">
          <div>
            <label className="text-lg font-semibold" htmlFor="github-url">
              Enter the url of the github repo where <span className="text-primary-700">{form.domain}</span>’s code base
              is present.
            </label>
            <div className="mt-4">
              <Input
                placeholder="Enter github repo url"
                className="w-full"
                name="github-url"
                value={form.githubRepoUrl}
                onChange={(val) => setForm((prev) => ({ ...prev, githubRepoUrl: val }))}
              />
            </div>

            <div className="mt-9">
              <label className="text-lg font-semibold">Is the github repo private?</label>

              <div className="mt-4">
                <Segmented
                  options={yesNoOptions}
                  selected={yesNoOptions.find((o) => o.value === form.isGithubRepoPrivate) ?? yesNoOptions[1]}
                  onChange={(option) => {
                    setForm((prev) => ({ ...prev, isGithubRepoPrivate: option.value }));
                  }}
                />

                {form.isGithubRepoPrivate && (
                  <Input
                    placeholder="Enter github PAT"
                    className="mt-3"
                    name="github-pat"
                    onChange={(val) => setForm((prev) => ({ ...prev, githubPat: val }))}
                  />
                )}
              </div>
            </div>

            <div className="mt-9">
              <label className="text-lg font-semibold">
                Is there a specific file where all the translations are stored?
              </label>

              <div className="mt-4">
                <Segmented
                  options={yesNoOptions}
                  selected={yesNoOptions.find((o) => o.value === form.isSpecificFileForTranslations) ?? yesNoOptions[1]}
                  onChange={(option) => {
                    setForm((prev) => ({ ...prev, isSpecificFileForTranslations: option.value }));
                  }}
                />

                {form.isSpecificFileForTranslations && (
                  <Input
                    placeholder="Enter path to the file"
                    className="mt-3"
                    name="translations-file-path"
                    onChange={(val) => setForm((prev) => ({ ...prev, translationsFilePath: val }))}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="primary" onClick={onSumbit}>
          save
        </Button>
      </div>
    </>
  );
};
