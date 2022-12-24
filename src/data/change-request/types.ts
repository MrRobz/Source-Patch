export interface ChangeRequest {
  id: number;
  title: string;
  desc?: string;
  status?: string;
  changeItems: ChangeItem[];
}

export interface ChangeItem {
  id: number;
  fileName: string;
  fromText: string;
  toText: string;
}
