import { ReactElement } from "react";

interface Props {
  value?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: (val: string) => void;
}

export const Input = ({ value, placeholder, name, className = "", onChange }: Props): ReactElement => {
  return (
    <input
      className={`h-10 border px-3 py-4 placeholder:text-neutral-600 ${className}`}
      placeholder={placeholder}
      name={name}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
