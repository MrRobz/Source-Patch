import { ReactElement } from "react";
import { H1, SubTitle } from "../../ui/typography";

export const ConfigurePage = (): ReactElement => {
  return (
    <div className="h-96 w-full text-neutral-800">
      <div>
        <H1>Configuration</H1>
        <SubTitle>Link your github repo to the website to make text changes.</SubTitle>
      </div>

      <div className="mt-8 rounded bg-white p-6"></div>
    </div>
  );
};
