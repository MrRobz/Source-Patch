import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const IndexRoute = (): ReactElement => {
  return (
    <>
      <Navigate to="/configure" replace={true} />
    </>
  );
};
