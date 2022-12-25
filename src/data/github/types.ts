export interface CodeSearchResultItem {
  name: string;
  path: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  score: number;
  file_size?: number;
  language?: string | null;
  /** Format: date-time */
  last_modified_at?: string;
  /**
   * @example [
   *   "73..77",
   *   "77..78"
   * ]
   */
  line_numbers?: string[];
  text_matches?: SearchResultTextMatch[];
}

export interface SearchResultTextMatch {
  object_url?: string;
  object_type?: string | null;
  property?: string;
  fragment?: string;
  matches?: Array<{
    text?: string;
    indices?: number[];
  }>;
}

export interface GithubFileContents {
  type: "submodule" | "file" | "symlink" | "dir";
  size: number;
  name: string;
  path: string;
  content?: string | undefined;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
}
