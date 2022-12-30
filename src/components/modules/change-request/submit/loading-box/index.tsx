import { ReactElement } from "react";
import "./styles.css";

export const LoadingBox = (): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="loading-dual-ring"></div>
      <div className="mt-6 text-lg font-semibold text-neutral-600">
        Creating a pull request on Github with your changes
      </div>
    </div>
  );
};
