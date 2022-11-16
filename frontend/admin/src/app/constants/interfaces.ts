import { ActionTarget, ActionType, ArticleStatus } from './types';

export interface Base {
  id?: string;
}

export interface Article extends Base {
  title: string;
  tags: Tag[];
  categories: Category[];
  content: {
    zh: string;
    en: string;
  };
  status: ArticleStatus;
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
