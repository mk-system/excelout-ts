export type WriteRequest = {
  type: "write";
  sheetName: string;
  cell: string;
  value: any;
};

export type SetBackgroundColorRequest = {
  type: "set_background";
  sheetName: string;
  cell: string;
  color: number;
};

export type Request = WriteRequest | SetBackgroundColorRequest;

export type FormattedWriteRequest = {
  write: {
    address: string;
    value: any;
  };
};

export type FormattedSetBackgroundColorRequest = {
  set_background: {
    address: string;
    color: number;
  };
};

export type FormattedRequest =
  | FormattedWriteRequest
  | FormattedSetBackgroundColorRequest;
