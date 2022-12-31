import { KeyboardEventHandler, ReactElement, useRef, useState } from "react";
import { useClickOutsideDetect } from "utils/hooks";

interface Props {
  desc?: string;
  onChange: (val: string) => void;
}

export const UpdatableDesc = ({ desc, onChange }: Props): ReactElement => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useClickOutsideDetect(inputRef, () => {
    if (inputRef.current?.value) {
      onChange(inputRef.current?.value);
    }
    setIsEditMode(false);
  });

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (inputRef.current?.value) {
        onChange(inputRef.current?.value);
      }

      setIsEditMode(false);
    }
  };

  if (isEditMode) {
    return (
      <textarea
        defaultValue={desc}
        onKeyDown={onKeyDown}
        className="w-full bg-transparent p-2 focus:ring-1"
        ref={inputRef}
        autoFocus
        placeholder="type a description"
        rows={1}
      />
    );
  }

  return <div onClick={() => setIsEditMode(true)}>{desc ?? "No description added. Click to add one."}</div>;
};
