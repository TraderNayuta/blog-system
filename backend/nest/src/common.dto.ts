export class BaseDto {
  readonly id?: number;
}

export class MultiLanguageBaseDto {
  readonly en: string;
  readonly zh: string;
}

export class SearchPaginatorParams {
  searchString?: string;
  searchCategory?: string;
  searchTag?: string;
  pageSize: string;
  pageIndex: string;
}
