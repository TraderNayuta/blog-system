export class BaseDto {
  readonly id?: string;
}

export class MultiLanguageBaseDto {
  readonly en: string;
  readonly zh: string;
}

export class SearchPaginatorParams {
  searchString?: string;
  pageSize: number;
  pageIndex: number;
}
