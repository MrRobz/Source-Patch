import { ReactElement, ReactNode } from "react";

export const H1 = ({ children, className = "" }: { children: ReactNode; className?: string }): ReactElement => {
  return <h1 className={`text-3xl font-bold leading-10 text-neutral-800 ${className}`}>{children}</h1>;
};
