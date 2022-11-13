import { ReactElement, ReactNode } from "react";

export const H1 = ({ children }: { children: ReactNode }): ReactElement => {
  return <h1 className="text-3xl font-bold leading-10 text-neutral-800">{children}</h1>;
};
