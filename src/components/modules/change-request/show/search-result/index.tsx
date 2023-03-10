import { Button } from "components/ui";
import { CodeSearchResultItem } from "data/github/types";
import { ReactElement } from "react";
import { truncateFilePath } from "utils";

interface Props {
  searchResult: CodeSearchResultItem;
  onEditFile: (file: { name: string; path: string }) => void;
}

export const SearchResult = ({ searchResult, onEditFile }: Props): ReactElement => {
  return (
    <div className="flex w-full flex-col rounded border shadow">
      <div
        className="w-full max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-t bg-neutral-100 px-4 py-3 font-medium text-neutral-800"
        title={searchResult.path}
      >
        {truncateFilePath(searchResult.path)}
      </div>
      <div className="flex w-full flex-col gap-2 bg-white px-4 py-2">
        {searchResult.text_matches
          ?.filter((textMatch) => textMatch.property === "content")
          ?.map((textMatch, idx) => (
            <div key={idx} className="w-full overflow-auto border-t p-4 first:border-0">
              <pre>{textMatch.fragment}</pre>
            </div>
          ))}
      </div>
      <div className="flex justify-end border-t bg-white px-4 py-2">
        <Button size="s" onClick={() => onEditFile({ name: searchResult.name, path: searchResult.path })}>
          Edit file
        </Button>
      </div>
    </div>
  );
};
