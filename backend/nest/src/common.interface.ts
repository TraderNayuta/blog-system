export interface Response {
  data?:
    | string
    | object
    | {
        records: Array<any>;
        pageSize?: number;
        pageIndex?: number;
        total?: number;
      };
  msg: string;
}
