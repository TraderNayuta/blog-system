import { ActionTarget, ActionType, PostStatus } from './types';

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

export interface Base {
  id?: number;
}

export interface Post extends Base {
  zhTitle?: string;
  enTitle?: string;
  tags?: Tag[];
  categories?: Category[];
  zhContent?: string;
  enContent?: string;
  status?: PostStatus;
}

export interface Tag extends Base {
  zh: string;
  en: string;
}

export interface Category extends Base {
  zh: string;
  en: string;
}

export interface DoubleConfirmDialogData {
  header: string;
  content: string;
}

export interface ActionDialogData {
  actionType: ActionType;
  target: ActionTarget;
  entity?: Tag | Category;
}

export interface SearchPaginatorParams {
  searchString?: string;
  pageSize: number;
  pageIndex: number;
}
