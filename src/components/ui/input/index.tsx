import { ReactElement } from "react";

interface Props {
  value?: string;
  placeholder?: string;
  className?: string;
  name?: string;
}

export const Input = ({ value, placeholder, name, className = "" }: Props): ReactElement => {
  return (
    <input
      className={`h-10 border px-3 py-4 placeholder:text-neutral-600 ${className}`}
      placeholder={placeholder}
      name={name}
    />
  );
};
