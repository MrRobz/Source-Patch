import { KeyboardEventHandler, ReactElement, useRef, useState } from "react";
import { useClickOutsideDetect } from "utils/hooks";

interface Props {
  title?: string;
  onChange: (val: string) => void;
}

export const UpdatableTitle = ({ title, onChange }: Props): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useClickOutsideDetect(inputRef, () => {
    if (inputRef.current?.value) {
      onChange(inputRef.current?.value);
    }
    setIsEditMode(false);
  });

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.key === "Enter") {
      if (inputRef.current?.value) {
        onChange(inputRef.current?.value);
      }

      setIsEditMode(false);
    }
  };

  if (isEditMode) {
    return (
      <input
        defaultValue={title}
        onKeyDown={onKeyDown}
        className="w-full bg-transparent focus:ring-1"
        ref={inputRef}
        autoFocus
      />
    );
  }

  return (
    <div onClick={() => setIsEditMode(true)} className="truncate">
      {title}
    </div>
  );
};
