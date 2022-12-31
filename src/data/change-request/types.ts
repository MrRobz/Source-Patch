export interface ChangeRequest {
  id: number;
  title: string;
  desc?: string;
  status?: string;
  fileChanges: {
    [file: string]: FileChange;
  };
  pullRequest?: PullRequestInfo;
}

export interface FileChange {
  fileName: string;
  filePath: string;
  fromText: string;
  toText: string;
  createdAt: number;
  updatedAt: number;
}

export interface PullRequestInfo {
  pullNumber: number;
  url: string;
  branchName: string;
}
