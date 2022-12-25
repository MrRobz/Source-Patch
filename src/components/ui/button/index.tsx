import { PropsWithChildren, ReactElement } from "react";

const sizeStyles = {
  s: "px-4 py-2 text-xs",
  m: "px-4 py-3 text-sm",
  l: "",
};

const typeStyles = {
  primary: "bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700",
  tertiary: "bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 active:bg-neutral-150",
  secondary: "",
};

const focusStyles = "ring-primary-700 ring-offset-2 focus:ring-2";
const disabledStyles = "disabled:bg-neutral-150 disabled:text-neutral-600";

interface Props {
  type?: "primary" | "secondary" | "tertiary";
  size?: "s" | "m" | "l";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  type = "tertiary",
  size = "m",
  disabled,
  children,
  onClick,
}: PropsWithChildren<Props>): ReactElement => {
  const styles = `${typeStyles[type]} ${sizeStyles[size]} ${disabledStyles} ${focusStyles}`;

  return (
    <button
      className={`flex items-center justify-center rounded font-bold ${styles}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
