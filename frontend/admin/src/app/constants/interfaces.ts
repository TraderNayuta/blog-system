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
  id?: string;
}

export interface Post extends Base {
  title: {
    zh: string;
    en: string;
  };
  tags: Tag[];
  categories: Category[];
  content: {
    zh: string;
    en: string;
  };
  status: PostStatus;
}

export interface Tag extends Base {
  name: {
    zh: string;
    en: string;
  };
}

export interface Category extends Base {
  name: {
    zh: string;
    en: string;
  };
}

export interface DoubleConfirmDialogData {
  header: string;
  content: string;
}

export interface AddDialogData {
  actionType: ActionType;
  type: ActionTarget;
}

export interface SearchPaginatorParams {
  searchString?: string;
  pageSize: number;
  pageIndex: number;
}
