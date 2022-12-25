import { forwardRef, InputHTMLAttributes, ReactElement } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  placeholder?: string;
  className?: string;
  name?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref): ReactElement => {
  const { value, placeholder, name, className = "", ...rest } = props;

  return (
    <input
      ref={ref}
      className={`${className} h-10 border px-3 py-4 placeholder:text-neutral-600`}
      placeholder={placeholder}
      name={name}
      value={value}
      {...rest}
    />
  );
});

Input.displayName = "Input";
