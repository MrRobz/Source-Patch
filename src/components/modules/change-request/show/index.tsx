import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { H1 } from "components/ui/typography";
import { ChangeRequest, FileChange } from "data/change-request/types";
import { ReactElement, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLoadChangeRequest } from "./hooks/use-load-change-request";
import { Button, Input } from "components/ui";
import { CodeSearchResultItem } from "data/github/types";
import { GithubApi } from "data/github/api";
import { SearchResult } from "./search-result";
import { FileContentEditor } from "./file-content-editor";
import { ChangeRequestApi } from "data/change-request/api";

export const ChangeRequestShow = (): ReactElement => {
  const { domain, id } = useParams() as { domain: string; id: string };
  const navigate = useNavigate();
  const [changeRequest, setChangeRequest] = useState<ChangeRequest>();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<CodeSearchResultItem[]>();
  const [fileName, setFileName] = useState<string>();
  const [filePathToEdit, setFilePathToEdit] = useState<string>();

  useLoadChangeRequest(setChangeRequest);

  const onSearch = async () => {
    const searchText = searchInputRef.current?.value;

    if (!searchText) {
      return;
    }

    const results = await GithubApi.search({ domain, searchText });
    if (results) {
      setSearchResults(results);
    }
  };

  const onEditFileTrigger = async (searchResult: CodeSearchResultItem) => {
    const path = searchResult.path;

    setFilePathToEdit(path);
    setFileName(searchResult.name);
  };

  const onEditFileSave = async (fileChange: FileChange) => {
    if (changeRequest) {
      const clone = { ...changeRequest } as ChangeRequest;

      clone.fileChanges = clone.fileChanges || {};
      clone.fileChanges[fileChange.filePath] = fileChange;
      setChangeRequest(clone);

      await ChangeRequestApi.set(Number(id), clone);
    }
    setSearchResults([]);
    setFilePathToEdit(undefined);
  };

  if (fileName && filePathToEdit) {
    return (
      <FileContentEditor
        path={filePathToEdit}
        fileName={fileName}
        onCancel={() => setFilePathToEdit(undefined)}
        fileChange={changeRequest?.fileChanges?.[filePathToEdit]}
        onEditFileSave={onEditFileSave}
      />
    );
  }

  return (
    <div className="w-ful h-full">
      <H1 className="flex items-center">
        <BackIcon className="mb-3 mr-2 cursor-pointer hover:text-primary-700" onClick={() => navigate(-1)} />
        {changeRequest?.title}
      </H1>
      <div className="mt-3 text-neutral-600">{changeRequest?.desc ?? "No description added. Check to add one."}</div>

      <div className="mt-6">
        <label htmlFor="code-text-search" className="text-md font-bold">
          Search for text to replace
        </label>
        <div className="mt-2 flex gap-2">
          <Input
            name="code-text-search"
            className="h-12 w-full"
            placeholder="Type text here and hit search"
            ref={searchInputRef}
          />
          <Button type="primary" onClick={onSearch}>
            Search
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-md font-bold">Matches found:</div>

        <div className="mt-2 max-h-96 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {searchResults?.map((searchResult) => (
              <SearchResult key={searchResult.name} searchResult={searchResult} onEditFile={onEditFileTrigger} />
            ))}

            {searchResults && !searchResults.length && (
              <div>
                <span>No results found</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-md font-bold">File changes made:</div>
      </div>
    </div>
  );
};
