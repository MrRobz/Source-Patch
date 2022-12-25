import { Button } from "components/ui";
import { FileChange } from "data/change-request/types";
import { GithubApi } from "data/github/api";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "./editor";

interface Props {
  path: string;
  fileName: string;
  fileChange?: FileChange;
  onCancel: () => void;
  onEditFileSave: (fileChange: FileChange) => void;
}

export const FileContentEditor = ({ path, fileName, fileChange, onCancel, onEditFileSave }: Props): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const { domain } = useParams() as { domain: string; id: string };

  const originalFileContentsRef = useRef<string | undefined>(fileChange?.fromText);
  const [updatedFileContents, setUpdatedFileContents] = useState<string | undefined>(
    fileChange?.toText ?? fileChange?.fromText
  );

  const onChange = useCallback((value: string) => {
    setUpdatedFileContents(value);
  }, []);

  const onSave = () => {
    if (originalFileContentsRef.current && updatedFileContents) {
      onEditFileSave({
        fileName,
        filePath: path,
        fromText: originalFileContentsRef.current,
        toText: updatedFileContents,
        createdAt: fileChange?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (!fileChange?.fromText || !fileChange?.toText) {
        setIsLoading(true);
        const results = await GithubApi.getFileContents({ domain, path });

        if (results?.content) {
          const contents = window.atob(results?.content);

          originalFileContentsRef.current = contents;
          setUpdatedFileContents(contents);
        }
        setIsLoading(false);
      }
    })();
  }, [path]);

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <div className="flex h-96 items-center justify-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="font-medium text-neutral-800">{path}</div>

      <div className="mt-4">
        <div className=" w-full rounded border border-neutral-300 bg-white">
          <div className="w-full rounded-t bg-neutral-100">
            <div className="w-fit rounded-t border-r border-neutral-400 bg-white px-4 py-3 font-medium">Edit file</div>
          </div>

          <div className="w-full">
            <Editor content={updatedFileContents ?? ""} fileName={fileName ?? ""} onChange={onChange} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={onSave}>
          Save file updates
        </Button>
      </div>
    </div>
  );
};
