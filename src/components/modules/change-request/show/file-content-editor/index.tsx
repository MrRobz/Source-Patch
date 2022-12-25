import { Button } from "components/ui";
import { GithubApi } from "data/github/api";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  path: string;
  onCancel: () => void;
}

export const FileContentEditor = ({ path, onCancel }: Props): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const { domain } = useParams() as { domain: string; id: string };
  const [originalFileContents, setOriginalFileContents] = useState<string>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setIsLoading(true);
      const results = await GithubApi.getFileContents({ domain, path });

      if (results?.content) {
        const contents = window.atob(results?.content);

        setOriginalFileContents(contents);
      }
      setIsLoading(false);
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

          <div className="w-full overflow-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>
            <pre contentEditable>{originalFileContents}</pre>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary">Update file</Button>
      </div>
    </div>
  );
};
