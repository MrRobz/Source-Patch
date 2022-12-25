import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { H1 } from "components/ui/typography";
import { ChangeRequest } from "data/change-request/types";
import { ReactElement, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLoadChangeRequest } from "./hooks/use-load-change-request";
import { Button, Input } from "components/ui";
import { CodeSearchResultItem } from "data/github/types";
import { GithubApi } from "data/github/api";
import { SearchResult } from "./search-result";
import { FileContentEditor } from "./file-content-editor";

export const ChangeRequestShow = (): ReactElement => {
  const { domain, id } = useParams() as { domain: string; id: string };
  const navigate = useNavigate();
  const [changeRequest, setChangeRequest] = useState<ChangeRequest>();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<CodeSearchResultItem[]>();
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

  const onEditFile = async (searchResult: CodeSearchResultItem) => {
    const path = searchResult.path;

    setFilePathToEdit(path);
  };

  if (filePathToEdit) {
    return <FileContentEditor path={filePathToEdit} onCancel={() => setFilePathToEdit()} />;
  }

  return (
    <div className="w-ful h-full">
      <H1 className="flex items-center">
        <BackIcon className="mb-3 mr-2 cursor-pointer hover:text-primary-700" onClick={() => navigate(-1)} />
        {changeRequest?.title}
      </H1>
      <div className="ml-3 mt-3 text-neutral-600">
        {changeRequest?.desc ?? "No description added. Check to add one."}
      </div>

      <div className="mt-4">
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

      <div className="mt-4">
        <div className="text-md font-bold">Matches found:</div>

        <div className="mt-4 max-h-96 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {searchResults?.map((searchResult) => (
              <SearchResult key={searchResult.name} searchResult={searchResult} onEditFile={onEditFile} />
            ))}

            {searchResults && !searchResults.length && (
              <div>
                <span>No results found</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-md font-bold">File changes made:</div>
      </div>
    </div>
  );
};
