import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { ReactComponent as CheckIcon } from "assets/check.svg";
import { H1 } from "components/ui/typography";
import { ChangeRequest, FileChange } from "data/change-request/types";
import { KeyboardEventHandler, ReactElement, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadChangeRequest } from "./hooks/use-load-change-request";
import { Button, Input, Spinner } from "components/ui";
import { CodeSearchResultItem } from "data/github/types";
import { GithubApi } from "data/github/api";
import { SearchResult } from "./search-result";
import { FileContentEditor } from "./file-content-editor";
import { ChangeRequestApi } from "data/change-request/api";
import { FileChangeMadeCard } from "./file-change-made-card";
import { isEmptyObj } from "utils";
import { ReactComponent as SearchIcon } from "assets/search.svg";
import { ReactComponent as PreferenceIcon } from "assets/preference.svg";

export const ChangeRequestShow = (): ReactElement => {
  const { domain, id } = useParams() as { domain: string; id: string };
  const navigate = useNavigate();
  const [changeRequest, setChangeRequest] = useState<ChangeRequest>();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<CodeSearchResultItem[]>();
  const [fileName, setFileName] = useState<string>();
  const [filePathToEdit, setFilePathToEdit] = useState<string>();
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const changedFileNames = Object.keys(changeRequest?.fileChanges || {});

  const onSearch = async () => {
    const searchText = searchInputRef.current?.value;

    if (!searchText) {
      return;
    }

    setIsSearchLoading(true);
    const results = await GithubApi.search({ domain, searchText }).catch((error) => {
      setIsSearchLoading(false);
      alert(error);
    });

    if (results) {
      setSearchResults(results);
    }
    setIsSearchLoading(false);
  };

  const handleSearchInputKeyDown: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.key === "Enter") {
      await onSearch();
    }
  };

  const onEditFileTrigger = async ({ name, path }: { name: string; path: string }) => {
    setFilePathToEdit(path);
    setFileName(name);
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

  const onDeleteFileChange = async ({ name, path }: { name: string; path: string }) => {
    if (changeRequest) {
      const clone = { ...changeRequest } as ChangeRequest;

      clone.fileChanges = clone.fileChanges || {};
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete clone.fileChanges[path];
      setChangeRequest(clone);

      await ChangeRequestApi.set(Number(id), clone);
    }
  };

  const onSubmit = () => {
    if (changeRequest) {
      if (isEmptyObj(changeRequest.fileChanges)) {
        alert("You need to update at least one file to create a change request.");
        return;
      }

      navigate(`/domain/${domain}/change-request/${id}/submit`);
    }
  };

  useLoadChangeRequest(setChangeRequest);

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
          Search for any code or text that needs alteration
        </label>
        <div className="mt-2 flex gap-2">
          <Input
            name="code-text-search"
            className="h-12 flex-1"
            placeholder="Type text here and hit search"
            ref={searchInputRef}
            onKeyDown={handleSearchInputKeyDown}
          />
          <div className="flex">
            <Button type="primary" onClick={onSearch} className="rounded-r-none">
              {isSearchLoading ? <Spinner className="mr-2 h-4 w-4" /> : <SearchIcon className="mr-2 h-4 w-4" />}
              Search
            </Button>
            <Button className="rounded-l-none border-l border-white" type="primary">
              <PreferenceIcon className="h-4 w-4" />
            </Button>
          </div>
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

        <div className="mt-2 max-h-96 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {changedFileNames?.map((fileName) => (
              <FileChangeMadeCard
                key={fileName}
                fileChange={changeRequest?.fileChanges[fileName]}
                onEditFile={onEditFileTrigger}
                onDeleteFileChange={onDeleteFileChange}
              />
            ))}

            {changedFileNames && !changedFileNames.length && (
              <div>
                <span>No files changed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="primary" onClick={onSubmit}>
          <CheckIcon className="mr-2 h-3 w-3" />
          Create change request
        </Button>
      </div>
    </div>
  );
};
