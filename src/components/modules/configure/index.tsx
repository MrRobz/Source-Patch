import { ReactElement } from "react";
import { Input, Segmented } from "../../ui";
import { H1, SubTitle } from "../../ui/typography";

export const ConfigurePage = (): ReactElement => {
  return (
    <div className="h-full w-full text-neutral-800">
      <div>
        <H1>Configuration</H1>
        <SubTitle>Link your github repo to the website to make text changes.</SubTitle>
      </div>

      <div className="mt-4 rounded bg-white p-6 shadow-sm">
        <div>
          <label className="text-lg font-semibold" htmlFor="github-url">
            Enter the url of the github repo where <span className="text-primary-700">{"drivetrain.ai"}</span>’s code
            base is present.
          </label>
          <div className="mt-4">
            <Input placeholder="Enter github repo url" className="w-full" name="github-url" />
          </div>

          <div className="mt-9">
            <label className="text-lg font-semibold">
              Is there a specific file where all the translations are stored?
            </label>

            <div className="mt-4">
              <Segmented
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                selected={{ label: "No", value: "no" }}
              />
            </div>
          </div>

          <div className="mt-9">
            <label className="text-lg font-semibold">Is the github repo private?</label>

            <div className="mt-4">
              <Segmented
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                selected={{ label: "No", value: "no" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
