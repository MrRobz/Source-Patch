import { ReactElement } from "react";
import { ReactComponent as WarningIcon } from "assets/warning.svg";

export const ErrorBox = ({ error }: { error: any }): ReactElement => {
  return (
    <div className="m-4 flex w-full flex-col items-center justify-center rounded bg-white p-4">
      <div>
        <WarningIcon />
      </div>
      <div className="mt-4 font-medium text-red-600">Something unexpected happened, please try again.</div>

      <div className="mt-2 w-full overflow-auto">
        <pre>{error && typeof error === "object" && JSON.stringify(error, null, 4)}</pre>
        <pre>{error && typeof error === "string" && error}</pre>
      </div>
    </div>
  );
};
