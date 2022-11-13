import { ReactElement, ReactNode } from "react";

export const SubTitle = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="text-base leading-6 text-neutral-600">{children}</div>;
};
