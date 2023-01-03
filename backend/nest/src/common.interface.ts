export interface Response {
  data?:
    | string
    | {
        records: Array<any>;
        pageSize: number;
        pageIndex: number;
        total: number;
      };
  msg: string;
}
