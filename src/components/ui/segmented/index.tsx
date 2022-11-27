import { ReactElement } from "react";

interface ItemType {
  label: string;
  value: string;
}

interface Props {
  options: ItemType[];
  selected: ItemType;
  onChange?: (option: ItemType) => void;
}

export const Segmented = ({ options, selected, onChange }: Props): ReactElement => {
  return (
    <div className="w-fit rounded border-neutral-200 bg-neutral-100 p-2">
      <div className="relative flex items-center justify-center gap-2">
        {options.map((option) => (
          <SegmentedItem
            key={option.value}
            value={option.label}
            isActive={selected.value === option.value}
            onChange={() => onChange?.(option)}
          />
        ))}
      </div>
    </div>
  );
};

const SegmentedItem = ({ value, isActive, onChange }: { value: string; isActive?: boolean; onChange: () => void }) => {
  const activeStyles = isActive ?? false ? "border-neutral-150 bg-white text-primary-600" : "";

  return (
    <div
      onClick={onChange}
      className={`text-md flex h-8 flex-1 cursor-pointer items-center justify-center rounded px-8 font-bold capitalize  ${activeStyles}`}
    >
      {value}
    </div>
  );
};
