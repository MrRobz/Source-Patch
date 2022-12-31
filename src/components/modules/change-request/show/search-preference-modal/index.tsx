import { ReactElement, useState } from "react";
import { Button, Input, Modal } from "components/ui";
import { getSearchPreferenceLS, setSearchPreferenceLS } from "./utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPreferenceModal = ({ isOpen, onClose }: Props): ReactElement => {
  const [searchPreference, setSearchPreference] = useState(getSearchPreferenceLS());

  const onSave = () => {
    setSearchPreferenceLS(searchPreference);

    onClose();
  };

  const updateSearchPreferenceState = (key: string, value: any) => {
    setSearchPreference((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <Modal title="Search Preference" onClose={onClose} isOpen={isOpen}>
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-x-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-neutral-800">Search in file contents</label>
            <div className="mt-1">
              <input
                type="checkbox"
                checked={searchPreference.includeFileContent}
                onChange={(e) => {
                  updateSearchPreferenceState("includeFileContent", e.target.checked);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-neutral-800">Search in file paths</label>
            <div className="mt-1">
              <input
                type="checkbox"
                checked={searchPreference.includePath}
                onChange={(e) => {
                  updateSearchPreferenceState("includePath", e.target.checked);
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">Match files with extension</label>
            <Input
              placeholder="json, js, jsx"
              value={searchPreference.extensions}
              onChange={(e) => {
                updateSearchPreferenceState("extensions", e.target.value);
              }}
            />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">Search in path</label>
            <Input
              placeholder="/src/translations"
              value={searchPreference.path}
              onChange={(e) => {
                updateSearchPreferenceState("path", e.target.value);
              }}
            />
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <label className="text-sm font-bold text-neutral-800">Search in specific file</label>
            <div className="text-xs">Don't include extension</div>
            <Input
              placeholder="file name"
              value={searchPreference.file}
              onChange={(e) => {
                updateSearchPreferenceState("file", e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end" onClick={onSave}>
        <Button type="primary">Save</Button>
      </div>
    </Modal>
  );
};
