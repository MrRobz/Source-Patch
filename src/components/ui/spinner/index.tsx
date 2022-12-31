import { ReactElement } from "react";
import "./styles.css";

export const Spinner = ({ className }: { className?: string }): ReactElement => {
  return (
    <div className={className ?? ""}>
      <div className="ui-loading-dual-ring"></div>
    </div>
  );
};
