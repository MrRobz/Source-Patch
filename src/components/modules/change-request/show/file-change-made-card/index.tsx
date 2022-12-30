import { Button } from "components/ui";
import { FileChange } from "data/change-request/types";
import { ReactElement } from "react";
import { truncateFilePath } from "utils";

interface Props {
  fileChange?: FileChange;
  onEditFile: (file: { name: string; path: string }) => void;
  onDeleteFileChange: (file: { name: string; path: string }) => void;
}

export const FileChangeMadeCard = ({ fileChange, onEditFile, onDeleteFileChange }: Props): ReactElement => {
  if (!fileChange) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col rounded border shadow">
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-t bg-neutral-100 px-4 py-3 font-medium text-neutral-800">
        {fileChange.fileName}
        <div className="mt-1 w-full overflow-hidden text-ellipsis text-xs" title={fileChange.filePath}>
          {truncateFilePath(fileChange.filePath)}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t bg-white px-4 py-2">
        <Button size="s" onClick={() => onDeleteFileChange({ name: fileChange.fileName, path: fileChange.filePath })}>
          Delete change
        </Button>
        <Button size="s" onClick={() => onEditFile({ name: fileChange.fileName, path: fileChange.filePath })}>
          Edit file
        </Button>
      </div>
    </div>
  );
};
